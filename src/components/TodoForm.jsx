import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function TodoForm() {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      // Add new document with an auto-generated ID
      await addDoc(collection(db, "todos"), {
        text: task,
        done: false,
        created: Timestamp.now(),
        uid: auth.currentUser.uid
      });

      setTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="border p-2 flex-1 rounded"
        type="text"
        placeholder="Add new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}
