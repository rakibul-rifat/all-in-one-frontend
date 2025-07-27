import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/About" },
    { name: "Projects", href: "/Projects" },
    { name: "Contact", href: "/Contact" },
    { name: "Blog", href: "/Blog" },
  ];

  return (
    <nav className="bg-black shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className=" left-0  text-gray-400">ONE LAST TRY</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-500 hover:text-cyan-600 transition font-medium"
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

    {/* Mobile Links with framer-motion animation */}
<AnimatePresence>
  {menuOpen && (
    <motion.div
      className="md:hidden pt-10 px-4 pb-10 space-y-2 bg-gray-900 rounded-xl text-center shadow"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
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
    </motion.div>
  )}
</AnimatePresence>

    </nav>
  );
};

export default Navbar;
