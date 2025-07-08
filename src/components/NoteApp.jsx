import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from '../components/firebase';

export default function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");

  // Listen to notes collection realtime updates
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notes"), (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, []);

  // Add a new note
  const addNote = async () => {
    if (!noteText.trim()) return;

    try {
      await addDoc(collection(db, "notes"), {
        text: noteText.trim(),
        createdAt: Date.now(),
      });
      setNoteText("");
    } catch (error) {
      console.error("Error adding note: ", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h2 className="text-white">Simple Note App</h2>

      <textarea
        rows={4}
        placeholder="Write your note here..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <button className="text-white" onClick={addNote} style={{ padding: "8px 16px" }}>
        Add Note
      </button>

      <ul style={{ marginTop: 20, paddingLeft: 0, listStyle: "none" }}>
        {notes.length === 0 && <li>No notes yet.</li>}
        {notes.map(({ id, text }) => (
          <li key={id} style={{ marginBottom: 10, background: "#f4f4f4", padding: 10, borderRadius: 4 }}>
            <div>{text}</div>
            <button className="text-white" onClick={() => deleteNote(id)} style={{ marginTop: 5, color: "red", cursor: "pointer" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
