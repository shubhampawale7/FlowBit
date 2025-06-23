// client/src/pages/AboutUsPage.jsx

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

// Custom SVG Icon Components for a unique look
const ClarityIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
    <path d="M12 12L16 8" /> <path d="M12 12L8 16" />
  </svg>
);
const SecurityIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const EmpowermentIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <path d="M22 4L12 14.01l-3-3" />
  </svg>
);

// Parallax text reveal effect
const Paragraph = ({ value }) => {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.9", "start 0.25"],
  });
  const words = value.split(" ");
  return (
    <p
      ref={element}
      className="text-xl md:text-2xl font-sans text-ink/70 dark:text-paper/70 leading-relaxed max-w-3xl"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

const Word = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className="relative inline-block mr-3 mt-3"
    >
      {children}
    </motion.span>
  );
};

const AboutUsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 bg-paper dark:bg-ink text-ink dark:text-paper"
    >
      {/* --- Hero Section --- */}
      <section className="min-h-[70vh] flex items-center px-6 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight">
              We believe in financial{" "}
              <span className="text-gold">sovereignty.</span>
            </h1>
            <p className="mt-6 text-lg text-ink/60 dark:text-paper/60">
              FlowBit was founded on a single, powerful premise: that managing
              your money should be an act of empowerment, not a chore. We are
              architects of clarity in a world of financial noise.
            </p>
          </motion.div>
          <motion.div
            className="hidden lg:block w-full h-80 bg-gold/10 rounded-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <p className="font-serif text-gold/30 text-3xl">
                Abstract Financial Art!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Manifesto Section --- */}
      <section className="py-20 md:py-32 px-6 bg-paper-secondary dark:bg-ink-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <Paragraph value="Our purpose is not to simply track expenses. It is to illuminate the path your money travels, revealing habits, uncovering opportunities, and ultimately, giving you the agency to direct your financial future with intention and confidence." />
        </div>
      </section>

      {/* --- Pillars Section --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl font-bold text-center mb-16"
          >
            The Pillars of FlowBit
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-gold mx-auto mb-4">
                <SecurityIcon />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">
                Security as a Foundation
              </h3>
              <p className="text-ink/60 dark:text-paper/60">
                We don't add security as a feature; we build upon it. Utilizing
                bank-grade encryption and the secure Account Aggregator
                framework, your data's integrity is the bedrock of our platform.
                Trust isn't given, it's engineered.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-gold mx-auto mb-4">
                <ClarityIcon />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">
                Clarity through Design
              </h3>
              <p className="text-ink/60 dark:text-paper/60">
                We believe the greatest function is simplicity. We obsess over
                clean interfaces and intuitive workflows to eliminate friction,
                ensuring your financial overview is always understandable at a
                single glance.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-gold mx-auto mb-4">
                <EmpowermentIcon />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">
                Empowerment by Insight
              </h3>
              <p className="text-ink/60 dark:text-paper/60">
                Data is only useful when it leads to action. Our platform is
                designed not just to show you numbers, but to reveal the story
                behind them, empowering you to make smarter, more informed
                financial decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Final CTA Section --- */}
      <section className="py-20 px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Begin Your Journey to Clarity
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
              Create Your FlowBit Account
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUsPage;
