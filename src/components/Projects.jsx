import React from "react";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";

const projectList = [
  { name: "Portfolio Website", path: "https://rakibul-rifat.netlify.app/" },
  { name: "Todo", path: "/Todo" },
  { name: "Bangla Typing Practice", path: "/BanglaTypingPractice" },
  { name: "BlogPage", path: "/BlogPage" },
  { name: "Bank Deposit Profit Calculator", path: "/Calculator" },
  // { name: "ImageSearch", path: "/ImageSearch" },
];

const Projects = () => {
  return (
    <section id="projects" className=" bg-black pb-10 ">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 mt-5">My Projects</h2>
      <div className="max-w-4xl mx-auto grid gap-6  md:grid-cols-2">
        {projectList.map((project) => (
          <Link
            key={project.name}
            to={project.path}
            className="bg-gray-900 mx-4 rounded-lg shadow hover:shadow-xl transition p-6 flex items-center justify-between group"
          >
            <span className="text-gray-700 font-medium group-hover:text-cyan-600">
              {project.name}
            </span>
            <FaExternalLinkAlt className="text-gray-400 group-hover:text-cyan-600" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Projects;
