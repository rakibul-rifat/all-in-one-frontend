import React, { PureComponent } from 'react'
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

export default class GetInTouch extends PureComponent {
  render() {
    return (
      <div>


   <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.1)] space-y-6 border border-gray-700 mb-10 pb-10"
    >
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
        Get in Touch
      </h2>

      {/* Links */}
      <div className="flex flex-col space-y-4 text-sm font-medium">
        <a
          href="https://www.linkedin.com/in/rakibul-rifat/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl shadow-md hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all duration-300"
        >
          <FaLinkedin className="mr-4 text-cyan-400 text-xl" />
          <span className="text-gray-300">LinkedIn</span>
        </a>

        <a
          href="https://github.com/Rakibul-Rifat/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl shadow-md hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all duration-300"
        >
          <FaGithub className="mr-4 text-gray-400 text-xl" />
          <span className="text-gray-300">GitHub</span>
        </a>

        <a
          href="mailto:rakibulrifat@example.com"
          className="flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl shadow-md hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all duration-300"
        >
          <FaEnvelope className="mr-4 text-red-400 text-xl" />
          <span className="text-gray-300">rakibul.rifat44@gmail.com</span>
        </a>

        <div className="flex items-center bg-gray-800 px-4 py-3 rounded-xl shadow-md">
          <FaPhone className="mr-4 text-green-400 text-xl" />
          <span className="text-gray-300">+880-1618085195</span>
        </div>
      </div>
    </motion.div>
      </div>
    )
  }
}
