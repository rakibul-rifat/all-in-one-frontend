import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // adjust path if needed
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  Timestamp,
  orderBy,
  query,
} from 'firebase/firestore';
import { motion } from 'framer-motion';
import BottomNav from './BottomNav';
import { useTheme } from "../context/ThemeProvider"; // Import the theme context

// 👇 Reusable collection reference
const TODOS_REF = collection(db, "todos");

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [color, setColor] = useState('#36454F');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme(); // Get current theme

  // Theme-based styles
  const containerBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const todoBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const titleColor = theme === "dark" ? "text-gray-300" : "text-gray-800";
  const inputBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const inputBorder = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const inputText = theme === "dark" ? "text-gray-200" : "text-gray-900";
  const buttonPrimary = theme === "dark" ? "bg-blue-600" : "bg-blue-500";
  const buttonEdit = theme === "dark" ? "bg-yellow-500" : "bg-yellow-400";
  const buttonDelete = theme === "dark" ? "bg-red-600" : "bg-red-500";
  const shadow = theme === "dark" ? "shadow" : "shadow-md";
  const loadingBg = theme === "dark" ? "bg-gray-800" : "bg-gray-200";

  useEffect(() => {
    const q = query(TODOS_REF, orderBy("created", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      let list = [];
      snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      setTodos(list);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    if (editId) {
      await updateDoc(doc(db, "todos", editId), { text, color });
      setTodos(todos.map(todo => todo.id === editId ? { ...todo, text, color } : todo));
      resetForm();
    } else {
      await addDoc(TODOS_REF, {
        text,
        color,
        created: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      resetForm();
    }
  };

  const deleteTodo = async id => {
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = todo => {
    setText(todo.text);
    setColor(todo.color || '#36454F');
    setEditId(todo.id);
  };

  const resetForm = () => {
    setText('');
    setColor('#36454F');
    setEditId(null);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${loadingBg}`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="w-16 h-16 bg-blue-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${containerBg} pt-5 pb-5`}>
      <div className={`max-w-xl mx-auto p-2 ${todoBg} rounded-xl ${shadow} ${textColor}`}>
        <h1 className={`text-2xl font-bold mb-4 text-center ${titleColor}`}>Todo App</h1>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            className={`flex-1 px-4 py-2 border ${inputBorder} rounded w-full ${inputBg} ${inputText}`}
            placeholder="Enter todo..."
          />
          <div className="flex gap-2">
            <input
              type="color"
              value={color}
              onChange={e => setColor(e.target.value)}
              className="w-12 h-10 p-0 border rounded"
              title="Choose color"
            />
            <button 
              onClick={addTodo} 
              className={`${buttonPrimary} text-white px-4 py-2 rounded whitespace-nowrap`}
            >
              {editId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>

        <ul>
          {todos.map(todo => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row justify-between text-left py-2 px-3 w-full mb-2 rounded shadow break-words"
              style={{ backgroundColor: todo.color || '#36454F' }}
            >
              <div className="flex-1 overflow-wrap break-words">
                <p className="font-medium break-words text-white">
                  {todo.text}
                </p>
                <p className="text-xs text-gray-200 mt-1">
                  Last updated: {todo.updatedAt ? new Date(todo.updatedAt.seconds * 1000).toLocaleString() : ""}
                </p>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-2">
                <button
                  onClick={() => editTodo(todo)}
                  className={`text-sm ${buttonEdit} text-white px-2 py-1 rounded`}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={`text-sm ${buttonDelete} text-white px-2 py-1 rounded`}
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-4">
          <p className="text-center text-xs text-gray-500">
            Firebase Firestore + React + Tailwind CSS
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default App;