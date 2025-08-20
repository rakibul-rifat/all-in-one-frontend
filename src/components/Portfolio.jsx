import React, { useEffect } from "react";
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
import gsap from "gsap";
import WeatherWidget from "./WeatherWidget";



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
  { name: "Animate .css", icon: <SiCss3 className="text-indigo-500" /> },
  { name: "Netlify", icon: <SiNetlify className="text-green-400" /> },
  { name: "Vercel", icon: <SiVercel className="text-white" /> },
  { name: "Mongodb", icon: <SiMongodb className="text-green-400" /> },
  { name: "Firebase", icon: <SiFirebase className="text-orange-400" /> }, // ✅ Firebase Added
];


  const socials = [
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/Rakibul-Rifat" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com" },
    { name: "Facebook", icon: <FaFacebook />, url: "https://facebook.com" },
  ];

  return (
    <>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-1 shadow-xl rounded-xl mt-7 bg-black">
        
        {/* Profile Section */}
        <div className="flex items-center sm:bg-black bg-gray-900 p-4 rounded-lg space-x-6 mt-8">
          <img
            src="https://avatars.githubusercontent.com/u/192508513?v=4"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-500 "
          />
          <div>
            <h1 className="text-xl text-gray-500 font-bold">Rakibul Islam</h1>
            <p className="text-gray-600">Frontend Web Developer</p>
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

  <WeatherWidget />

        {/* Skills Section */}
        <div className="mt-5">
        <div className="flex flex-wrap gap-4  justify-center ">
  {skills.map((skill) => (
    <div
      key={skill.name}
      className="max-w-4xl mx-auto
        flex  flex-col items-center 
          p-4 py-5 rounded-lg 
        hover:shadow-lg transition
        basis-[calc((100%/3)-1rem)]  /* 3 items per row minus gap */
        sm:basis-[calc((100%/4)-1rem)] /* 4 items per row on sm */
        md:basis-[calc((100%/6)-1rem)] /* 6 items per row on md */
        max-w-[calc((100%/3)-1rem)]  /* restrict max width */
        sm:max-w-[calc((100%/4)-1rem)]
        md:max-w-[calc((100%/6)-1rem)]
      "
    >
      {skill.icon}
      <span className="mt-2 text-sm text-gray-500 text-center">{skill.name}</span>
    </div>
  ))}
</div>
        </div>
        <div className="flex mt-5 flex-col items-center justify-center gap-6 p-6 bg-gray-900 rounded-2xl shadow-lg">
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
    </div>
   
      </div>
    </>
  );
};

export default Portfolio;
