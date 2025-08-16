import React, { useState } from "react";
import axios from "axios";

const accessKey = "YOUR_UNSPLASH_ACCESS_KEY"; // Replace with your key

export default function ImageSearch() {
  const [inputData, setInputData] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    if (!inputData) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=${inputData}&client_id=${accessKey}&per_page=6`
      );
      setImages(res.data.results);
    } catch (error) {
      console.error("Failed to fetch images", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🔍 Image Search</h1>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-8">
        <input
          type="text"
          placeholder="Search images..."
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <div key={img.id} className="relative group">
              <img
                src={img.urls.small}
                alt={img.alt_description}
                className="w-full h-64 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform"
              />
              <a
                href={img.links.download}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
