import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeProvider"; // ✅ theme import

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const { theme } = useTheme(); // ✅ get theme

  // Example images (replace with your own)
  const images = [
    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/423290498/original/c0adb1bb0627e70d238c18cca5230bbb5ec9c0c7/design-website-for-restaurant-coffee-shop-food-shop-medical-logistic-trucking.jpg",
    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/423290498/original/ba5ef1c295aa0f16ee7a68f03d74c9a72b1cb569/design-website-for-restaurant-coffee-shop-food-shop-medical-logistic-trucking.jpg",
    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/420112544/original/fc3bd43a035bf8a5a309c939eda2e65b3dd26701/be-your-frontend-web-developer-using-tailwind-css-and-react.jpg",
  ];

  const interval = 4000; // autoplay speed (ms)

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) return null;

  // ✅ Theme-based styles
  const sectionBg = theme === "dark" ? "bg-black" : "bg-gray-100";
  const indicatorActive = theme === "dark" ? "bg-white" : "bg-black";
  const indicatorInactive =
    theme === "dark" ? "bg-gray-500" : "bg-gray-300 border border-gray-500";
  const shadow = theme === "dark" ? "shadow-md" : "shadow-lg";

  return (
    <div className={`${sectionBg} p-1  lg:hidden`}>
      <div className="relative w-full h-56 overflow-hidden">
        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className={`absolute w-full h-full object-cover rounded-lg ${shadow}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === current ? indicatorActive : indicatorInactive
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
