import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative inline-flex size-9 items-center justify-center rounded-full border border-border bg-card/60 text-foreground/80 backdrop-blur transition-smooth hover:text-foreground hover:bg-card hover:shadow-soft"
    >
      <Sun className={`size-4 transition-all ${isDark ? "scale-0 -rotate-90" : "scale-100 rotate-0"}`} />
      <Moon className={`absolute size-4 transition-all ${isDark ? "scale-100 rotate-0" : "scale-0 rotate-90"}`} />
    </button>
  );
}
