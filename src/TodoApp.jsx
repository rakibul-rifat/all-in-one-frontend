import React, { useState, useEffect } from "react";
import { db } from "./firebase";
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
} from "firebase/firestore";

export default function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch notes in real-time
  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("created", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      let list = [];
      snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setNotes(list);
    });
    return () => unsub();
  }, []);

  // Add or update note
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    if (editingId) {
      await updateDoc(doc(db, "notes", editingId), { title, content });
      setEditingId(null);
    } else {
      await addDoc(collection(db, "notes"), {
        title,
        content,
        created: Timestamp.now(),
      });
    }
    setTitle("");
    setContent("");
  };

  // Delete note
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  // Edit note
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-xl font-bold mb-4">My Notes</h1>
        <form onSubmit={handleSubmit} className="mb-4 space-y-2">
          <input
            className="w-full p-2 rounded text-black"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-2 rounded text-black"
            placeholder="Note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded w-full"
          >
            {editingId ? "Update Note" : "Add Note"}
          </button>
        </form>

        <div className="space-y-2">
          {notes.map((note) => (
            <div key={note.id} className="bg-gray-800 p-3 rounded shadow">
              <h2 className="font-bold">{note.title}</h2>
              <p>{note.content}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-yellow-500 px-2 py-1 rounded text-black"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="bg-red-500 px-2 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
