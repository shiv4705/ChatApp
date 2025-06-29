const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddlerware");
const http = require("http");

dotenv.config(); // ✅ load .env inside backend/
connectDB();

const app = express();
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is running"));
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Create HTTP Server
const server = http.createServer(app);

// Setup Socket.IO
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000", // ✅ matches frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("📡 Socket connected:", socket.id);

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
    console.log("🟢 Setup complete for user:", userData._id);
  });

  socket.on("join chat", (roomId) => {
    socket.join(roomId);
    console.log("👥 User joined chat:", roomId);
  });

  socket.on("new message", (message) => {
    const chat = message.chat;
    if (!chat?.users) return console.log("⚠️ chat.users missing");

    chat.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.to(user._id).emit("message received", message);
    });

    console.log("📤 Message sent to users");
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`\x1b[36m✅ Server running on port ${PORT}\x1b[0m`)
);
