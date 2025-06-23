// server/routes/authRoutes.js

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// This creates the route POST /register
router.post("/register", registerUser);

// This creates the route POST /login
router.post("/login", loginUser);

export default router;
