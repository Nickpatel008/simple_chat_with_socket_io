const http = require("http");
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const path = require("path");
const server = http.createServer(app);

const io = new Server(server);

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "./public/index.html"));
});

io.on("connection", (socket) => {
  socket.on("send", (msg) => {
    io.emit("from-server", msg);
  });
});

server.listen(9000, () => console.log("Server is running on port 9000"));
