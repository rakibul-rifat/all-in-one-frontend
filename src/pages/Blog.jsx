import React from "react";
import Navbar from "../components/Navbar";

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    date: "July 1, 2025",
    summary:
      "Learn the basics of React including components, state, and props to build dynamic web apps.",
    url: "#",
  },
  {
    id: 2,
    title: "Why Tailwind CSS Rocks",
    date: "June 20, 2025",
    summary:
      "Explore the benefits of using Tailwind CSS for rapid and responsive UI development.",
    url: "#",
  },
  {
    id: 3,
    title: "JavaScript ES2025 Features",
    date: "May 15, 2025",
    summary:
      "An overview of the latest JavaScript features to make your code cleaner and more efficient.",
    url: "#",
  },
];

export default function Blog() {
  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-12">
      <Navbar />
      <h1 className="text-4xl font-bold mb-10 text-center">Blog</h1>

      <div className="space-y-10">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2 text-cyan-400">
              {post.title}
            </h2>
            <time
              dateTime={new Date(post.date).toISOString()}
              className="block mb-4 text-gray-400"
            >
              {post.date}
            </time>
            <p className="text-gray-300 mb-4">{post.summary}</p>
            <a
              href={post.url}
              className="inline-block text-cyan-600 hover:text-cyan-800 font-semibold transition"
            >
              Read More &rarr;
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
