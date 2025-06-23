// client/src/pages/ProfilePage.jsx

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import userService from "../services/userService";
import { toast } from "sonner";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  out: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

// This variant is for each individual card
const cardVariants = {
  initial: { opacity: 0, y: 40 },
  in: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// This variant is for the container, to stagger the animation of its children
const containerVariants = {
  in: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// A reusable component for our settings sections
const SettingsCard = ({ title, children }) => (
  <motion.div
    variants={cardVariants} // Use the card variant here
    className="bg-paper-secondary dark:bg-ink-secondary p-8 rounded-xl border border-gold/10"
  >
    <h2 className="font-serif text-2xl font-bold mb-6">{title}</h2>
    {children}
  </motion.div>
);

const ProfilePage = () => {
  // Make sure `setUser` is exposed from your AuthContext for instant UI updates.
  const { user, setUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsProfileLoading(true);
    try {
      const { data } = await userService.updateProfile({ name });
      const updatedUser = { ...user, name: data.name };
      setUser(updatedUser);
      localStorage.setItem("flowbitUser", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match.");
    }
    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters long.");
    }
    setIsPasswordLoading(true);
    try {
      await userService.changePassword({ currentPassword, newPassword });
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password."
      );
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="pt-24 bg-paper dark:bg-ink text-ink dark:text-paper min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
            Account Settings
          </h1>
          <p className="text-lg text-ink/60 dark:text-paper/60">
            Manage your profile, password, and account preferences.
          </p>
        </motion.div>

        {/* CORRECTED: The parent div is now a motion.div that orchestrates the animations */}
        <motion.div
          className="mt-12 space-y-12"
          variants={containerVariants}
          initial="initial"
          whileInView="in"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* --- Profile Details Section --- */}
          <SettingsCard title="Profile Details">
            <div className="flex items-center gap-6 mb-8">
              <img
                src={`https://i.pravatar.cc/150?u=${user?.email}`}
                alt="User Avatar"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <button className="font-semibold text-sm bg-paper dark:bg-ink px-4 py-2 rounded-full border border-paper-secondary dark:border-ink-secondary">
                  Upload Picture
                </button>
                <p className="text-xs mt-2 text-ink/50 dark:text-paper/50">
                  PNG, JPG, GIF up to 5MB.
                </p>
              </div>
            </div>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="text-sm font-semibold">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 mt-1 bg-paper dark:bg-ink rounded-lg border-2 border-transparent focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Email Address</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-3 mt-1 bg-paper dark:bg-ink rounded-lg opacity-60 cursor-not-allowed"
                />
              </div>
              <div className="flex justify-end pt-2">
                <motion.button
                  type="submit"
                  disabled={isProfileLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gold text-paper font-bold rounded-full disabled:opacity-50"
                >
                  {isProfileLoading ? "Saving..." : "Save Changes"}
                </motion.button>
              </div>
            </form>
          </SettingsCard>

          {/* --- Security Section --- */}
          <SettingsCard title="Security">
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <h3 className="font-semibold">Change Password</h3>
              <div>
                <label className="text-sm font-semibold">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 mt-1 bg-paper dark:bg-ink rounded-lg border-2 border-transparent focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 mt-1 bg-paper dark:bg-ink rounded-lg border-2 border-transparent focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 mt-1 bg-paper dark:bg-ink rounded-lg border-2 border-transparent focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="flex justify-end pt-2">
                <motion.button
                  type="submit"
                  disabled={isPasswordLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gold text-paper font-bold rounded-full disabled:opacity-50"
                >
                  {isPasswordLoading ? "Updating..." : "Update Password"}
                </motion.button>
              </div>
            </form>
          </SettingsCard>

          {/* --- Danger Zone --- */}
          <SettingsCard title="Danger Zone">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 p-4 border border-red-500/30 bg-red-500/5 rounded-lg">
              <div>
                <h3 className="font-semibold text-red-500">
                  Delete Your Account
                </h3>
                <p className="text-sm text-ink/60 dark:text-paper/60 mt-1">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-red-500 text-white font-bold rounded-full whitespace-nowrap"
              >
                Delete Account
              </motion.button>
            </div>
          </SettingsCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
