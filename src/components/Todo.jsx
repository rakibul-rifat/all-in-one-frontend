import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [color, setColor] = useState('#36454F');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://all-in-one-backend-flame.vercel.app/api/todos')
      .then(res => setTodos(res.data))
      .finally(() => setLoading(false));
  }, []);

  const addTodo = () => {
    if (!text.trim()) return;
    const payload = { text, color };

    if (editId) {
      axios.put(`https://all-in-one-backend-flame.vercel.app/api/todos/${editId}`, payload).then(res => {
        setTodos(todos.map(todo => todo._id === editId ? res.data : todo));
        resetForm();
      });
    } else {
      axios.post('https://all-in-one-backend-flame.vercel.app/api/todos', payload).then(res => {
        setTodos([res.data, ...todos]);
        resetForm();
      });
    }
  };

  const deleteTodo = id => {
    axios.delete(`https://all-in-one-backend-flame.vercel.app/api/todos/${id}`).then(() => {
      setTodos(todos.filter(todo => todo._id !== id));
    });
  };

  const editTodo = todo => {
    setText(todo.text);
    setColor(todo.color || '#36454F');
    setEditId(todo._id);
  };

  const resetForm = () => {
    setText('');
    setColor('#36454F');
    setEditId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
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
    <div className="min-h-screen bg-gray-900 pt-5 pb-5">
      <div className="max-w-xl mx-auto bg-gray-900 rounded-xl shadow p- text-gray-400">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
        
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            className="flex-1 px-4 py-2 border rounded w-full"
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
            <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap">
              {editId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>

        <ul>
          {todos.map(todo => (
            <motion.li
              key={todo._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row justify-between text-left py-2 px-3 w-full mb-2 rounded shadow break-words"
              style={{ backgroundColor: todo.color || '#36454F' }}
            >
              <div className="flex-1 overflow-wrap break-words">
                <p className="font-medium break-words">{todo.text}</p>
                <p className="text-xs text-gray-300 mt-1">
                  Last updated: {new Date(todo.updatedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-2">
                <button
                  onClick={() => editTodo(todo)}
                  className="text-sm bg-yellow-400 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-sm bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Floating Go to Home button */}
      <Link
  to="/"
  className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
>
  Home
</Link>

    </div>
  );
}

export default App;
