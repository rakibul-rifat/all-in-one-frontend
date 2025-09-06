import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeProvider"; 
import { useEffect } from "react";
import { Helmet } from "react-helmet";

import Todo from "./components/Todo";
import Home from "./pages/Home.jsx";
import BanglaTypingPractice from "./components/BanglaTypingPractice.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Project from "./pages/Project.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPage from "./components/BlogPage.jsx";
import Calculator from "./components/Calculator.jsx";
import HomeBtn from "./components/HomeBtn.jsx";
import WeatherWidget from "./components/WeatherWidget.jsx";
import BottomNav from "./components/BottomNav.jsx";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  const { theme } = useTheme();

  // Meta theme-color (status bar)
  const themeColor = theme === "dark" ? "#111827" : "#ffffff"; // green for dark, red for light

  // Page background (body / html)
  const pageBg = theme === "dark" ? "#000000" : "#ffffff";

  useEffect(() => {
    // Update <meta name="theme-color">
    const meta = document.querySelector("meta[name=theme-color]");
    if (meta) {
      meta.setAttribute("content", themeColor);
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "theme-color";
      newMeta.content = themeColor;
      document.head.appendChild(newMeta);
    }

    // Update Tailwind dark/light classes
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    // Update body/html backgrounds
    document.documentElement.style.backgroundColor = pageBg;
    document.body.style.backgroundColor = pageBg;
  }, [theme, themeColor, pageBg]);

  return (
    <Router>
      <Helmet>
        {/* meta theme-color (status bar / browser UI) */}
        <meta name="theme-color" content={themeColor} />
      </Helmet>

      <ScrollToTop />
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Todo" element={<Todo />} />
        <Route path="/BanglaTypingPractice" element={<BanglaTypingPractice />} />
        <Route path="/Projects" element={<Project />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/BlogPage" element={<BlogPage />} />
        <Route path="/Calculator" element={<Calculator />} />
        <Route path="/HomeBtn" element={<HomeBtn />} />
        <Route path="/Weather" element={<WeatherWidget />} />
        <Route path="/BottomNav" element={<BottomNav />} />
      </Routes>
    </Router>
  );
}

export default App;