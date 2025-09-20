import React, { useEffect, useState } from "react";
import gsap from "gsap";
import Portfolio from "../components/Portfolio";
import Project from "./Project";
import BottomNav from "../components/BottomNav";
import GetInTouch from "../components/GetInTouch";
import ImageSlider from "../components/ImageSlider";

const Home = () => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const hasLoaded = localStorage.getItem("hasLoaded");

    if (!hasLoaded) {
      setShowLoader(true); // show loader first time
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
            duration: 2,
            onComplete: () => {
              setShowLoader(false);
              localStorage.setItem("hasLoaded", "true"); // mark as loaded
            },
          });
        },
      });
    }
  }, []);

  return (
    <>
      {showLoader && (
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
          <p id="loader-percentage" className="text-cyan-400 mt-2">0%</p>
        </div>
      )}

      {/* Main Content */}
    <div className=" pb-10">
      <Portfolio />
      {/* <ImageSlider /> */}
      <Project />
      <GetInTouch />
      <BottomNav />
    </div>
    </>
  );
};

export default Home;
