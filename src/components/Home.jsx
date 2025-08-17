import React, { useEffect } from "react";
import gsap from "gsap";
import Portfolio from "./Portfolio";
import Project from "../pages/Project";
import Navbar from "./Navbar";
import WeatherWidget from "./WeatherWidget";

const Home = () => {
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

  return (
    <>
      {/* Loader */}
      <div
        id="loader-wrapper"
        className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      >
        <p className="text-cyan-400 mb-2">Loading</p>
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
      </div>
      {/* Hero Section */}

      <Navbar />
      <Portfolio />
      <Project/>
     <WeatherWidget />
    </>
  );
};

export default Home;
