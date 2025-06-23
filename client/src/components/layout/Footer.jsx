// client/src/components/layout/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaArrowRight,
  FaWallet,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-paper-secondary dark:bg-ink-secondary text-ink/70 dark:text-paper/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* --- Main Footer Section --- */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Branding & Newsletter */}
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-2 mb-4">
              <FaWallet className="h-8 w-8 text-gold" />
              <span className="font-serif text-2xl font-bold text-ink dark:text-paper">
                FlowBit
              </span>
            </div>
            <p className="font-sans text-base max-w-sm">
              Your command center for financial clarity. Get tips, insights, and
              product updates delivered directly to your inbox.
            </p>
            <form className="mt-6 flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-paper dark:bg-ink rounded-l-full border-2 border-transparent focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="p-4 bg-gold text-paper rounded-r-full hover:opacity-90 transition-opacity"
              >
                <FaArrowRight />
              </button>
            </form>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-lg font-bold text-ink dark:text-paper">
                Navigate
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-gold transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="hover:text-gold transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-gold transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-ink dark:text-paper">
                Account
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    to="/login"
                    className="hover:text-gold transition-colors"
                  >
                    Log In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-gold transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-gold transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-ink dark:text-paper">
                Legal
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#" className="hover:text-gold transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gold transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- Sub-Footer --- */}
        <div className="py-6 border-t border-paper dark:border-ink flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-ink/50 dark:text-paper/50 text-center sm:text-left">
            &copy; {new Date().getFullYear()} FlowBit. A MERN Portfolio Project.
            All Rights Reserved.
          </p>
          <div className="flex space-x-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/60 dark:text-paper/60 hover:text-gold transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/60 dark:text-paper/60 hover:text-gold transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/60 dark:text-paper/60 hover:text-gold transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
