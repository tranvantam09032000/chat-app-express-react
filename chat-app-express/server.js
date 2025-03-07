const express = require("express");
const port = 3000;
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // Cho phép kết nối từ mọi nguồn, cấu hình lại cho production nếu cần
    },
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.get('/', (req, res) => {
    res.send('Chat App Backend with Socket.io is running');
});

server.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
});