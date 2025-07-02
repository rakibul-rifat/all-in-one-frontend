import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "/Projects" },
    { name: "Contact", href: "#contact" },
    { name: "Blog", href: "#blog" },
  ];

  return (
    <nav className="bg-black shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl left-0 font-bold text-cyan-600">ONE LAST TRY</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-cyan-600 transition font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-900 rounded-xl text-center shadow">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-gray-700 hover:text-cyan-600 transition font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
