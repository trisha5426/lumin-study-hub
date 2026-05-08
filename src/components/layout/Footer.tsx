import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, AtSign, Mail, GraduationCap, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const linkGroups = [
  {
    title: "Platform",
    links: [
      { to: "/courses", label: "Courses" },
      { to: "/notes", label: "Notes" },
      { to: "/pyqs", label: "PYQs" },
      { to: "/dashboard", label: "Dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/careers", label: "Careers" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/terms", label: "Terms of Service" },
      { to: "/privacy", label: "Privacy Policy" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="container mx-auto px-4 md:px-8 pb-10">
        <div className="glass rounded-3xl p-8 md:p-12 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <Link to="/" className="flex items-center gap-2">
                <span className="grid place-items-center size-9 rounded-xl bg-gradient-brand text-primary-foreground">
                  <GraduationCap className="size-5" />
                </span>
                <span className="font-display font-semibold text-xl">Lumin</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
                Smarter exam preparation, crafted for Delhi University LL.B students.
              </p>
              <a
                href="mailto:lumin9279@gmail.com"
                className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                <Mail className="size-4" /> lumin9279@gmail.com
              </a>
              <div className="mt-5 flex gap-2">
                {[
                  { Icon: Instagram, href: "#", label: "Instagram" },
                  { Icon: AtSign, href: "#", label: "Threads" },
                  { Icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="size-10 grid place-items-center rounded-xl border border-border bg-card/60 hover:bg-gradient-brand hover:text-primary-foreground transition-smooth hover:-translate-y-1"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            {linkGroups.map((g) => (
              <div key={g.title} className="md:col-span-2">
                <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-foreground/80 mb-4">
                  {g.title}
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {g.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-muted-foreground hover:text-foreground transition-smooth">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="md:col-span-4">
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-foreground/80 mb-4">
                Stay in the loop
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get new lecture drops, PYQ packs, and exam tips — straight to your inbox.
              </p>
              <form
                className="flex gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input type="email" placeholder="you@du.ac.in" className="bg-background/60" />
                <Button type="submit" className="bg-gradient-brand text-primary-foreground">
                  <Send className="size-4" />
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© 2026 Lumin. All rights reserved.</p>
            <p className="tracking-wide">Built for the next generation of advocates.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
