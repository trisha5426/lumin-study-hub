import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, AtSign, Mail, Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="container mx-auto px-4 md:px-8 pb-10">
        <div className="glass rounded-3xl p-8 md:p-12 shadow-elegant">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2">
                <span className="grid place-items-center size-9 rounded-lg bg-[var(--gradient-gold)] text-gold-foreground">
                  <Scale className="size-4" />
                </span>
                <span className="font-display text-2xl">Lumin</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Premium exam prep crafted for LL.B students of Delhi University.
              </p>
            </div>

            <div>
              <h4 className="font-display text-lg mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { Icon: Instagram, href: "#", label: "Instagram" },
                  { Icon: AtSign, href: "#", label: "Threads" },
                  { Icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="size-10 grid place-items-center rounded-xl glass hover:bg-[var(--gradient-gold)] hover:text-gold-foreground transition-smooth hover:-translate-y-1"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display text-lg mb-4">Contact</h4>
              <a
                href="mailto:lumin9279@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
              >
                <Mail className="size-4" />
                lumin9279@gmail.com
              </a>
            </div>

            <div>
              <h4 className="font-display text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { to: "/careers", label: "Careers" },
                  { to: "/terms", label: "Terms of Service" },
                  { to: "/privacy", label: "Privacy Policy" },
                ].map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© 2026 Lumin. All rights reserved.</p>
            <p className="font-display tracking-wide">Veritas · Lex · Lumen</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
