import React, { useState, useEffect } from "react";
import { db } from "../firebase";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import HomeBtn from "./HomeBtn";

const BLOGS_REF = collection(db, "blogs");
const ADMIN_EMAIL = "abc@gmail.com";
const ADMIN_PASS = "123";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // now only for pasted link
  const [editingId, setEditingId] = useState("");
  const [expanded, setExpanded] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [admin, setAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const postsPerPage = 5;

  // Fetch blogs in real-time
  useEffect(() => {
    const q = query(BLOGS_REF, orderBy("created", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      let list = [];
      snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setBlogs(list);
    });
    return () => unsub();
  }, []);

  // Admin login (email & password check)
  const handleAdminLogin = () => {
    if (adminEmail === ADMIN_EMAIL && adminPass === ADMIN_PASS) {
      setAdmin(true);
      setAdminEmail("");
      setAdminPass("");
    } else {
      alert("Wrong email or password!");
    }
  };

  // Add or update blog
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    let uploadedImageUrl = imageUrl;
    if (editingId) {
      await updateDoc(doc(db, "blogs", editingId), {
        title,
        content,
        image: uploadedImageUrl || "",
      });
      setEditingId(null);
    } else {
      await addDoc(BLOGS_REF, {
        title,
        content,
        image: uploadedImageUrl || "",
        created: Timestamp.now(),
      });
    }
    setTitle("");
    setContent("");
    setImageUrl("");
  };

  // Edit blog
  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setImageUrl(blog.image || "");
    setEditingId(blog.id);
  };

  // Delete blog
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "blogs", id));
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogs.length / postsPerPage);

  // See more logic
  const getPreview = (html) => {
    const text = html.replace(/<[^>]+>/g, "");
    return text.length > 200 ? text.slice(0, 200) + "..." : text;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Admin Login */}
      {!admin && (
        <div className="bg-gray-900 text-gray-400 p-4 rounded space-y-2 mb-4">
          <h2 className="font-semibold text-lg">Admin Login</h2>
          <input
            type="email"
            placeholder="Enter admin email"
            className="p-2 border w-full"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter admin password"
            className="p-2 border w-full mt-2"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
          />
          <button
            onClick={handleAdminLogin}
            className="bg-blue-600 text-white px-4 py-2 mt-2"
          >
            Login
          </button>
        </div>
      )}

      {/* Blog Form */}
      {admin && (
        <div className="bg-gray-200 shadow p-2 rounded space-y-2">
          <h2 className="font-semibold text-lg">
            {editingId ? "✏️ Edit Blog" : "➕ Create New Blog"}
          </h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            className="p-2 border w-full"
            onChange={(e) => setTitle(e.target.value)}
          />
          <ReactQuill value={content} onChange={setContent} className="mb-2" />
          <input
            type="text"
            placeholder="Paste image link here (https://...)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="p-2 border w-full mb-2"
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Blog"
              className="w-full aspect-video rounded mb-2"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2"
          >
            {editingId ? "Update" : "Post"}
          </button>
        </div>
      )}

      {/* Blog List */}
      <div className="grid bg-gray-900 grid-cols-1 gap-6">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="border p-4 rounded shadow space-y-2 bg-gray-900"
          >
            <h3 className="text-xl text-gray-200 font-bold">{blog.title}</h3>
            {blog.image && (
              <img
                src={blog.image}
                alt=""
                className="w-full aspect-video rounded"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
            <div className="text-gray-200">
              {expanded[blog.id] ? (
                <>
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                  <button
                    className="text-blue-600 underline mt-2"
                    onClick={() =>
                      setExpanded((prev) => ({ ...prev, [blog.id]: false }))
                    }
                  >
                    See less
                  </button>
                </>
              ) : (
                <>
                  <div>{getPreview(blog.content)}</div>
                  {blog.content.replace(/<[^>]+>/g, "").length > 200 && (
                    <button
                      className="text-blue-600 underline mt-2"
                      onClick={() =>
                        setExpanded((prev) => ({ ...prev, [blog.id]: true }))
                      }
                    >
                      See more
                    </button>
                  )}
                </>
              )}
            </div>
            {admin && (
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <HomeBtn />
    </div>
  );
}
