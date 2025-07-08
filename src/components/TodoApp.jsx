import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  // Realtime listener
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const todoData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todoData);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (!todoText.trim()) return;

    try {
      await addDoc(collection(db, "todos"), {
        text: todoText.trim(),
        createdAt: Date.now(),
      });
      setTodoText("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
        Firebase Todo App 🚀
      </h2>
      <input
        type="text"
        placeholder="Write a todo..."
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:border-indigo-500"
      />
      <button
        onClick={addTodo}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Add Todo
      </button>

      <ul className="mt-6 space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded"
          >
            <span className="text-gray-800">{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
