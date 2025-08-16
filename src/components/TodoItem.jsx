import React from "react";
import { db } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function TodoItem({ todo }) {
  const toggleDone = async () => {
    await updateDoc(doc(db, "todos", todo.id), { done: !todo.done });
  };

  const deleteTask = async () => {
    await deleteDoc(doc(db, "todos", todo.id));
  };

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow mb-2">
      <div
        onClick={toggleDone}
        className={`cursor-pointer ${todo.done ? "line-through text-gray-400" : ""}`}
      >
        {todo.text}
      </div>
      <button onClick={deleteTask} className="text-red-500">Delete</button>
    </div>
  );
}
