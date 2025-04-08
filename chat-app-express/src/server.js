import express from "express";
import dotenv from "dotenv";
import authRouter from "./routers/auth.router.js";
import {connectDb} from "./lib/db.js";
import cookieParser from "cookie-parser"
import MessageRouter from "./routers/message.router.js";
import cors from "cors"
import { app, server } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}))
app.use("/api/auth", authRouter);
app.use("/api/messages", MessageRouter);

server.listen(PORT, () => {
    console.log('Server is running on PORT: ' + PORT);
    connectDb();
});