// server/routes/userRoutes.js

import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// We protect all routes with our 'protect' middleware
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.put("/password", protect, changeUserPassword);

export default router;
