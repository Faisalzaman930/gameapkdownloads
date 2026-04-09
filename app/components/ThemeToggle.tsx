"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      document.documentElement.classList.add("light");
      setLight(true);
    }
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    if (next) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="relative w-12 h-6 rounded-full border border-gray-700 bg-gray-800 transition-colors hover:border-violet-500/50 flex items-center px-1"
    >
      <span
        className={`w-4 h-4 rounded-full transition-all duration-200 flex items-center justify-center text-[10px] ${
          light
            ? "translate-x-6 bg-violet-500 shadow shadow-violet-500/40"
            : "translate-x-0 bg-gray-500"
        }`}
      >
        {light ? "☀" : "🌙"}
      </span>
    </button>
  );
}
