// src/components/ThemeToggle.jsx
import { useTheme } from "../context/ThemeProvider";
import { Sun, Moon } from "lucide-react"; // optional, you can use icons

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md transition"
    >
      {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}
