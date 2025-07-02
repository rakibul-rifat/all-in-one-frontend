import React, { useEffect } from "react";
import Navbar from "./Navbar";
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaBootstrap,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiFramer,
  SiNetlify,
  SiVercel,
  SiCss3,
} from "react-icons/si";
import gsap from "gsap";
import Projects from "./Projects";

const Portfolio = () => {
 useEffect(() => {
  let progress = { width: 0 };
  gsap.to(progress, {
    width: 100,
    duration: 2,
    ease: "power1.out",
    onUpdate: () => {
      const bar = document.getElementById("loader-bar");
      const text = document.getElementById("loader-percentage");
      if (bar && text) {
        bar.style.width = `${progress.width}%`;
        text.textContent = `${Math.round(progress.width)}%`;
      }
    },
    onComplete: () => {
      gsap.to("#loader-wrapper", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          document.getElementById("loader-wrapper").style.display = "none";
        },
      });
    },
  });
}, []);


  const skills = [
    { name: "React", icon: <FaReact className="text-sky-500" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: "Bootstrap", icon: <FaBootstrap className="text-purple-600" /> },
    { name: "Framer Motion", icon: <SiFramer className="text-pink-500" /> },
    { name: "Animate.css", icon: <SiCss3 className="text-indigo-500" /> },
    { name: "Netlify", icon: <SiNetlify className="text-green-400" /> },
    { name: "Vercel", icon: <SiVercel className="text-black" /> },
  ];

  const socials = [
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/Rakibul-Rifat" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com" },
    { name: "Facebook", icon: <FaFacebook />, url: "https://facebook.com" },
  ];

  return (
    <>
     {/* Loader */}
{/* <div
  id="loader-wrapper"
  className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
>
  <p className="text-cyan-400 mb-2">loading</p>
  <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
    <div
      id="loader-bar"
      className="h-full bg-cyan-400 rounded-full"
      style={{ width: "0%" }}
    ></div>
  </div>
  <p id="loader-percentage" className="text-cyan-400 mt-2">
    0%
  </p>
</div> */}



      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 shadow-xl rounded-xl mt-10 bg-black">
        <Navbar />
        {/* Profile Section */}
        <div className="flex items-center space-x-6">
          <img
            src="https://avatars.githubusercontent.com/u/192508513?v=4"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500"
          />
          <div>
            <h1 className="text-3xl text-gray-500 font-bold">Rakibul Islam</h1>
            <p className="text-gray-600">Frontend Web Developer 💻</p>
            <p className="text-gray-500">I love creating beautiful and interactive user interfaces.</p>
            <div className="flex space-x-4 mt-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-gray-600 hover:text-cyan-500 text-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col items-center bg-gray-900 p-4 rounded-lg w-24 hover:shadow-lg transition"
              >
                {skill.icon}
                <span className="mt-2 text-sm text-white text-center">{skill.name}</span>
              </div>
            ))}
          </div>
          <Projects />
        </div>

        {/* Projects Section */}
       
      </div>
    </>
  );
};

export default Portfolio;
