import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaWhatsapp } from "react-icons/fa";
import BottomNav from "../components/BottomNav";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

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
    <div className="max-w-4xl mx-auto px-1 mt-5 pt-5 mb-10 pb-10">
      <Navbar />

      {/* Heading animation */}
      <motion.h1
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-2xl sm:text-2xl font-bold mb-8 mt-5 text-center text-gray-500"
      >
        Contact Me
      </motion.h1>

      {/* Form animation */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg space-y-6"
        noValidate
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div>
          <label htmlFor="name" className="block mb-2 text-white font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-500"
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-white font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 text-white font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-500"
            placeholder="Write your message here..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 text-white font-semibold py-3 rounded-lg shadow-md"
        >
          Send Message
        </button>

        {status === "success" && (
          <p className="mt-4 text-green-400 text-center">
            ✅ Message sent successfully!
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-500 text-center">
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
  );
}
