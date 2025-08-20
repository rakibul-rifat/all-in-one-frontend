import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; 
import { Home, User, FolderKanban, Mail, BookOpen } from "lucide-react";

const tabs = [
  { id: "home", label: "Home", icon: <Home size={22} />, href: "/" },
  { id: "about", label: "About", icon: <User size={22} />, href: "/about" },
  { id: "projects", label: "Projects", icon: <FolderKanban size={22} />, href: "/projects" },
  { id: "contact", label: "Contact", icon: <Mail size={22} />, href: "/contact" },
  { id: "blog", label: "Blog", icon: <BookOpen size={22} />, href: "/blog" },
];

export default function BottomNav() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  return (
    <div className="fixed lg:hidden bottom-0 left-0 right-0 m-0 max-w-4xl mx-auto bg-gray-900 text-white rounded-t-2xl shadow-lg px-2 py-1 flex justify-between">
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
              className="absolute -top-4 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center shadow-md"
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          )}

          <motion.div
            animate={{
              scale: active === tab.href ? 1.2 : 1,
              y: active === tab.href ? -6 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative z-10 transition-colors ${
              active === tab.href ? "text-gray-300" : "text-gray-400"
            }`}
          >
            {tab.icon}
          </motion.div>

          <span
            className={`text-xs mt-1 relative z-10 ${
              active === tab.href ? "text-white font-medium" : "text-gray-400"
            }`}
          >
            {tab.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
