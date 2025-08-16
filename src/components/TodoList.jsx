import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "todos"),
      where("uid", "==", auth.currentUser.uid),
      orderBy("created", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let list = [];
      snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setTodos(list);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
