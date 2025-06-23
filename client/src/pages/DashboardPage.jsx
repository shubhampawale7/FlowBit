// client/src/pages/DashboardPage.jsx

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import subscriptionService from "../services/subscriptionService";
import { toast } from "sonner";
import { FaTrash, FaPlus, FaSpinner, FaEdit } from "react-icons/fa";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// --- Animated Counter for Stats ---
const AnimatedCounter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { mass: 0.8, stiffness: 100, damping: 15 });
  const display = useTransform(spring, (current) =>
    current < 1000
      ? current.toFixed(0)
      : Math.round(current).toLocaleString("en-IN")
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [spring, value, isInView]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const initialFormData = {
    name: "",
    amount: "",
    category: "Entertainment",
    billingCycle: "Monthly",
    nextDueDate: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const fetchData = async () => {
    try {
      const [subsRes, statsRes] = await Promise.all([
        subscriptionService.getSubscriptions(),
        subscriptionService.getStats(),
      ]);
      setSubscriptions(
        subsRes.data.sort(
          (a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate)
        )
      );
      setStats(statsRes.data);
    } catch (error) {
      toast.error("Failed to fetch dashboard data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const highestSpendingCategory = useMemo(() => {
    if (
      !stats ||
      !stats.spendingByCategory ||
      stats.spendingByCategory.length === 0
    )
      return { _id: "N/A", totalAmount: 0 };
    return stats.spendingByCategory[0];
  }, [stats]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      try {
        await subscriptionService.deleteSubscription(id);
        toast.success("Subscription deleted!");
        fetchData();
      } catch (error) {
        toast.error("Failed to delete subscription.");
      }
    }
  };

  const handleOpenModal = (sub = null) => {
    if (sub) {
      setEditingSubscription(sub);
      setFormData({
        name: sub.name,
        amount: sub.amount,
        category: sub.category,
        billingCycle: sub.billingCycle,
        nextDueDate: new Date(sub.nextDueDate).toISOString().split("T")[0],
      });
    } else {
      setEditingSubscription(null);
      setFormData(initialFormData);
    }
    setIsModalOpen(true);
  };

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSubscription) {
        await subscriptionService.updateSubscription(
          editingSubscription._id,
          formData
        );
        toast.success("Subscription updated successfully!");
      } else {
        await subscriptionService.addSubscription(formData);
        toast.success("New subscription added!");
      }
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "The operation failed.");
    }
  };

  // --- Recharts Configuration ---
  const chartColors = ["#B08968", "#DDB892", "#E5E1DA", "#7F5539", "#9C6644"];
  const CustomChartTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-paper dark:bg-ink border border-gold/30 rounded-md shadow-lg font-sans">
          <p className="font-bold">{`${
            payload[0].name
          }: ₹${payload[0].value.toLocaleString("en-IN")}`}</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-gold" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24 bg-paper dark:bg-ink text-ink dark:text-paper min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
            Welcome back, {user?.name.split(" ")[0]}!
          </h1>
          <p className="mt-2 text-lg text-ink/60 dark:text-paper/60">
            Here is your financial overview for June 2025.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* --- Main Content (Left Column) --- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-3xl font-bold">
                Active Subscriptions
              </h2>
              <motion.button
                onClick={() => handleOpenModal()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gold text-paper px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                <FaPlus size={12} /> Add New
              </motion.button>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {subscriptions.length > 0 ? (
                  subscriptions.map((sub, i) => (
                    <motion.div
                      key={sub._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: i * 0.05 },
                      }}
                      exit={{ opacity: 0, x: -50 }}
                      className="group flex items-center justify-between p-4 bg-paper dark:bg-ink rounded-lg border-l-4 border-transparent hover:border-gold hover:bg-paper-secondary dark:hover:bg-ink-secondary transition-colors duration-300"
                    >
                      <div>
                        <p className="font-bold font-sans text-lg">
                          {sub.name}
                        </p>
                        <p className="text-sm text-ink/50 dark:text-paper/50">
                          {sub.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold font-sans text-xl">
                            ₹{sub.amount.toLocaleString("en-IN")}
                          </p>
                          <p className="text-xs text-ink/50 dark:text-paper/50">
                            Due:{" "}
                            {new Date(sub.nextDueDate).toLocaleDateString(
                              "en-IN",
                              { day: "numeric", month: "short" }
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleOpenModal(sub)}
                            className="p-2 text-ink/60 dark:text-paper/60 hover:text-gold"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(sub._id)}
                            className="p-2 text-ink/60 dark:text-paper/60 hover:text-red-500"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 px-4 border-2 border-dashed border-paper-secondary dark:border-ink-secondary rounded-lg"
                  >
                    <h3 className="text-xl font-semibold font-serif">
                      Your dashboard is pristine.
                    </h3>
                    <p className="text-ink/60 dark:text-paper/60 mt-2">
                      Click "Add New" to begin tracking your subscriptions.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* --- Sidebar (Right Column) --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-1 space-y-8"
          >
            <div>
              <h3 className="font-serif text-2xl font-bold mb-4">Insights</h3>
              <div className="space-y-5 p-6 bg-paper-secondary dark:bg-ink-secondary rounded-xl">
                <div className="text-center">
                  <p className="text-sm text-ink/60 dark:text-paper/60">
                    Total Monthly Spend
                  </p>
                  <p className="font-bold font-sans text-4xl text-gold">
                    ₹<AnimatedCounter value={stats?.totalMonthlySpend || 0} />
                  </p>
                </div>
                <div className="border-t border-gold/20"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-ink/60 dark:text-paper/60">
                      Active Subscriptions
                    </p>
                    <p className="font-bold font-sans text-2xl">
                      <AnimatedCounter value={subscriptions.length} />
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-ink/60 dark:text-paper/60">
                      Top Category
                    </p>
                    <p className="font-bold font-sans text-lg">
                      {highestSpendingCategory._id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {stats &&
                stats.spendingByCategory &&
                stats.spendingByCategory.length > 0 && (
                  <div className="h-80 w-full bg-paper-secondary dark:bg-ink-secondary p-4 rounded-xl">
                    <h3 className="font-serif text-2xl font-bold mb-4">
                      Category Breakdown
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.spendingByCategory}
                          dataKey="totalAmount"
                          nameKey="_id"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                        >
                          {stats.spendingByCategory.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={chartColors[index % chartColors.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomChartTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- Add/Edit Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-8 bg-paper dark:bg-ink-secondary rounded-2xl shadow-2xl border border-gold/20"
            >
              <h2 className="text-2xl font-bold font-serif mb-6">
                {editingSubscription
                  ? "Edit Subscription"
                  : "Add New Subscription"}
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Subscription Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full p-3 bg-paper-secondary dark:bg-ink border border-paper-secondary dark:border-ink rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount (in INR)"
                  value={formData.amount}
                  onChange={handleFormChange}
                  required
                  className="w-full p-3 bg-paper-secondary dark:bg-ink border border-paper-secondary dark:border-ink rounded-md focus:ring-2 focus:ring-gold focus:outline-none"
                />
                <input
                  type="date"
                  name="nextDueDate"
                  value={formData.nextDueDate}
                  onChange={handleFormChange}
                  required
                  className="w-full p-3 bg-paper-secondary dark:bg-ink border border-paper-secondary dark:border-ink rounded-md"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full p-3 bg-paper-secondary dark:bg-ink border border-paper-secondary dark:border-ink rounded-md"
                >
                  {Object.keys(categoryColors).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <select
                  name="billingCycle"
                  value={formData.billingCycle}
                  onChange={handleFormChange}
                  className="w-full p-3 bg-paper-secondary dark:bg-ink border border-paper-secondary dark:border-ink rounded-md"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
                <div className="flex justify-end gap-4 pt-4">
                  <motion.button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-full bg-paper-secondary dark:bg-ink font-semibold"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 bg-gold text-paper rounded-full font-semibold"
                  >
                    {editingSubscription ? "Save Changes" : "Add Subscription"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DashboardPage;
