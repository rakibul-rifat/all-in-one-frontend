// App.jsx or App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Todo from './components/Todo';
import Home from './components/Home';
import BanglaTypingPractice from "./components/BanglaTypingPractice.jsx"
import Projects from './components/Projects.jsx';


function App() {
  return (
    <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Todo" element={<Todo />} />
          <Route path="/BanglaTypingPractice" element={<BanglaTypingPractice />} />
          <Route path="/Projects" element={<Projects />} />
        </Routes>
      
    </Router>
  );
}

export default App;
