import React from 'react'
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import { useTheme } from "../context/ThemeProvider"; // Import the theme context

// Convert to functional component to use hooks
export default function GetInTouch() {
  const { theme } = useTheme(); // Get current theme

  // Theme-based styles
  const containerBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const containerBorder = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const cardHover = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200";
  const titleColor = theme === "dark" ? "text-cyan-400" : "text-blue-600";
  const titleGlow = theme === "dark" ? "drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]" : "drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]";
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const shadow = theme === "dark" ? "shadow-md" : "shadow-lg";
  const hoverGlow = theme === "dark" ? "hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]" : "hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]";
  
  // Icon colors
  const linkedinColor = theme === "dark" ? "text-cyan-400" : "text-blue-600";
  const githubColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const emailColor = theme === "dark" ? "text-red-400" : "text-red-600";
  const phoneColor = theme === "dark" ? "text-green-400" : "text-green-600";

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`max-w-4xl mx-auto ${containerBg} p-8 rounded-2xl ${shadow} space-y-6 border ${containerBorder} mb-10 pb-10`}
    >
      {/* Heading */}
      <h2 className={`text-3xl font-bold text-center ${titleColor} ${titleGlow}`}>
        Get in Touch
      </h2>

      {/* Links */}
      <div className="flex flex-col space-y-4 text-sm font-medium">
        <a
          href="https://www.linkedin.com/in/rakibul-rifat/"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center ${cardBg} ${cardHover} px-4 py-3 rounded-xl ${shadow} ${hoverGlow} transition-all duration-300`}
        >
          <FaLinkedin className={`mr-4 text-xl ${linkedinColor}`} />
          <span className={textColor}>LinkedIn</span>
        </a>

        <a
          href="https://github.com/Rakibul-Rifat/"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center ${cardBg} ${cardHover} px-4 py-3 rounded-xl ${shadow} ${hoverGlow} transition-all duration-300`}
        >
          <FaGithub className={`mr-4 text-xl ${githubColor}`} />
          <span className={textColor}>GitHub</span>
        </a>

        <a
          href="mailto:rakibul.rifat44@gmail.com"
          className={`flex items-center ${cardBg} ${cardHover} px-4 py-3 rounded-xl ${shadow} ${hoverGlow} transition-all duration-300`}
        >
          <FaEnvelope className={`mr-4 text-xl ${emailColor}`} />
          <span className={textColor}>rakibul.rifat44@gmail.com</span>
        </a>

        <div className={`flex items-center ${cardBg} px-4 py-3 rounded-xl ${shadow}`}>
          <FaPhone className={`mr-4 text-xl ${phoneColor}`} />
          <span className={textColor}>+880-1618085195</span>
        </div>
      </div>
    </motion.div>
  );
}