import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

const skills = [
  "HTML5", "CSS3", "JavaScript", "React",
  "Tailwind CSS", "Bootstrap", "Node.js",
  "MongoDB", "Firebase", "Git", "GitHub",
  "GSAP", "Framer Motion", "Figma", "VS Code"
];

export default function About() {
  const headingRef = useRef(null);
  const skillsRef = useRef([]);

  useEffect(() => {
    // Heading animation (zoom-in + fade)
    gsap.fromTo(
      headingRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Skills stagger animation (pop-in)
    gsap.fromTo(
      skillsRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.1,
        delay: 0.5,
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200 px-4 sm:px-6 py-10 mt-5 mb-8">
      <Navbar />

      {/* Heading */}
      <h1
        ref={headingRef}
        className="text-2xl sm:text-3xl md:text-2xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
        style={{ letterSpacing: "0.08em" }}
      >
        About Me
      </h1>

      {/* Bio Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-10 max-w-4xl mx-auto space-y-6"
      >
        <p className="text-sm sm:text-lg text-center leading-relaxed">
      I am a frontend-focused developer passionate about creating visually appealing, fast, and user-friendly web applications. I specialize in React, JavaScript, and Tailwind CSS, building responsive interfaces that work seamlessly across devices. I enjoy blending creativity with functionality, using Framer Motion and GSAP to add smooth, modern animations that enhance user experience. </p>
        <p className="text-sm sm:text-lg text-center leading-relaxed">
       While my core strength is frontend development, I also work with backend tools like Firebase and MongoDB for authentication, data handling, and real-time features. I’m a quick learner, always exploring new technologies to craft clean, functional, and engaging digital experiences that leave a lasting impression. </p>
      </motion.section>

      {/* Technologies Section */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-300 mb-6">
        Technologies & Tools
      </h2>
      <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center mb-12 px-5">
        {skills.map((skill, i) => (
          <div
            key={skill}
            ref={(el) => (skillsRef.current[i] = el)}
            className="flex items-center justify-center bg-gray-800 px-5 py-3 rounded-lg shadow-lg w-24 sm:w-28 md:w-32"
          >
            <span className="text-center text-sm px-2 sm:text-sm font-medium">
              {skill}
            </span>
          </div>
        ))}
      </div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-xl shadow-xl space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-cyan-400">
          Get in Touch
        </h2>
        <div className="flex flex-col space-y-3 text-lg">
          <a
            href="https://www.linkedin.com/in/rakibul-rifat/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-cyan-500"
          >
            <FaLinkedin className="mr-3 text-cyan-400" /> LinkedIn
          </a>
          <a
            href="https://github.com/Rakibul-Rifat/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-cyan-500"
          >
            <FaGithub className="mr-3 text-gray-400" /> GitHub
          </a>
          <a href="mailto:rakibulrifat@example.com" className="flex items-center hover:text-cyan-500">
            <FaEnvelope className="mr-3 text-red-400" /> rakibul.rifat44@gmail.com
          </a>
          <span className="flex items-center">
            <FaPhone className="mr-3 text-green-400" /> +880-1618085195
          </span>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
