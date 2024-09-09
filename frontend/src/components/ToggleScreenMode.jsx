import { useEffect, useState } from "react";

export const ToggleScreenMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleToggleMode = () => {
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <button
      className={`border py-2 px-5 rounded-md transition-all duration-300 ${isDarkMode ? "bg-white text-[#484848] hover:bg-[#484848] hover:text-white" : "bg-[#484848] text-white hover:bg-white hover:text-[#484848]"}`}
      onClick={handleToggleMode}
    >
      Change Mode to {isDarkMode ? "Light" : "Dark"}
    </button>
  );
};
