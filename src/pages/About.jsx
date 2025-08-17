import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import gsap from "gsap";

const skills = [
  { name: "HTML5", icon: <i className="fab fa-html5 text-orange-400 text-3xl md:text-4xl"></i> },
  { name: "CSS3", icon: <i className="fab fa-css3-alt text-blue-400 text-3xl md:text-4xl"></i> },
  { name: "JavaScript", icon: <i className="fab fa-js-square text-yellow-300 text-3xl md:text-4xl"></i> },
  { name: "React", icon: <i className="fab fa-react text-cyan-300 text-3xl md:text-4xl"></i> },
  { name: "Tailwind CSS", icon: <i className="fas fa-wind text-teal-300 text-3xl md:text-4xl"></i> },
  { name: "Bootstrap", icon: <i className="fab fa-bootstrap text-purple-400 text-3xl md:text-4xl"></i> },
  { name: "Node.js", icon: <i className="fab fa-node-js text-green-400 text-3xl md:text-4xl"></i> },
  { name: "MongoDB", icon: <i className="fas fa-database text-green-500 text-3xl md:text-4xl"></i> },
  { name: "Firebase", icon: <i className="fas fa-fire text-orange-400 text-3xl md:text-4xl"></i> },
  { name: "Git", icon: <i className="fab fa-git-alt text-red-400 text-3xl md:text-4xl"></i> },
  { name: "GitHub", icon: <i className="fab fa-github text-gray-300 text-3xl md:text-4xl"></i> },
  { name: "GSAP", icon: <i className="fas fa-bolt text-green-300 text-3xl md:text-4xl"></i> },
  { name: "Framer Motion", icon: <i className="fas fa-wave-square text-pink-300 text-3xl md:text-4xl"></i> },
  { name: "Figma", icon: <i className="fab fa-figma text-pink-400 text-3xl md:text-4xl"></i> },
  { name: "VS Code", icon: <i className="fas fa-code text-blue-300 text-3xl md:text-4xl"></i> },
];

export default function About() {
  const headingRef = useRef(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }
  }, []);

  // Split heading into animated letters
  const heading = "About Me";
  const headingLetters = heading.split("").map((char, i) => (
    <span key={i} style={{ display: "inline-block" }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <div className="min-h-screen bg-black px-2 sm:px-4">
      <Navbar />

      {/* Animated Heading with GSAP */}
      <h1
        ref={headingRef}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
        style={{ letterSpacing: "0.08em" }}
      >
        {headingLetters}
      </h1>

      <section className="mb-12 p-5 max-w-3xl mx-auto">
        <motion.p
          className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200 text-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Hi! I’m a passionate frontend web developer with experience building modern, responsive, and
          user-friendly websites and web applications. I enjoy turning ideas into beautiful, functional
          interfaces using the latest technologies.
        </motion.p>

        <motion.p
          className="mt-6 text-base sm:text-lg md:text-xl leading-relaxed text-gray-200 text-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          My main focus is creating smooth, performant user experiences with React, Tailwind CSS, and
          JavaScript, along with solid knowledge of HTML5, CSS3, Node.js, MongoDB, and more. I’m constantly learning and growing my skillset to keep up with the fast-evolving frontend ecosystem.
        </motion.p>
      </section>

      {/* Skills Heading */}
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-8 text-center text-purple-300"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        My Technologies
      </motion.h2>

      {/* Skills Grid */}
      <motion.div
        className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center bg-gray-900 px-4 py-4 sm:px-6 sm:py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all w-24 sm:w-28 md:w-32 mb-4 border border-purple-700"
            whileHover={{ scale: 1.13, rotate: 6 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <div>{skill.icon}</div>
            <span className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-200 font-semibold text-center">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
