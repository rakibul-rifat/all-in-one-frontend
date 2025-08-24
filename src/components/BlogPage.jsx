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
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence

const BLOGS_REF = collection(db, "blogs");
const ADMIN_EMAIL = "abc@gmail.com";
const ADMIN_PASS = "123";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.4,
    },
  },
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState("");
  const [expanded, setExpanded] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [admin, setAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const postsPerPage = 5;

  // Fetch blogs in real-time
  useEffect(() => {
    setLoading(true);
    const q = query(BLOGS_REF, orderBy("created", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      let list = [];
      snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setBlogs(list);
      setLoading(false);
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
    <motion.div 
      className="max-w-4xl mx-auto p-1 mt-9 space-y-6 mb-10 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Admin Login */}
      {!admin && (
        <motion.div 
          className=" text-gray-400 p-1 rounded space-y-2 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-semibold text-lg mt-5">Admin Login</h2>
          <motion.input
            type="email"
            placeholder="Enter admin email"
            className="p-2 border w-full"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.input
            type="password"
            placeholder="Enter admin password"
            className="p-2 border w-full mt-2"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.button
            onClick={handleAdminLogin}
            className="bg-blue-600 text-white px-4 py-2 mt-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </motion.div>
      )}

      {/* Blog Form */}
      {admin && (
        <motion.div 
          className="bg-gray-200 shadow p-2 rounded space-y-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-semibold text-lg">
            {editingId ? "✏️ Edit Blog" : "➕ Create New Blog"}
          </h2>
          <motion.input
            type="text"
            placeholder="Title"
            value={title}
            className="p-2 border w-full"
            onChange={(e) => setTitle(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <ReactQuill value={content} onChange={setContent} className="mb-2" />
          <motion.input
            type="text"
            placeholder="Paste image link here (https://...)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="p-2 border w-full mb-2"
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          {imageUrl && (
            <motion.img
              src={imageUrl}
              alt="Blog"
              className="w-full aspect-video rounded mb-2"
              onError={(e) => { e.target.style.display = 'none'; }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
          <motion.button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {editingId ? "Update" : "Post"}
          </motion.button>
        </motion.div>
      )}

      {/* Blog List */}
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <motion.div 
            className="flex justify-center items-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.svg 
              className="animate-spin h-8 w-8 text-blue-400 mr-2" 
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </motion.svg>
            <span className="text-blue-400 text-lg">Loading blog posts...</span>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {currentBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  className="border-2 border-gray-800 p-2 rounded shadow space-y-2 bg-gray-900"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  custom={index}
                >
                  <motion.h3 
                    className="text-xl text-gray-200 font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {blog.title}
                  </motion.h3>
                  {blog.image && (
                    <motion.img
                      src={blog.image}
                      alt=""
                      className="w-full aspect-video rounded"
                      onError={(e) => { e.target.style.display = 'none'; }}
                      variants={imageVariants}
                    />
                  )}
                  <motion.div 
                    className="text-gray-200"
                    variants={contentVariants}
                  >
                    {expanded[blog.id] ? (
                      <>
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        <motion.button
                          className="text-blue-600 underline mt-2"
                          onClick={() =>
                            setExpanded((prev) => ({ ...prev, [blog.id]: false }))
                          }
                          whileHover={{ scale: 1.05 }}
                        >
                          See less
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <div>{getPreview(blog.content)}</div>
                        {blog.content.replace(/<[^>]+>/g, "").length > 200 && (
                          <motion.button
                            className="text-blue-600 underline mt-2"
                            onClick={() =>
                              setExpanded((prev) => ({ ...prev, [blog.id]: true }))
                            }
                            whileHover={{ scale: 1.05 }}
                          >
                            See more
                          </motion.button>
                        )}
                      </>
                    )}
                  </motion.div>
                  {admin && (
                    <motion.div 
                      className="flex space-x-4 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.button
                        onClick={() => handleEdit(blog)}
                        className="text-blue-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Delete
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Pagination */}
      <motion.div 
        className="flex justify-center mt-4 space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {i + 1}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}