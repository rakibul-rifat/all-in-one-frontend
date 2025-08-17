import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    // TODO: Send formData to backend or email service
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  };

  // WhatsApp Redirect
  const whatsappNumber = "8801618085195"; // replace with your number (without +)
  const whatsappMessage = `Hello, I want to get in touch with you!`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Navbar />
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 mt-5 text-center text-white">
        Contact Me
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg space-y-6"
        noValidate
      >
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-white font-medium"
          >
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
          <label
            htmlFor="email"
            className="block mb-2 text-white font-medium"
          >
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
          <label
            htmlFor="message"
            className="block mb-2 text-white font-medium"
          >
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
      </form>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          whatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-300"
      >
        <FaWhatsapp size={28} />
      </a>
    </div>
  );
}
