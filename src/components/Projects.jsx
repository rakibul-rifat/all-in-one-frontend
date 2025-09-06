import React from "react";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeProvider"; // Import the theme context

const projectList = [
  { name: "Portfolio Website", path: "https://rakibul-rifat.netlify.app/" },
  { name: "Todo", path: "/Todo" },
  { name: "Bangla Typing Practice", path: "/BanglaTypingPractice" },
  { name: "BlogPage", path: "/BlogPage" },
  { name: "Bank Deposit Profit Calculator", path: "/Calculator" },
  { name: "Landing page frontend project-1", path: "https://monitobuypet.netlify.app/" },
  { name: "Landing page frontend project-2", path: "https://cafe-street-shop.netlify.app/" },
  { name: "Landing page frontend project-3", path: "https://nexus-ai-event.netlify.app/" },
  { name: "Landing page frontend project-4", path: "https://jadoootravel.netlify.app/" },
  { name: "Landing page frontend project-5", path: "https://recipeitemss.netlify.app/" },
];

const Projects = () => {
  const { theme } = useTheme(); // Get current theme

  // Theme-based styles
  const sectionBg = theme === "dark" ? "bg-black" : "bg-white";
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const titleColor = theme === "dark" ? "text-gray-300" : "text-gray-800";
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const hoverTextColor = theme === "dark" ? "group-hover:text-cyan-600" : "group-hover:text-blue-600";
  const iconColor = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const hoverIconColor = theme === "dark" ? "group-hover:text-cyan-600" : "group-hover:text-blue-600";
  const shadow = theme === "dark" ? "shadow-lg" : "shadow-lg";
  const hoverShadow = theme === "dark" ? "hover:shadow-xl" : "hover:shadow-lg";

  return (
    <section id="projects" className={`${sectionBg} pb-10`}>
      <h2 className={`text-2xl font-bold text-center mb-10 ${titleColor} mt-20`}>
        My Projects
      </h2>

      <div className="max-w-4xl mx-auto grid gap-2 md:grid-cols-2">
        {projectList.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: index * 0.1,
            }}
          >
            <Link
              to={project.path}
              className={`${cardBg} ${shadow} ${hoverShadow} m-1 rounded-lg transition p-6 flex items-center justify-between group`}
            >
              <span className={`${textColor} font-medium ${hoverTextColor}`}>
                {project.name}
              </span>
              <FaExternalLinkAlt className={`${iconColor} ${hoverIconColor}`} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;