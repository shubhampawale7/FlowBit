// client/src/pages/ContactPage.jsx

import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaBuilding,
  FaQuestionCircle,
  FaArrowRight,
} from "react-icons/fa";

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
  viewport: { once: true, amount: 0.2 },
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  viewport: { once: true, amount: 0.3 },
};

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle form submission here.
    alert("Thank you for your message! (This is a demo)");
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="pt-20 bg-paper dark:bg-ink text-ink dark:text-paper"
    >
      {/* --- Hero Section --- */}
      <section className="text-center py-20 lg:py-28 px-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-5xl md:text-6xl font-bold tracking-tight"
        >
          Let's Talk
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 max-w-2xl mx-auto text-xl text-ink/60 dark:text-paper/60"
        >
          Whether you have a question, a proposal, or just want to say hello,
          we'd love to hear from you.
        </motion.p>
      </section>

      {/* --- Contact Options Grid --- */}
      <motion.section
        variants={sectionVariants}
        initial="initial"
        whileInView="whileInView"
        className="py-20 px-6 bg-paper-secondary dark:bg-ink-secondary"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={cardVariants} className="p-8 text-center">
            <FaEnvelope className="text-gold mx-auto h-10 w-10 mb-4" />
            <h3 className="font-serif text-2xl font-bold">General Inquiries</h3>
            <p className="my-2 text-ink/60 dark:text-paper/60">
              For general questions and portfolio inquiries.
            </p>
            <a
              href="mailto:contact@flowbit.app"
              className="font-semibold text-gold hover:underline"
            >
              contact@flowbit.app
            </a>
          </motion.div>
          <motion.div variants={cardVariants} className="p-8 text-center">
            <FaQuestionCircle className="text-gold mx-auto h-10 w-10 mb-4" />
            <h3 className="font-serif text-2xl font-bold">Support</h3>
            <p className="my-2 text-ink/60 dark:text-paper/60">
              Get help with our application or report an issue.
            </p>
            <a
              href="mailto:support@flowbit.app"
              className="font-semibold text-gold hover:underline"
            >
              support@flowbit.app
            </a>
          </motion.div>
          <motion.div variants={cardVariants} className="p-8 text-center">
            <FaBuilding className="text-gold mx-auto h-10 w-10 mb-4" />
            <h3 className="font-serif text-2xl font-bold">Partnerships</h3>
            <p className="my-2 text-ink/60 dark:text-paper/60">
              Interested in collaborating? Let's discuss.
            </p>
            <a
              href="mailto:partners@flowbit.app"
              className="font-semibold text-gold hover:underline"
            >
              partners@flowbit.app
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Contact Form Section --- */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            className="text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              Send Us a Message
            </h2>
            <p className="mt-4 text-lg text-ink/60 dark:text-paper/60 mb-12">
              Use the form below to get in touch with our team directly.
            </p>
          </motion.div>

          <motion.form
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.input
                variants={cardVariants}
                type="text"
                placeholder="Your Name"
                required
                className="w-full p-4 bg-paper-secondary dark:bg-ink-secondary rounded-lg border-2 border-transparent focus:outline-none focus:border-gold transition-colors"
              />
              <motion.input
                variants={cardVariants}
                type="email"
                placeholder="Your Email"
                required
                className="w-full p-4 bg-paper-secondary dark:bg-ink-secondary rounded-lg border-2 border-transparent focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <motion.input
              variants={cardVariants}
              type="text"
              placeholder="Subject"
              required
              className="w-full p-4 bg-paper-secondary dark:bg-ink-secondary rounded-lg border-2 border-transparent focus:outline-none focus:border-gold transition-colors"
            />
            <motion.textarea
              variants={cardVariants}
              rows="5"
              placeholder="Your message..."
              required
              className="w-full p-4 bg-paper-secondary dark:bg-ink-secondary rounded-lg border-2 border-transparent focus:outline-none focus:border-gold transition-colors"
            ></motion.textarea>
            <motion.div variants={cardVariants} className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="inline-flex items-center gap-2 bg-gold text-paper font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Send Message <FaArrowRight />
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;
