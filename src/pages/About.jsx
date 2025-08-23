import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { motion } from "framer-motion";
import GetInTouch from "../components/GetInTouch";

const skills = [
  "HTML5", "CSS3", "JavaScript", "React",
  "Tailwind CSS", "Bootstrap", "Node.js",
  "MongoDB", "Firebase", "Git", "GitHub",
  "GSAP", "Framer Motion", "Figma", "VS Code"
];

export default function About() {
  const headingRef = useRef(null);

  return (
    <div className="max-w-4xl mx-auto bg-black text-gray-200 px-1 sm:px-6 py-10 mt-5 mb-8">
      <Navbar />

      {/* Heading */}
      <motion.h1
        ref={headingRef}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-2xl sm:text-3xl md:text-2xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
        style={{ letterSpacing: "0.08em" }}
      >
        About Me
      </motion.h1>

      {/* Bio Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-10 max-w-4xl mx-auto space-y-6"
      >
        <p className="text-sm sm:text-lg text-center leading-relaxed">
          I am a frontend-focused developer passionate about creating visually appealing, fast, and user-friendly web applications. I specialize in React, JavaScript, and Tailwind CSS, building responsive interfaces that work seamlessly across devices. I enjoy blending creativity with functionality, using Framer Motion and GSAP to add smooth, modern animations that enhance user experience.
        </p>
        <p className="text-sm sm:text-lg text-center leading-relaxed">
          While my core strength is frontend development, I also work with backend tools like Firebase and MongoDB for authentication, data handling, and real-time features. I’m a quick learner, always exploring new technologies to craft clean, functional, and engaging digital experiences that leave a lasting impression.
        </p>
      </motion.section>

      {/* Technologies Section */}
      <h2 className="text-2xl sm:text-3xl m-1 font-bold text-center text-purple-300 mb-6">
        Technologies & Tools
      </h2>
      <div className="grid grid-cols-4 gap-1 justify-center mb-12">
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.03, ease: "easeOut" }}
            className="flex items-center justify-center bg-gray-800 px-2 py-1 rounded-lg shadow-lg"
          >
            <span className="text-center text-xs sm:text-sm font-medium px-2">
              {skill}
            </span>
          </motion.div>
        ))}
      </div>

      <GetInTouch />
      <BottomNav />
    </div>
  );
}
