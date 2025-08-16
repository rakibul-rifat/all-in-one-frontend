import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGjaoX4tcSqhdonBxUA0-h8dq-juHkFHI",
  authDomain: "allinone-8e15a.firebaseapp.com",
  projectId: "allinone-8e15a",
  storageBucket: "allinone-8e15a.appspot.com", // <-- FIXED HERE
  messagingSenderId: "1080686483928",
  appId: "1:1080686483928:web:27e5ad841b17a4eed6faad",
  measurementId: "G-JVX76WGF65"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); // <-- must use (app)
