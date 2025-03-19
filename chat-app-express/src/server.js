import express from "express";
import dotenv from "dotenv";
import authRouter from "./routers/auth.router.js";
import {connectDb} from "./lib/db.js";
import cookieParser from "cookie-parser"
import MessageRouter from "./routers/message.router.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/message", MessageRouter);

app.listen(PORT, () => {
    console.log('Server is running on PORT: ' + PORT);
    connectDb();
});