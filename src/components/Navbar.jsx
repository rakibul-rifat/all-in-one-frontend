import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownToLine } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/About" },
    { name: "Projects", href: "/Projects" },
    { name: "Contact", href: "/Contact" },
    { name: "Blog", href: "/Blog" },
  ];

  // Theme-based styles
  const navBg = theme === "dark" ? "bg-gray-900" : "bg-gray-300 sm:bg-gray-100";
  const desktopNavBg = theme === "dark" ? "sm:bg-black" : "sm:bg-gray-100";
  const textColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const linkColor = theme === "dark" ? "text-gray-500" : "text-gray-600";
  const linkHover = theme === "dark" ? "hover:text-cyan-600" : "hover:text-blue-600";
  const mobileMenuBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const mobileLinkColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const mobileLinkHover = theme === "dark" ? "hover:text-cyan-600" : "hover:text-blue-600";
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const shadow = theme === "dark" ? "shadow-md" : "shadow-sm";

  const resumePath = "/Rakibul_Islam_Resume_Frontend_Web_Developer.pdf";

  const handleResumeClick = () => {
    window.open(resumePath, "_blank");
  };

  return (
    <nav className={`${desktopNavBg} ${navBg} rounded-b-lg ${shadow} fixed top-0 left-0 w-full z-50`}>
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className={`left-0 text-sm ${textColor}`}>ONE LAST TRY</h1>

        {/* Theme Toggle */}
        <div className="fixed top-3 right-20 z-50">
          <ThemeToggle />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`${linkColor} ${linkHover} transition font-medium`}
            >
              {link.name}
            </a>
          ))}

          {/* Modern Resume Button */}
          <button
            onClick={handleResumeClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium shadow-md transition-all duration-300 ${
              theme === "dark"
                ? "bg-gradient-to-r from-cyan-600 to-blue-700 text-white hover:scale-105 hover:shadow-cyan-700/30"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-105 hover:shadow-blue-500/30"
            }`}
          >
            <ArrowDownToLine className="w-5 h-5" />
            Resume
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${textColor} focus:outline-none`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Links with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={`md:hidden pt-10 px-4 pb-10 space-y-2 ${mobileMenuBg} rounded-xl text-center ${shadow} border-t ${borderColor}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block ${mobileLinkColor} ${mobileLinkHover} transition font-medium py-2`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}

            {/* Resume Button (Mobile) */}
            <button
              onClick={handleResumeClick}
              className={`mt-4 flex mx-auto items-center justify-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-700 text-white hover:scale-105 hover:shadow-cyan-700/30"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-105 hover:shadow-blue-500/30"
              }`}
            >
              <ArrowDownToLine className="w-5 h-5" />
              Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
