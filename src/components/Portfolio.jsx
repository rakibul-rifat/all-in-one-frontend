import React from "react";
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
  SiFirebase,
  SiMongodb,
} from "react-icons/si";
import { motion } from "framer-motion";
import WeatherWidget from "./WeatherWidget";

const Portfolio = () => {
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
    { name: "Vercel", icon: <SiVercel className="text-white" /> },
    { name: "Mongodb", icon: <SiMongodb className="text-green-400" /> },
    { name: "Firebase", icon: <SiFirebase className="text-orange-400" /> },
  ];

  const socials = [
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/Rakibul-Rifat" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com" },
    { name: "Facebook", icon: <FaFacebook />, url: "https://facebook.com" },
  ];

  const zoomInVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};


  return (
    <div className="max-w-4xl mx-auto p-1 shadow-xl rounded-xl mt-7 bg-black">
      {/* Profile Section */}
<motion.div
  variants={zoomInVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  className="flex items-center sm:bg-black bg-gray-900 p-4 rounded-lg space-x-6 mt-8"
>
  <img
    src="https://avatars.githubusercontent.com/u/192508513?v=4"
    alt="Profile"
    className="w-32 h-32 rounded-full object-cover border-4 border-gray-500"
  />
  <div>
    <h1 className="text-xl text-gray-500 font-bold">Rakibul Islam</h1>
    <p className="text-gray-600 text-sm">Frontend Web Developer</p>
    <p className="text-gray-500 text-sm">
      I love creating beautiful and interactive user interfaces.
    </p>
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
</motion.div>


      <WeatherWidget />

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-5"
      >
        <div className="flex flex-wrap gap-4 justify-center">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto flex flex-col items-center p-4 py-5 rounded-lg hover:shadow-lg transition basis-[calc((100%/3)-1rem)] sm:basis-[calc((100%/4)-1rem)] md:basis-[calc((100%/6)-1rem)] max-w-[calc((100%/3)-1rem)] sm:max-w-[calc((100%/4)-1rem)] md:max-w-[calc((100%/6)-1rem)]"
            >
              {skill.icon}
              <span className="mt-2 text-sm text-gray-500 text-center">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

    {/* GitHub Stats */}
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1, x: 0, scale: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true }}
  className="flex mt-5 flex-col items-center justify-center gap-6 p-6 bg-gray-900 rounded-2xl shadow-lg"
>
  <h2 className="text-2xl md:text-3xl font-bold text-gray-500 text-center">
    📈 GitHub Stats
  </h2>
  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
    <img
      src="https://github-readme-stats.vercel.app/api?username=Rakibul-Rifat&show_icons=true&theme=radical"
      alt="Rakibul's GitHub stats"
      className="w-full max-w-md rounded-xl"
    />
    <img
      src="https://github-readme-stats.vercel.app/api/top-langs/?username=Rakibul-Rifat&layout=compact&theme=radical"
      alt="Top Languages"
      className="w-full max-w-xs rounded-xl"
    />
  </div>
</motion.div>

    </div>
  );
};

export default Portfolio;
