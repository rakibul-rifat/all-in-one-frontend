import React from "react";
import Navbar from "../components/Navbar";

const skills = [
  { name: "HTML5", icon: <i className="fab fa-html5 text-orange-600 text-3xl"></i> },
  { name: "CSS3", icon: <i className="fab fa-css3-alt text-blue-600 text-3xl"></i> },
  { name: "JavaScript", icon: <i className="fab fa-js-square text-yellow-400 text-3xl"></i> },
  { name: "React", icon: <i className="fab fa-react text-cyan-400 text-3xl"></i> },
  { name: "Tailwind CSS", icon: <i className="fas fa-wind text-teal-400 text-3xl"></i> }, // example icon, you can replace
  { name: "Git", icon: <i className="fab fa-git-alt text-red-600 text-3xl"></i> },
];

export default function About() {
  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-12">
    <Navbar />
      <h1 className="text-4xl font-bold mb-6 text-center">About Me</h1>

      <section className="mb-12">
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
          Hi! I’m a passionate frontend web developer with experience building modern, responsive, and
          user-friendly websites and web applications. I enjoy turning ideas into beautiful, functional
          interfaces using the latest technologies.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-gray-800 dark:text-gray-200">
          My main focus is creating smooth, performant user experiences with React, Tailwind CSS, and
          JavaScript, along with solid knowledge of HTML5 and CSS3. I’m constantly learning and growing my
          skillset to keep up with the fast-evolving frontend ecosystem.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">My Skills</h2>

        <div className="flex flex-wrap gap-6 justify-center">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center bg-gray-900 p-6 rounded-lg hover:shadow-lg transition w-24"
            >
              <div>{skill.icon}</div>
              <span className="mt-3 text-white font-medium text-center">{skill.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
