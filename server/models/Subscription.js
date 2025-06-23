// server/models/Subscription.js

import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: ["Entertainment", "Work", "Utilities", "Food", "Music", "Other"],
    },
    billingCycle: {
      type: String,
      required: true,
      enum: ["Monthly", "Yearly"],
      default: "Monthly",
    },
    nextDueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
