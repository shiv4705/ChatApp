const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddlerware");
const http = require("http");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is running"));
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Initialize socket.io
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000", // Match your frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Socket.IO Logic
io.on("connection", (socket) => {
  console.log("📡 New socket connection");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
    console.log("🟢 Setup complete for user:", userData._id);
  });

  socket.on("join chat", (roomId) => {
    socket.join(roomId);
    console.log("👥 Joined chat room:", roomId);
  });

  socket.on("new message", (message) => {
    const chat = message.chat;
    if (!chat?.users) return console.log("⚠️ chat.users missing");

    chat.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.to(user._id).emit("message received", message);
    });

    console.log("📤 Message emitted to room");
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });
});

// ✅ Listen on correct port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`\x1b[36m✅ Backend running on port ${PORT}\x1b[0m`)
);
