import express from "express";
import {getProfile, login, logout, signup, updateProfile} from "../controllers/auth.controller.js";
import {protectRouter} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",logout);
router.put("/update-profile",protectRouter, updateProfile);
router.get("/profile",protectRouter, getProfile);
export default router;