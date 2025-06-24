const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddlerware");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.get("/", (req, res) => res.send("API is running"));
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`\x1b[34mServer running on port ${PORT}\x1b[0m`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log("📡 Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id); // each user gets their own room
    socket.emit("connected");
  });

  socket.on("join chat", (roomId) => {
    socket.join(roomId);
    console.log("User joined chat room:", roomId);
  });

  socket.on("new message", (message) => {
    const chat = message.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((u) => {
      if (u._id === message.sender._id) return;
      socket.in(u._id).emit("message received", message);
    });
  });
});
