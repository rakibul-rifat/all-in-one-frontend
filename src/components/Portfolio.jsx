import React, { useEffect, useRef } from "react";
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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WeatherWidget from "./WeatherWidget";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const profileRef = useRef(null);
  const skillsRef = useRef(null);
  const statsRef = useRef(null);
  const weatherRef = useRef(null);

  useEffect(() => {
    // Animate profile section
    gsap.fromTo(profileRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: profileRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Animate skills section
    gsap.fromTo(skillsRef.current, 
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Animate stats section
    gsap.fromTo(statsRef.current, 
      { opacity: 0, x: 50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Animate weather widget
    gsap.fromTo(weatherRef.current, 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1,
        scrollTrigger: {
          trigger: weatherRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Clean up ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    { name: "React", icon: <FaReact className="text-sky-500" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: "Bootstrap", icon: <FaBootstrap className="text-purple-600" /> },
    { name: "Framer Motion", icon: <SiFramer className="text-pink-500" /> },
    { name: "Animate .css", icon: <SiCss3 className="text-indigo-500" /> },
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

  // Framer Motion variants for skill items
  const skillItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto p-1 shadow-xl rounded-xl mt-7 bg-black"
    >
      {/* Profile Section */}
      <div 
        ref={profileRef}
        className="flex items-center sm:bg-black bg-gray-900 p-4 rounded-lg space-x-6 mt-8"
      >
        <motion.img
          src="https://avatars.githubusercontent.com/u/192508513?v=4"
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-500"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <div>
          <h1 className="text-xl text-gray-500 font-bold">Rakibul Islam</h1>
          <p className="text-gray-600">Frontend Web Developer</p>
          <p className="text-gray-500">I love creating beautiful and interactive user interfaces.</p>
          <div className="flex space-x-4 mt-2">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                className="text-gray-600 hover:text-cyan-500 text-xl"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Weather Widget */}
      <div ref={weatherRef}>
        <WeatherWidget />
      </div>

      {/* Skills Section */}
      <div ref={skillsRef} className="mt-5">
        <h2 className="text-2xl font-bold text-gray-500 mb-4 text-center">
          Skills & Technologies
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center p-4 py-5 rounded-lg hover:shadow-lg transition basis-[calc((100%/3)-1rem)] sm:basis-[calc((100%/4)-1rem)] md:basis-[calc((100%/6)-1rem)] max-w-[calc((100%/3)-1rem)] sm:max-w-[calc((100%/4)-1rem)] md:max-w-[calc((100%/6)-1rem)]"
              variants={skillItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              {skill.icon}
              <span className="mt-2 text-sm text-gray-500 text-center">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* GitHub Stats */}
      <div 
        ref={statsRef}
        className="flex mt-5 flex-col items-center justify-center gap-6 p-6 bg-gray-900 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-500 text-center">
          📈 GitHub Stats
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <motion.img
            src="https://github-readme-stats.vercel.app/api?username=Rakibul-Rifat&show_icons=true&theme=radical"
            alt="Rakibul's GitHub stats"
            className="w-full max-w-md rounded-xl"
         
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=Rakibul-Rifat&layout=compact&theme=radical"
            alt="Top Languages"
            className="w-full max-w-xs rounded-xl"
           
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
      </div>
    </motion.div>
  );
}; 

export default Portfolio;