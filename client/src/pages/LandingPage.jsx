// client/src/pages/LandingPage.jsx

import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaRegEye, FaBell, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

// --- Animation Variants ---
const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  out: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

const sectionVariants = {
  initial: { opacity: 0, y: 50 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  },
  viewport: { once: true, amount: 0.2 },
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  viewport: { once: true, amount: 0.3 },
};

// --- Sub-Components ---
const FeatureCard = ({ icon, title, children }) => (
  <motion.div
    variants={cardVariants}
    className="p-8 bg-paper dark:bg-ink rounded-xl border border-gold/10 hover:border-gold/30 transition-colors duration-300"
  >
    <div className="text-gold mb-4">{icon}</div>
    <h3 className="font-serif text-2xl font-bold mb-2">{title}</h3>
    <p className="text-ink/60 dark:text-paper/60">{children}</p>
  </motion.div>
);

// --- Main Page Component ---
const LandingPage = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="pt-20 bg-paper dark:bg-ink text-ink dark:text-paper overflow-x-hidden"
    >
      {/* --- Hero Section --- */}
      <section className="min-h-[90vh] flex items-center px-6 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
          >
            <motion.h1
              variants={cardVariants}
              className="font-serif text-5xl md:text-7xl font-bold tracking-tight"
            >
              Financial clarity, <br />
              reimagined.
            </motion.h1>
            <motion.p
              variants={cardVariants}
              className="mt-6 text-lg max-w-lg text-ink/60 dark:text-paper/60"
            >
              FlowBit is the intelligent command center for your subscriptions.
              We automate the tracking so you can focus on living, not just
              accounting.
            </motion.p>
            <motion.div variants={cardVariants} className="mt-10">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gold text-paper font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  Begin Your Journey <FaArrowRight />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center justify-center w-full h-96 relative"
          >
            {/* Interactive 3D Card Stack Visual */}
            <motion.div
              className="absolute w-60 h-40 bg-paper-secondary dark:bg-ink-secondary rounded-2xl shadow-2xl"
              style={{ rotate: -10, y: 30, x: -20 }}
              whileHover={{ y: 20, rotate: -12 }}
              transition={{ type: "spring" }}
            />
            <motion.div
              className="absolute w-60 h-40 bg-paper-secondary dark:bg-ink-secondary rounded-2xl shadow-2xl"
              style={{ rotate: 2 }}
              whileHover={{ y: -10, rotate: 3 }}
              transition={{ type: "spring" }}
            />
            <motion.div
              className="relative w-64 h-40 bg-gold/10 rounded-2xl shadow-2xl p-4 flex flex-col justify-between"
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring" }}
            >
              <p className="font-serif text-gold text-lg">FlowBit Dashboard</p>
              <div className="w-full h-12 bg-gold/20 rounded-lg opacity-50"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- Social Proof Section --- */}
      <div className="py-12 bg-paper-secondary dark:bg-ink-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-ink/50 dark:text-paper/50 uppercase tracking-widest">
            Powering modern financial decisions
          </p>
          <div className="mx-auto mt-6 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-4 lg:mx-0 lg:max-w-none text-2xl font-serif text-ink/40 dark:text-paper/40">
            <p className="text-center">FinTech Weekly</p>
            <p className="text-center">Innovate India</p>
            <p className="text-center">The Economic Times</p>
            <p className="text-center">YourStory</p>
          </div>
        </div>
      </div>

      {/* --- Features Section --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            className="max-w-3xl mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              The end of financial blind spots.
            </h2>
            <p className="mt-4 text-lg text-ink/60 dark:text-paper/60">
              FlowBit isn't just a list. It's an intelligent system designed to
              provide three core pillars of financial control.
            </p>
          </motion.div>
          <motion.div
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<FaRegEye size={32} />}
              title="Automated Clarity"
            >
              Our system securely scans and identifies all your recurring
              payments, transforming a chaotic transaction history into a
              simple, actionable list. Discover subscriptions you forgot you
              even had.
            </FeatureCard>
            <FeatureCard icon={<FaBell size={32} />} title="Proactive Control">
              Stay ahead of your finances with timely reminders for upcoming
              payments. FlowBit helps you manage your cash flow proactively, so
              you're never surprised by a debit again.
            </FeatureCard>
            <FeatureCard
              icon={<FaShieldAlt size={32} />}
              title="Unified Command"
            >
              View, manage, and analyze everything from a single, elegant
              dashboard. Understand your spending habits with beautiful
              visualizations and make smarter decisions with your money.
            </FeatureCard>
          </motion.div>
        </div>
      </section>

      {/* --- How It Works Section with REAL IMAGES --- */}
      <section className="py-20 px-6 bg-paper-secondary dark:bg-ink-secondary">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            className="font-serif text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Your Journey to Clarity
          </motion.h2>
          <motion.div
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            className="space-y-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={cardVariants}
                className="text-center md:text-left"
              >
                <h3 className="font-serif text-3xl font-bold text-gold">
                  Step 01.
                </h3>
                <h4 className="text-2xl font-bold mt-1">Link Your World</h4>
                <p className="text-ink/60 dark:text-paper/60 mt-2">
                  Start by manually adding your known subscriptions. Our
                  upcoming Account Aggregator integration will soon allow you to
                  securely connect your bank accounts for a fully automated
                  discovery process.
                </p>
              </motion.div>
              <motion.div
                variants={cardVariants}
                className="h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070&auto=format&fit=crop"
                  alt="Person on laptop using a financial app"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={cardVariants}
                className="h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-xl md:order-2"
              >
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                  alt="Data charts and graphs on a digital screen"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="text-center md:text-left md:order-1">
                <h3 className="font-serif text-3xl font-bold text-gold">
                  Step 02.
                </h3>
                <h4 className="text-2xl font-bold mt-1">Visualize Your Flow</h4>
                <p className="text-ink/60 dark:text-paper/60 mt-2">
                  Watch as FlowBit organizes your payments into a clean
                  dashboard. Use our analytics to instantly understand where
                  your money is going, by category and by total spend.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section className="py-20 px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Ready to End the Chaos?
          </h2>
          <p className="mt-4 text-lg text-ink/60 dark:text-paper/60 mb-8">
            Take the first step towards mastering your money. It's free, secure,
            and takes less than a minute to get started.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="inline-block bg-gold text-paper font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Unlock Financial Clarity
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default LandingPage;
