const bodyParser = require('body-parser');
const express = require('express');
const { createServer } = require("http");
const { Redis } = require('ioredis');
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const redisCache = new Redis();

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5500",
        methods: ["get", "post"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected " + socket.id);
    socket.on("setUserId", (userId) => {
        redisCache.set(userId, socket.id);
    });

    socket.on('getConnectionId', async (userId) => {
        const connectionId = await redisCache.get(userId);
        console.log(`Get connId for User ${userId}:`,connectionId);
        socket.emit('connectionId', connectionId);
    })
});

app.use(bodyParser.json());

app.post('/sendPayload', async (req, res) => {
    const {userId, payload} = req.body;

    console.log(payload.response);
    console.log("Ping pOng", userId);

    if(!userId || !payload) {
        res.status(400).send("invalid request");
    }

    const socketId = await redisCache.get(userId);

    if(socketId) {
        io.to(socketId).emit('submissionPayloadResponse', payload);
        res.send("Payload send successfully");
    } else {
        res.status(404).send("User not connected");
    }
})

httpServer.listen(3003, () => {
    console.log("Server is running on port 3003");
});