// server/routes/subscriptionRoutes.js

import express from "express";
// IMPORT the new controller function
import {
  getSubscriptions,
  addSubscription,
  deleteSubscription,
  getSubscriptionStats,
  updateSubscription, // <-- IMPORT
} from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/stats", protect, getSubscriptionStats);

router.route("/").get(protect, getSubscriptions).post(protect, addSubscription);

// Add the .put() method to this route
router
  .route("/:id")
  .delete(protect, deleteSubscription)
  .put(protect, updateSubscription); // <-- ADD THIS LINE

export default router;
