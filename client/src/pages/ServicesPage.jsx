// client/src/pages/ServicesPage.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChartPie,
  FaBell,
  FaLock,
  FaMagic,
  FaChevronDown,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Animation Variants
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
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.2 },
  },
  viewport: { once: true, amount: 0.1 },
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  viewport: { once: true, amount: 0.3 },
};

// Data for the page with real image URLs
const services = [
  {
    icon: FaMagic,
    title: "Automated Subscription Discovery",
    description:
      "Our smart engine is the heart of FlowBit. Once connected via the secure Account Aggregator network, it meticulously scans your transaction history to automatically identify recurring payments. It intelligently detects patterns, merchants, and frequencies to build a comprehensive list of your subscriptions—even the ones you forgot about.",
    image:
      "https://images.unsplash.com/photo-1605165540422-ecd23dcad583?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    align: "right",
  },
  {
    icon: FaChartPie,
    title: "Insightful Spending Analytics",
    description:
      "Data is useless without understanding. FlowBit transforms your raw transaction data into beautiful, intuitive visualizations. See exactly where your money goes each month with dynamic charts, understand your spending habits by category, and track your financial flow over time to budget smarter and save more.",
    image:
      "https://images.unsplash.com/photo-1650821414390-276561abd95a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    align: "left",
  },
  {
    icon: FaBell,
    title: "Proactive Payment Reminders",
    description:
      "Never get caught off guard by an unexpected charge again. Our system provides timely, intelligent alerts for your upcoming subscription payments. By helping you anticipate debits, we empower you to manage your cash flow effectively and avoid overdraft fees or service interruptions.",
    image:
      "https://images.unsplash.com/photo-1603940516962-4976f0d44a19?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D04ba2?q=80&w=2070&auto=format&fit=crop",
    align: "right",
  },
  {
    icon: FaLock,
    title: "Bank-Grade Security & Privacy",
    description:
      "Your trust is our most important asset. FlowBit is built upon the RBI-approved Account Aggregator framework, meaning we never see or store your banking credentials. All your data is handled with end-to-end encryption, ensuring your financial information remains yours, and yours alone.",
    image:
      "https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    align: "left",
  },
];

const faqs = [
  {
    question: "Is my financial data safe with FlowBit?",
    answer:
      "Absolutely. Security is our highest priority. We use the RBI-approved Account Aggregator framework, which means we never see or store your banking credentials. All data is transferred with end-to-end encryption.",
  },
  {
    question: "How does the automatic discovery work?",
    answer:
      "Once you grant consent via the secure Account Aggregator network, our system analyzes your transaction history using pattern recognition to identify recurring payments. You have full control to confirm or ignore these suggestions.",
  },
  {
    question: "Is FlowBit free to use?",
    answer:
      "Yes! FlowBit offers a powerful free tier that allows you to track a set number of subscriptions and view your dashboard. We plan to introduce a Premium tier with more advanced features like unlimited tracking and custom alerts in the future.",
  },
  {
    question: "What if a subscription is not found automatically?",
    answer:
      "No problem. Our platform has a simple and intuitive interface for you to manually add any subscription that our system might miss, giving you a complete and accurate picture of your finances.",
  },
];

const FAQItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      variants={cardVariants}
      className="border-b border-paper-secondary dark:border-ink-secondary"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-5 text-left"
      >
        <span className="text-lg font-semibold">{q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-10 text-ink/60 dark:text-paper/60">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ServicesPage = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="pt-20 bg-paper dark:bg-ink text-ink dark:text-paper"
    >
      <section className="text-center py-20 lg:py-28 px-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-5xl md:text-6xl font-bold tracking-tight"
        >
          Features & Services
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 max-w-2xl mx-auto text-xl text-ink/60 dark:text-paper/60"
        >
          A suite of powerful tools, meticulously designed to bring clarity and
          control to your financial life.
        </motion.p>
      </section>

      <div className="space-y-20 md:space-y-32 py-20 px-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className={`lg:order-${service.align === "left" ? 1 : 2}`}>
              <div className="text-gold mb-4">
                <service.icon size={32} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                {service.title}
              </h2>
              <p className="mt-4 text-lg text-ink/60 dark:text-paper/60">
                {service.description}
              </p>
            </div>
            <motion.div
              variants={cardVariants}
              className={`h-80 w-full rounded-2xl overflow-hidden shadow-2xl lg:order-${
                service.align === "left" ? 2 : 1
              }`}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.section
        variants={sectionVariants}
        initial="initial"
        whileInView="whileInView"
        className="py-20 px-4 bg-paper-secondary dark:bg-ink-secondary"
      >
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12">
          Simple, Transparent Pricing
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={cardVariants}
            className="p-8 border-2 border-paper dark:border-ink rounded-2xl flex flex-col hover:border-gold/30 transition-colors"
          >
            <h3 className="font-serif text-2xl font-bold">Free</h3>
            <p className="text-4xl font-bold my-4">
              ₹0{" "}
              <span className="text-lg font-normal text-ink/50 dark:text-paper/50">
                / month
              </span>
            </p>
            <p className="text-ink/60 dark:text-paper/60 mb-6 flex-grow">
              For individuals getting started on their financial clarity
              journey.
            </p>
            <ul className="space-y-3 text-sm mb-8">
              <li className="flex items-center gap-3">
                ✓ Track up to 10 subscriptions
              </li>
              <li className="flex items-center gap-3">
                ✓ Basic spending analytics
              </li>
              <li className="flex items-center gap-3">✓ Secure manual entry</li>
            </ul>
            <Link to="/register">
              <button className="w-full py-3 font-bold bg-paper dark:bg-ink rounded-full border border-paper-secondary dark:border-ink-secondary hover:border-gold/50">
                Get Started
              </button>
            </Link>
          </motion.div>
          <motion.div
            variants={cardVariants}
            className="p-8 border-2 border-gold rounded-2xl flex flex-col relative overflow-hidden bg-gradient-to-br from-gold/5 to-transparent"
          >
            <div className="absolute top-0 right-0 px-4 py-1 bg-gold text-paper text-xs font-bold rounded-bl-lg">
              PREMIUM
            </div>
            <h3 className="font-serif text-2xl font-bold">Pro</h3>
            <p className="text-4xl font-bold my-4">
              ₹99{" "}
              <span className="text-lg font-normal text-ink/50 dark:text-paper/50">
                / month
              </span>
            </p>
            <p className="text-ink/60 dark:text-paper/60 mb-6 flex-grow">
              For power users who want full automation and deeper insights.
            </p>
            <ul className="space-y-3 text-sm mb-8">
              <li className="flex items-center gap-3 text-gold">
                <FaArrowRight size={12} />
                <span className="text-ink dark:text-paper">
                  Unlimited subscriptions
                </span>
              </li>
              <li className="flex items-center gap-3 text-gold">
                <FaArrowRight size={12} />
                <span className="text-ink dark:text-paper">
                  Automated discovery (AA)
                </span>
              </li>
              <li className="flex items-center gap-3">
                ✓ Advanced analytics & reports
              </li>
              <li className="flex items-center gap-3">
                ✓ Upcoming payment reminders
              </li>
              <li className="flex items-center gap-3">✓ Priority support</li>
            </ul>
            <Link to="/register">
              <button className="w-full py-3 font-bold bg-gold text-paper rounded-full shadow-lg shadow-gold/20 hover:shadow-xl transition-shadow">
                Go Pro
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="initial"
        whileInView="whileInView"
        className="py-20 px-6"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <FAQItem key={index} q={faq.question} a={faq.answer} />
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ServicesPage;
