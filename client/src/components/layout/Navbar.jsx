// client/src/components/layout/Navbar.jsx

import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaSun,
  FaMoon,
  FaUser,
  FaSignOutAlt,
  FaThLarge,
  FaCog,
  FaBars,
  FaTimes,
  FaWallet,
  FaConciergeBell,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";

// Custom NavLink for Desktop
const DesktopNavLink = ({ to, icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 font-semibold text-sm transition-colors duration-200 ${
        isActive
          ? "text-gold"
          : "text-ink/60 dark:text-paper/60 hover:text-ink dark:hover:text-paper"
      }`
    }
  >
    {icon}
    {children}
  </NavLink>
);

// User Dropdown Menu Component
const UserDropdownMenu = ({ user, onLogout, closeMenu }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="absolute right-0 mt-4 w-60 bg-paper dark:bg-ink-secondary rounded-xl shadow-2xl border border-paper-secondary dark:border-ink overflow-hidden"
  >
    <div className="p-2">
      <div className="px-3 py-2 border-b border-paper-secondary dark:border-ink">
        <p className="text-sm font-semibold truncate">{user.name}</p>
        <p className="text-xs text-ink/50 dark:text-paper/50 truncate">
          {user.email}
        </p>
      </div>
      <div className="py-2">
        <Link
          to="/dashboard"
          onClick={closeMenu}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-paper-secondary dark:hover:bg-ink transition-colors"
        >
          <FaThLarge className="w-4 h-4" /> Dashboard
        </Link>
        <Link
          to="/profile"
          onClick={closeMenu}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-paper-secondary dark:hover:bg-ink transition-colors"
        >
          <FaCog className="w-4 h-4" /> Settings
        </Link>
      </div>
      <div className="h-px bg-paper-secondary dark:border-ink my-0" />
      <div className="p-2">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <FaSignOutAlt className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  </motion.div>
);

// Mobile Menu Component
const MobileMenu = ({ onLogout, closeMenu, user }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
    onClick={closeMenu}
  >
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-paper dark:bg-ink shadow-2xl p-6 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-10">
        <span className="font-serif text-xl font-bold">Menu</span>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={closeMenu}
          className="p-2"
        >
          <FaTimes size={24} />
        </motion.button>
      </div>
      <div className="flex flex-col space-y-6 text-lg font-medium flex-grow">
        <Link
          to="/services"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <FaConciergeBell /> Services
        </Link>
        <Link
          to="/about"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <FaInfoCircle /> About
        </Link>
        <Link
          to="/contact"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <FaEnvelope /> Contact
        </Link>
      </div>
      <div className="border-t border-paper-secondary dark:border-ink-secondary pt-6 mt-6 space-y-4">
        {user ? (
          <>
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="flex items-center gap-4 text-lg"
            >
              <FaThLarge /> Dashboard
            </Link>
            <Link
              to="/profile"
              onClick={closeMenu}
              className="flex items-center gap-4 text-lg"
            >
              <FaCog /> Account Settings
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-4 text-red-500 text-lg"
            >
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={closeMenu}
              className="block text-center w-full py-3 rounded-full bg-paper-secondary dark:bg-ink-secondary font-semibold"
            >
              Log In
            </Link>
            <Link
              to="/register"
              onClick={closeMenu}
              className="block text-center w-full py-3 bg-gold text-paper rounded-full font-semibold"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </motion.div>
  </motion.div>
);

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuRef]);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    logout();
    toast.success("You've been logged out successfully.");
    navigate("/");
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-paper dark:bg-ink border-b border-paper-secondary dark:border-ink-secondary shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              to="/"
              className="flex items-center space-x-2 text-ink dark:text-paper"
            >
              <FaWallet className="h-8 w-8 text-gold" />
              <span className="font-serif text-2xl font-bold tracking-tight">
                FlowBit
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <DesktopNavLink to="/services" icon={<FaConciergeBell />}>
                Services
              </DesktopNavLink>
              <DesktopNavLink to="/about" icon={<FaInfoCircle />}>
                About
              </DesktopNavLink>
              <DesktopNavLink to="/contact" icon={<FaEnvelope />}>
                Contact
              </DesktopNavLink>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                whileTap={{ scale: 0.9, rotate: 180 }}
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-ink/70 dark:text-paper/70 hover:bg-paper-secondary dark:hover:bg-ink-secondary transition-colors"
              >
                {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
              </motion.button>

              <div className="hidden md:flex items-center space-x-4">
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsUserMenuOpen((p) => !p)}
                      className="p-2 rounded-full hover:bg-paper-secondary dark:hover:bg-ink-secondary"
                    >
                      <FaUser size={20} />
                    </motion.button>
                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <UserDropdownMenu
                          user={user}
                          onLogout={handleLogout}
                          closeMenu={() => setIsUserMenuOpen(false)}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-semibold text-ink/70 dark:text-paper/70 hover:text-ink dark:hover:text-paper transition-colors"
                    >
                      Log In
                    </Link>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/register"
                        className="bg-gold text-paper px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-gold/20 hover:shadow-xl transition-shadow"
                      >
                        Sign Up Free
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>

              <div className="md:hidden">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2.5"
                >
                  <FaBars size={22} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            onLogout={handleLogout}
            closeMenu={() => setIsMobileMenuOpen(false)}
            user={user}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
