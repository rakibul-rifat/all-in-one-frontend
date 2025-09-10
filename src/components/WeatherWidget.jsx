import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeProvider"; // Import the theme context

export default function WeatherWidget() {
  const [weather, setWeather] = useState({ temp: null, condition: "" });
  const [clock, setClock] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme(); // Get current theme

  // Fetch weather for Chattogram
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

  // Fetch inspirational quotes
  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        // Select 5 random quotes
        const randomQuotes = [];
        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * data.length);
          randomQuotes.push(data[randomIndex]);
        }
        setQuotes(randomQuotes);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch quotes, using fallback", err);
        // Fallback quotes in case API fails
        setQuotes([
          { text: "The best way to predict the future is to create it.", author: "Abraham Lincoln" },
          { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
          { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        ]);
        setLoading(false);
      });
  }, []);

  // 12-hour format clock with AM/PM
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

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3); // 3 slides: time, weather, quote
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Theme-based styles
  const widgetBg = theme === "dark" 
    ? "sm:bg-black bg-gray-900" 
    : "bg-white drop-shadow-lg border-2 border-gray-200 sm:drop-shadow-none sm:border-none";
    
  const textColor = theme === "dark" 
    ? "text-gray-200" 
    : "text-gray-800";
    
  const secondaryTextColor = theme === "dark" 
    ? "text-gray-400" 
    : "text-gray-600";
    
  const indicatorActive = theme === "dark" 
    ? "bg-purple-500" 
    : "bg-purple-600";
    
  const indicatorInactive = theme === "dark" 
    ? "bg-gray-700" 
    : "bg-gray-300";

  // Slider content
  const slides = [
    {
      content: (
        <div className="text-center">
          <div className={`text-2xl font-mono mb-2 tracking-widest ${textColor}`}>
            {clock}
          </div>
          <div className={`text-sm ${secondaryTextColor}`}>Current Time</div>
        </div>
      )
    },
    {
      content: (
        <div className="text-center">
          <div className={`text-sm mb-2 ${secondaryTextColor}`}>Location: Chattogram</div>
          <div className={`text-xl font-bold mb-1 ${textColor}`}>
            {weather.temp !== null ? `${weather.temp}°C` : "Loading..."}
          </div>
          <div className={`text-sm ${secondaryTextColor}`}>{weather.condition || ""}</div>
        </div>
      )
    },
    {
      content: !loading ? (
        <div className="text-center px-4">
          <div className={`text-sm italic mb-1 ${textColor}`}>
            "{quotes[currentSlide % quotes.length]?.text}"
          </div>
          <div className={`text-xs ${secondaryTextColor}`}>
            - {quotes[currentSlide % quotes.length]?.author || "Unknown"}
          </div>
        </div>
      ) : (
        <div className={`text-center ${textColor}`}>Loading quote...</div>
      )
    }
  ];

  return (
    <motion.div
      className={`${widgetBg} rounded-b-lg  mt-2 rounded-xl p-4 max-w-4xl mx-auto text-center overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Slide indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentSlide === index ? indicatorActive : indicatorInactive
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}