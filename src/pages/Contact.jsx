import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaWhatsapp } from "react-icons/fa";
import BottomNav from "../components/BottomNav";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeProvider"; // Import the theme context

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const { theme } = useTheme(); // Get current theme

  // Theme-based styles
  const containerBg = theme === "dark" ? "bg-black" : "bg-gray-100";
  const formBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const titleColor = theme === "dark" ? "text-gray-500" : "text-gray-600";
  const labelColor = theme === "dark" ? "text-white" : "text-gray-800";
  const inputBg = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const inputBorder = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const inputText = theme === "dark" ? "text-white" : "text-gray-900";
  const focusBorder = theme === "dark" ? "focus:border-cyan-500" : "focus:border-blue-500";
  const buttonBg = theme === "dark" ? "bg-cyan-600" : "bg-blue-600";
  const buttonHover = theme === "dark" ? "hover:bg-cyan-700" : "hover:bg-blue-700";
  const successColor = theme === "dark" ? "text-green-400" : "text-green-600";
  const errorColor = theme === "dark" ? "text-red-500" : "text-red-600";
  const shadow = theme === "dark" ? "shadow-lg" : "shadow-md";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  };

  const whatsappNumber = "8801618085195";
  const whatsappMessage = `Hello, I want to get in touch with you!`;

  return (
    <div className={`w-full ${containerBg}`}>

    <div className={`max-w-4xl mx-auto px-1 mt-5 pt-5  pb-20 ${containerBg}`}>

    <div className="max-w-4xl mx-auto px-1 mt-5 pt-5 mb-10 pb-10 ">

      <Navbar />

      {/* Heading animation */}
      <motion.h1
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`text-2xl sm:text-2xl font-bold mb-5 mt-8 text-center ${titleColor}`}
      >
        Contact Me
      </motion.h1>

      {/* Form animation */}
      <motion.form
        onSubmit={handleSubmit}

        className={`${formBg} p-2 sm:p-8 rounded-xl ${shadow} space-y-6`}
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div>
          <label htmlFor="name" className={`block mb-2 font-medium ${labelColor}`}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg ${inputBg} ${inputText} border ${inputBorder} focus:outline-none ${focusBorder}`}
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className={`block mb-2 font-medium ${labelColor}`}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg ${inputBg} ${inputText} border ${inputBorder} focus:outline-none ${focusBorder}`}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className={`block mb-2 font-medium ${labelColor}`}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg ${inputBg} ${inputText} border ${inputBorder} focus:outline-none ${focusBorder}`}
            placeholder="Write your message here..."
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full ${buttonBg} ${buttonHover} transition-all duration-300 text-white font-semibold py-3 rounded-lg ${shadow}`}
        >
          Send Message
        </button>

        {status === "success" && (
          <p className={`mt-4 text-center ${successColor}`}>
            ✅ Message sent successfully!
          </p>
        )}
        {status === "error" && (
          <p className={`mt-4 text-center ${errorColor}`}>
            ⚠️ Please fill in all fields correctly.
          </p>
        )}
      </motion.form>

      {/* Floating WhatsApp Button with bounce-in */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          whatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 mb-10 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-300 z-50"
        initial={{ opacity: 0, y: 80, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
      >
        <FaWhatsapp size={28} />
      </motion.a>

      <BottomNav />
    </div>
    </div>
    </div>
  );
}