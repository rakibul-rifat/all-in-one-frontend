// App.jsx or App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Todo from './components/Todo';
import Home from './pages/Home.jsx';
import BanglaTypingPractice from "./components/BanglaTypingPractice.jsx"
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Project from './pages/Project.jsx';
import Blog from './pages/Blog.jsx';
import BlogPage from './components/BlogPage.jsx';
import Calculator from './components/Calculator.jsx';
import HomeBtn from './components/HomeBtn.jsx';
import WeatherWidget from './components/WeatherWidget.jsx';
import BottomNav from './components/BottomNav.jsx';
// import ImageSearch from './components/ImageSearch.jsx';

function App() {
  return (
    <Router>

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
          <Route path="/" element={<WeatherWidget />} />
          <Route path="/" element={<BottomNav />} />
         
        </Routes>
      
    </Router>
  );
}

export default App;
