import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
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
  const skillsRef = useRef([]);

  useEffect(() => {
    // Animate heading with GSAP
    gsap.fromTo(
      headingRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Animate skills grid with GSAP stagger
    gsap.fromTo(
      skillsRef.current,
      { scale: 0, opacity: 0, y: 40 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.15,
        delay: 0.5,
      }
    );
  }, []);

  const heading = "About Me";

  return (
    <div className="min-h-screen bg-black px-2 sm:px-4 mb-10 mt-10 pt-10 pb-10">
      <Navbar />

      {/* Animated Heading */}
      <h1
        ref={headingRef}
        className="text-3xl sm:text-xl  md:text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
        style={{ letterSpacing: "0.08em" }}
      >
        {heading}
      </h1>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-12 p-2 max-w-4xl mx-auto"
      >
        <p className="text-base sm:text-sm md:text-xl leading-relaxed text-gray-200">
         I am a frontend-focused developer passionate about creating visually appealing, fast, and user-friendly web applications. I specialize in React, JavaScript, and Tailwind CSS, building responsive interfaces that work seamlessly across devices. I enjoy blending creativity with functionality, using Framer Motion and GSAP to add smooth, modern animations that enhance user experience.
        </p>

        <p className="mt-6 text-base sm:text-lg md:text-xl leading-relaxed text-gray-200">
       While my core strength is frontend development, I also work with backend tools like Firebase and MongoDB for authentication, data handling, and real-time features. I’m a quick learner, always exploring new technologies to craft clean, functional, and engaging digital experiences that leave a lasting impression.
        </p>
      </motion.section>

      {/* Skills Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-purple-300">
        My Technologies
      </h2>

      {/* Skills Grid */}
      <div className="flex max-w-4xl mx-auto flex-wrap gap-4  sm:gap-6 md:gap-8 justify-center">
        {skills.map((skill, i) => (
          <div
            key={skill.name}
            ref={(el) => (skillsRef.current[i] = el)}
            className="flex flex-col items-center bg-gray-900 px-8 py-4 sm:px-6 sm:py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all w-24 sm:w-28 md:w-32 mb-4 border border-purple-700"
          >
            <div>{skill.icon}</div>
            <span className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-200 font-semibold text-center">
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
