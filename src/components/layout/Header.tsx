import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/notes", label: "Notes" },
  { to: "/pyqs", label: "PYQs" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center size-9 rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
            <GraduationCap className="size-5" />
          </span>
          <span className="font-display font-semibold text-xl tracking-tight">Lumin</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 rounded-full text-sm text-foreground/70 hover:text-foreground hover:bg-accent/60 transition-smooth"
              activeProps={{ className: "text-foreground bg-accent/60" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-brand text-primary-foreground hover:opacity-95 shadow-glow">
            <Link to="/signup">
              Start Learning <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 rounded-lg border border-border bg-card/60"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass-strong border-t border-border animate-fade-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-3 rounded-lg hover:bg-accent text-foreground/90"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Button asChild variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="flex-1 bg-gradient-brand text-primary-foreground" onClick={() => setOpen(false)}>
                <Link to="/signup">Start Learning</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
