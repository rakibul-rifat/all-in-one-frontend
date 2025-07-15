import React, { useState, useEffect } from "react";
import axios from "axios";

const categories = ["Nature", "Technology", "Animals", "Food", "Travel"];

const ImageSearch = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);

  const fetchImages = async (searchQuery) => {
    try {
      const res = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: searchQuery,
          per_page: 20,
        },
        headers: {
          Authorization: "Client-ID YOUR_UNSPLASH_ACCESS_KEY",
        },
      });
      setImages(res.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchImages(selectedCategory);
    }
  }, [selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages(query);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Image Search</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search images..."
          className="flex-1 p-2 border rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="flex text-gray-400 flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded border ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group overflow-hidden rounded shadow">
            <img
              src={img.urls.small}
              alt={img.alt_description}
              className="w-full h-48 object-cover"
            />
            <a
              href={img.links.download}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <span className="text-white font-semibold">Download</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
