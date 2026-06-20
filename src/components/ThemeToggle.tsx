import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (stored === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else if (typeof window !== "undefined") {
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefers);
      if (prefers) document.documentElement.classList.add("dark");
    }

    const mq = typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme") !== null) return;
      setIsDark(e.matches);
      document.documentElement.classList.toggle("dark", e.matches);
    };
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Переключить тему"
      title="Переключить тему"
      style={{
        width: 40,
        height: 40,
        borderRadius: "var(--r-pill)",
        background: "var(--background-surface)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 200ms var(--ease-out-expo)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--background-surface-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--background-surface)")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 180 }}
          transition={{ duration: 0.2 }}
          style={{ display: "inline-flex" }}
        >
          {isDark ? (
            <Sun size={20} color="var(--foreground-70)" />
          ) : (
            <Moon size={20} color="var(--foreground-70)" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
