import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config(); // Ensure this is called early to load .env variables
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./socket/socket.js"; // Assuming 'app' is your Express app instance from socket.js

const port = process.env.PORT || 5000;

// --- Dynamic CORS Configuration ---
const allowedOriginsEnv = process.env.FRONTEND_ALLOWED_ORIGINS;
let allowedOrigins = [];

if (allowedOriginsEnv) {
    allowedOrigins = allowedOriginsEnv.split(',').map(origin => origin.trim());
    console.log("CORS: Allowed origins loaded from environment:", allowedOrigins);
} else {
    console.warn("CORS: FRONTEND_ALLOWED_ORIGINS environment variable not set. Defaulting to localhost for dev if necessary.");
    // Fallback for local development if FRONTEND_ALLOWED_ORIGINS is not set
    // You might want to remove this fallback in a strict production-only setup
    allowedOrigins.push('http://localhost:5173');
}

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        // OR if the origin is in our dynamically loaded allowedOrigins list
        if (!origin || allowedOrigins.includes(origin)) {
            console.log(`CORS: Allowing origin: ${origin || 'No Origin (e.g., curl/Postman)'}`);
            callback(null, true);
        } else {
            console.error(`CORS: Blocking origin: ${origin}. Not in allowed list: [${allowedOrigins.join(', ')}]`);
            callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept", // Common headers
    credentials: true, // This was already true in your config, which is good
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Apply the dynamic CORS options
// --- End Dynamic CORS Configuration ---

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

// Test route for basic connectivity
app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

server.listen(port, () => {
    connectDb();
    console.log(`Server started on port ${port}`);
});