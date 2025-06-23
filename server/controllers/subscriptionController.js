// server/controllers/subscriptionController.js

import Subscription from "../models/Subscription.js";

// @desc    Get user's subscriptions
// @route   GET /api/subscriptions
// @access  Private
export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Add new subscription
// @route   POST /api/subscriptions
// @access  Private
export const addSubscription = async (req, res) => {
  const { name, amount, category, billingCycle, nextDueDate } = req.body;

  try {
    const subscription = new Subscription({
      user: req.user.id,
      name,
      amount,
      category,
      billingCycle,
      nextDueDate,
    });

    const createdSubscription = await subscription.save();
    res.status(201).json(createdSubscription);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", details: error.message });
  }
};

// @desc    Delete a subscription
// @route   DELETE /api/subscriptions/:id
// @access  Private
export const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Make sure the logged-in user owns the subscription
    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await subscription.deleteOne(); // Use deleteOne() instead of remove()

    res.json({ message: "Subscription removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get subscription statistics for the user
// @route   GET /api/subscriptions/stats
// @access  Private
export const getSubscriptionStats = async (req, res) => {
  try {
    const stats = await Subscription.aggregate([
      // Stage 1: Match subscriptions for the logged-in user
      {
        $match: { user: req.user._id },
      },
      // Stage 2: Group by category and calculate total amount and count
      {
        $group: {
          _id: "$category", // Group by the category field
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      // Stage 3: Sort by total amount descending
      {
        $sort: { totalAmount: -1 },
      },
    ]);

    // Calculate total monthly spend separately
    const monthlyTotal = await Subscription.aggregate([
      { $match: { user: req.user._id, billingCycle: "Monthly" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      spendingByCategory: stats,
      totalMonthlySpend: monthlyTotal[0]?.total || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error calculating stats" });
  }
};

export const updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Make sure the logged-in user owns the subscription
    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const { name, amount, category, billingCycle, nextDueDate } = req.body;

    subscription.name = name || subscription.name;
    subscription.amount = amount || subscription.amount;
    subscription.category = category || subscription.category;
    subscription.billingCycle = billingCycle || subscription.billingCycle;
    subscription.nextDueDate = nextDueDate || subscription.nextDueDate;

    const updatedSubscription = await subscription.save();
    res.json(updatedSubscription);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
