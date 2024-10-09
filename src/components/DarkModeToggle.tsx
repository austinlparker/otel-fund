"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", (!darkMode).toString());
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="relative w-14 h-7 rounded-full bg-slate/20 dark:bg-fog/20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pacific focus:ring-opacity-50"
      aria-label="Toggle dark mode"
    >
      <div
        className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          darkMode ? "translate-x-7 bg-slate" : "translate-x-0"
        }`}
      />
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <FontAwesomeIcon
          icon={faSun}
          className={`w-3 h-3 text-honey ${darkMode ? "opacity-50" : "opacity-100"}`}
        />
        <FontAwesomeIcon
          icon={faMoon}
          className={`w-3 h-3 text-indigo ${darkMode ? "opacity-100" : "opacity-50"}`}
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;
