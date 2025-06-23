// client/src/pages/LoginPage.jsx

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FaGoogle, FaArrowRight } from "react-icons/fa";

// Animation Variants
const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.7, ease: "easeInOut" } },
  out: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

const formContainerVariants = {
  initial: { opacity: 0, y: 30 },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const formItemVariants = {
  initial: { opacity: 0, x: -20 },
  in: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="min-h-screen flex items-center justify-center bg-paper dark:bg-ink pt-20 pb-12 px-4"
    >
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden border border-paper-secondary dark:border-ink-secondary">
        {/* --- Left Column (Branding) --- */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-ink to-ink-secondary text-paper">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-serif text-4xl font-bold text-gold">
              Welcome Back.
            </h1>
            <p className="mt-4 text-paper/70 leading-relaxed">
              Log in to access your dashboard and regain control over your
              financial subscriptions and spending flow.
            </p>
          </motion.div>
        </div>

        {/* --- Right Column (Form) --- */}
        <div className="p-8 md:p-12 bg-paper dark:bg-ink">
          <motion.div
            variants={formContainerVariants}
            initial="initial"
            animate="in"
          >
            <motion.h2
              variants={formItemVariants}
              className="font-serif text-3xl font-bold text-ink dark:text-paper"
            >
              Log In to FlowBit
            </motion.h2>
            <motion.p
              variants={formItemVariants}
              className="mt-2 text-ink/60 dark:text-paper/60"
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-gold hover:underline"
              >
                Sign Up
              </Link>
            </motion.p>

            <motion.div variants={formItemVariants} className="mt-8">
              <button className="w-full flex items-center justify-center gap-3 py-3 border border-paper-secondary dark:border-ink-secondary rounded-full hover:bg-paper-secondary dark:hover:bg-ink-secondary transition-colors">
                <FaGoogle />
                <span>Sign in with Google</span>
              </button>
            </motion.div>

            <motion.div
              variants={formItemVariants}
              className="my-6 flex items-center"
            >
              <div className="flex-grow border-t border-paper-secondary dark:border-ink-secondary"></div>
              <span className="mx-4 text-sm text-ink/40 dark:text-paper/40">
                OR
              </span>
              <div className="flex-grow border-t border-paper-secondary dark:border-ink-secondary"></div>
            </motion.div>

            <motion.form
              variants={formContainerVariants}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <motion.div variants={formItemVariants}>
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 mt-1 bg-paper-secondary dark:bg-ink-secondary rounded-lg border-2 border-transparent focus:outline-none focus:border-gold transition-colors"
                />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold">Password</label>
                  <a href="#" className="text-sm text-gold hover:underline">
                    Forgot?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 mt-1 bg-paper-secondary dark:bg-ink-secondary rounded-lg border-2 border-transparent focus:outline-none focus:border-gold transition-colors"
                />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gold text-paper font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-gold-light transition-all disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : "Log In"}
                  {!isLoading && <FaArrowRight />}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
