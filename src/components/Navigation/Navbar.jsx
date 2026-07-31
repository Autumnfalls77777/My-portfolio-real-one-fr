import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TYPEWRITER_TEXT = "Prabal_";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Designs", to: "/designs" },
  { label: "Software", to: "/software" },
  { label: "Resume", to: "/resume" },
  { label: "Career", to: "/career" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const speed = isDeleting ? 80 : 120;
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === TYPEWRITER_TEXT) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
      } else {
        setDisplayText(prev =>
          isDeleting ? prev.slice(0, -1) : TYPEWRITER_TEXT.slice(0, prev.length + 1)
        );
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isDarkBar = scrolled || mobileOpen;

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent"
        animate={{
          backgroundColor: isDarkBar ? "rgba(24, 20, 18, 0.95)" : "rgba(249, 248, 246, 0.85)",
          backdropFilter: "blur(12px)",
          borderColor: isDarkBar ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
          padding: scrolled ? "12px 0" : "18px 0",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className={`font-mono text-2xl font-semibold tracking-tight transition-colors duration-300 ${
              isDarkBar ? 'text-[#F9F8F6]' : 'text-obsidian'
            }`}>
              {displayText}
            </span>
            <span className={`w-[2px] h-6 ml-[1px] animate-cursor-blink ${
              isDarkBar ? 'bg-[#C49A6C]' : 'bg-obsidian'
            }`} />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="group relative px-4 py-2 text-base font-semibold transition-colors duration-300"
                  style={{
                    color: isDarkBar
                      ? (active ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)")
                      : (active ? "#0F0F0F" : "rgba(15, 15, 15, 0.65)")
                  }}
                >
                  {item.label}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#C49A6C] rounded-full transition-all duration-300"
                    style={{ width: active ? "24px" : "0px" }}
                  />
                  {!active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C49A6C] group-hover:w-6 rounded-full transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2 z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <motion.span
              className={`w-5 h-[1.5px] origin-center ${isDarkBar ? 'bg-white' : 'bg-obsidian'}`}
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 4 : 0 }}
            />
            <motion.span
              className={`w-3.5 h-[1.5px] origin-center ${isDarkBar ? 'bg-white' : 'bg-obsidian'}`}
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -3 : 0, width: mobileOpen ? "20px" : "14px" }}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#181412] text-white md:hidden flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={item.to}
                    className="text-3xl font-heading font-semibold transition-colors"
                    style={{ color: isActive(item.to) ? "#C49A6C" : "#FFFFFF" }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}