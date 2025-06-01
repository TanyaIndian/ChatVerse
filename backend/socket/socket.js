import http from "http";
import express from "express";
import {Server} from "socket.io";
import dotenv from "dotenv";

dotenv.config();
let app = express();
const server = http.createServer(app);

let corsOrigin;
const frontendAllowedOriginsEnv = process.env.FRONTEND_ALLOWED_ORIGINS;

if (frontendAllowedOriginsEnv) {
    // If multiple origins are provided, Socket.IO's cors.origin can take an array
    const parsedOrigins = frontendAllowedOriginsEnv.split(',')
        .map(origin => origin.trim())
        .filter(origin => origin); // Remove empty strings

    if (parsedOrigins.length > 0) {
        corsOrigin = parsedOrigins;
        console.log("Socket.IO CORS: Using origins from FRONTEND_ALLOWED_ORIGINS:", corsOrigin); // Minimal essential log
    } else {
        // Fallback if env var is empty or malformed
        console.warn("Socket.IO CORS: FRONTEND_ALLOWED_ORIGINS was empty/malformed. Defaulting to localhost.");
        corsOrigin = "http://localhost:5173";
    }
} else {
    // Fallback if env var is not set at all
    console.warn("Socket.IO CORS: FRONTEND_ALLOWED_ORIGINS not set. Defaulting to localhost.");
    corsOrigin = "http://localhost:5173";
}
// --- End Determine Socket.IO CORS Origin ---

const io = new Server(server, {
    cors: {
        origin: corsOrigin, // <<< USE THE DETERMINED ORIGIN(S)
        methods: ["GET", "POST"], // Good to specify methods
        credentials: true         // If your client sends/needs credentials
    }
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        // Find which userId this socket belonged to
        let disconnectedUserId = null;
        for (const id in userSocketMap) {
            if (userSocketMap[id] === socket.id) {
                disconnectedUserId = id;
                break;
            }
        }
        if (disconnectedUserId) {
            delete userSocketMap[disconnectedUserId];
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export {app, server, io};