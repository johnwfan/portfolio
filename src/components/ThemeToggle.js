"use client";

import { getTheme, setTheme, useTheme } from "@/lib/prefs";

// The label is the theme you'd switch *to*.
export default function ThemeToggle({ className = "" }) {
  const theme = useTheme();
  return (
    <button
      type="button"
      className={className}
      aria-label={theme === "dark" ? "switch to light theme" : "switch to dark theme"}
      onClick={() => setTheme(getTheme() === "dark" ? "light" : "dark")}
    >
      <span className="if-dark">light</span>
      <span className="if-light">dark</span>
    </button>
  );
}
