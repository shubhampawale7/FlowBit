// server/server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

// Import our new router
import authRoutes from "./routes/authRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// --- Initial Setup ---
dotenv.config();
connectDB();
const app = express();

// --- Middleware ---
// CORS must be first to handle pre-flight requests
app.use(cors());

// Logger to see requests in the console
app.use(morgan("dev"));

// Body parser to read JSON from request bodies
// This MUST come before your route handlers
app.use(express.json());

// --- API Routes ---
// All routes related to authentication will be prefixed with /api/auth
app.use("/api/auth", authRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/users", userRoutes);

// --- Base Route for Testing ---
app.get("/", (req, res) => {
  res.send("FlowBit API is running...");
});

// --- Server Listener ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
