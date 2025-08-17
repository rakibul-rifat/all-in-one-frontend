import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function WeatherWidget() {
  const [weather, setWeather] = useState({ temp: null, condition: "" });

  // Fetch weather for Chattogram (as example)
  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Chattogram&units=metric&appid=YOUR_API_KEY"
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          temp: data.main.temp,
          condition: data.weather[0].main,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  // 12-hour format clock with AM/PM
  const [clock, setClock] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString("en-US", {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="border-2 border-purple-700 rounded-xl p-4 bg-black max-w-4xl mx-auto p-4 shadow-xl rounded-xl mb-10 text-gray-500 text-center shadow-2xl"
      style={{
        perspective: "800px",
      }}
      animate={{
        rotateY: [0, 20, -20, 0],
        boxShadow: [
          "0 8px 32px 0 rgba(128,0,128,0.3)",
          "0 16px 40px 0 rgba(0,0,255,0.2)",
          "0 8px 32px 0 rgba(255,0,128,0.3)",
          "0 8px 32px 0 rgba(128,0,128,0.3)",
        ],
        y: [0, -10, 10, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 4,
        ease: "linear",
      }}
    >
      <div className="text-2xl font-mono mb-2 tracking-widest">{clock}</div>
      <div className="text-sm mb-2">Location: Chattogram</div>
      <div className="text-sm">
        Temp: {weather.temp !== null ? `${weather.temp}°C` : "Loading..."}
      </div>
      <div className="text-sm">{weather.condition || ""}</div>
    </motion.div>
  );
}