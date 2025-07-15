import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML5", icon: <i className="fab fa-html5 text-orange-600 text-3xl"></i> },
  { name: "CSS3", icon: <i className="fab fa-css3-alt text-blue-600 text-3xl"></i> },
  { name: "JavaScript", icon: <i className="fab fa-js-square text-yellow-400 text-3xl"></i> },
  { name: "React", icon: <i className="fab fa-react text-cyan-400 text-3xl"></i> },
  { name: "Tailwind CSS", icon: <i className="fas fa-wind text-teal-400 text-3xl"></i> }, // example icon
  { name: "Git", icon: <i className="fab fa-git-alt text-red-600 text-3xl"></i> },
];

export default function About() {
  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-12">
      <Navbar />

      {/* Heading with slide from left */}
      <motion.h1
        className="text-4xl font-bold mb-6 text-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        About Me
      </motion.h1>

      <section className="mb-12">
        {/* Paragraph 1 - slide from right */}
        <motion.p
          className="text-lg leading-relaxed text-gray-600 dark:text-gray-800"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Hi! I’m a passionate frontend web developer with experience building modern, responsive, and
          user-friendly websites and web applications. I enjoy turning ideas into beautiful, functional
          interfaces using the latest technologies.
        </motion.p>

        {/* Paragraph 2 - slide from left */}
        <motion.p
          className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-800"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          My main focus is creating smooth, performant user experiences with React, Tailwind CSS, and
          JavaScript, along with solid knowledge of HTML5 and CSS3. I’m constantly learning and growing my
          skillset to keep up with the fast-evolving frontend ecosystem.
        </motion.p>
      </section>

      {/* Skills Heading with slide from right */}
      <motion.h2
        className="text-2xl font-semibold mb-6 text-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        My Skills
      </motion.h2>

      <motion.div
        className="flex flex-wrap gap-6 justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center text-gray-600 bg-gray-900 px-20 py-5 rounded-lg hover:shadow-lg transition w-24"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div>{skill.icon}</div>
            <span className="mt-3 text-gray-600 font-medium text-center">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
