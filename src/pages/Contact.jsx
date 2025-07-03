import React, { useState } from "react";
import Navbar from "../components/Navbar";

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

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    // TODO: Send form data to backend or email service

    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-12">
      <Navbar />
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Me</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg shadow-md"
        noValidate
      >
        <div className="mb-6">
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
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-500"
            placeholder="Your full name"
            required
          />
        </div>

        <div className="mb-6">
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
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-6">
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
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-500"
            placeholder="Write your message here..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 transition text-white font-semibold py-3 rounded"
        >
          Send Message
        </button>

        {status === "success" && (
          <p className="mt-4 text-green-400 text-center">Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-500 text-center">
            Please fill in all fields correctly.
          </p>
        )}
      </form>
    </div>
  );
}
