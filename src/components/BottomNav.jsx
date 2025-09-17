import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; 
import { Home, User, FolderKanban, Mail, BookOpen } from "lucide-react";
import { useTheme } from "../context/ThemeProvider"; // Import the theme context

const tabs = [
  { id: "about", label: "About", icon: <User size={22} />, href: "/about" },
  { id: "projects", label: "Projects", icon: <FolderKanban size={22} />, href: "/projects" },
  { id: "home", label: "Home", icon: <Home size={22} />, href: "/" },
  { id: "contact", label: "Contact", icon: <Mail size={22} />, href: "/contact" },
  { id: "blog", label: "Blog", icon: <BookOpen size={22} />, href: "/blog" },
];

export default function BottomNav() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const { theme } = useTheme(); // Get current theme

  // Theme-based styles
  const navBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const navBorder = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const activeBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const activeBorder = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const activeText = theme === "dark" ? "text-cyan-600" : "text-blue-600";
  const inactiveText = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const shadow = theme === "dark" ? "shadow-lg" : "shadow-md";

  return (
    <div className={`fixed lg:hidden bottom-0 left-0 right-0 m-0 max-w-4xl mx-auto ${navBg} text-white rounded-t-2xl ${shadow} px-2 flex justify-between border-t-2 ${navBorder}`}>
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          to={tab.href}
          className="relative flex flex-col items-center justify-center flex-1 py-2"
          onClick={() => setActive(tab.href)}
        >
          {active === tab.href && (
            <motion.div
              layoutId="activeHighlight"
              className={`absolute -top-4 w-12 h-12 ${activeBg} rounded-full flex items-center justify-center ${shadow} border-2 ${activeBorder}`}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          )}

          <motion.div
            animate={{
              scale: active === tab.href ? 1 : 1,
              y: active === tab.href ? -10 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative z-10 transition-colors ${
              active === tab.href ? activeText : inactiveText
            }`}
          >
            {tab.icon}
          </motion.div>
          <span
            className={`text-[10px] mt-1 relative z-10 ${
              active === tab.href ? `${activeText} font-medium` : inactiveText
            }`}
          >
            {tab.label}
          </span>
        </Link>
      ))}
    </div>
  );
}