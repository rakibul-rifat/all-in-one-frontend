import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from 'react-router-dom';


export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [auth, setAuth] = useState({ email: "", password: "", token: "" });
  const [expanded, setExpanded] = useState({}); // Track expanded blogs
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Fetch blogs
  const fetchBlogs = async () => {
    const res = await axios.get("http://localhost:5000/api/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Login
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: auth.email,
        password: auth.password,
      });
      localStorage.setItem("token", res.data.token);
      setAuth({ ...auth, token: res.data.token });
      alert("✅ Logged in");
    } catch (err) {
      alert("❌ Login failed");
    }
  };

  // Create or update blog
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/blogs/${editingId}`,
          formData,
          config
        );
        alert("✏️ Blog updated");
      } else {
        await axios.post("http://localhost:5000/api/blogs", formData, config);
        alert("✅ Blog created");
      }

      setTitle("");
      setContent("");
      setImage(null);
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      alert("❌ Action failed");
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setEditingId(blog._id);
  };

  // Delete blog
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("🗑️ Blog deleted");
      fetchBlogs();
    } catch (err) {
      alert("❌ Delete failed");
    }
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogs.length / postsPerPage);

  // See more logic
  const getPreview = (html) => {
    // Remove HTML tags and limit to ~200 chars (about 3 lines)
    const text = html.replace(/<[^>]+>/g, "");
    return text.length > 200 ? text.slice(0, 200) + "..." : text;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl text-gray-500 font-bold">📝 Blog Manager</h1>

      {/* Login */}
      {!auth.token && (
        <div className="bg-gray-900 text-gray-400 p-4 rounded space-y-2">
          <h2 className="font-semibold text-lg">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="p-2 border w-full"
            onChange={(e) => setAuth({ ...auth, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border w-full"
            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
          />
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 mt-2"
          >
            Login
          </button>
        </div>
      )}

      {/* Blog Form */}
      {auth.token && (
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
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-2"
          />
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2"
          >
            {editingId ? "Update" : "Post"}
          </button>
        </div>
      )}

      {/* Blog List */}
      <div className="grid bg-gray-900  grid-cols-1 gap-6">
        {currentBlogs.map((blog) => (
          <div
            key={blog._id}
            className="border p-4 rounded shadow space-y-2 bg-gray-900"
          >
            <h3 className="text-xl text-gray-200 font-bold">{blog.title}</h3>
            <img
              src={blog.image ? `http://localhost:5000/uploads/${blog.image}` : ""}
              alt=""
              className="w-full aspect-video rounded"
            />
            <div className="text-gray-200">
              {expanded[blog._id] ? (
                <>
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                  <button
                    className="text-blue-600 underline mt-2"
                    onClick={() =>
                      setExpanded((prev) => ({ ...prev, [blog._id]: false }))
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
                        setExpanded((prev) => ({ ...prev, [blog._id]: true }))
                      }
                    >
                      See more
                    </button>
                  )}
                </>
              )}
            </div>

            {auth.token && (
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
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
