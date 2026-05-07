import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Lumin" },
      { name: "description", content: "Get in touch with the Lumin team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent", { description: "We'll get back to you within 24 hours." });
    }, 800);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Contact</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Let's talk.</h1>
        <p className="mt-4 text-muted-foreground">Questions, feedback or partnership ideas — we read every message.</p>
      </div>

      <div className="mt-14 grid lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          {[
            { Icon: Mail, title: "Email", body: "lumin9279@gmail.com", href: "mailto:lumin9279@gmail.com" },
            { Icon: MessageCircle, title: "Support hours", body: "Mon–Sat · 10am to 8pm IST" },
            { Icon: MapPin, title: "Based in", body: "New Delhi, India" },
          ].map(({ Icon, title, body, href }) => (
            <a
              key={title}
              href={href}
              className="block glass rounded-2xl p-5 transition-smooth hover:-translate-y-1 hover:shadow-glow"
            >
              <Icon className="size-5 text-primary" />
              <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
              <div className="mt-1 font-display text-lg">{body}</div>
            </a>
          ))}
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-2 glass rounded-2xl p-8 space-y-5 shadow-elegant">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" required className="mt-1.5 h-11 bg-background/40" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required className="mt-1.5 h-11 bg-background/40" />
            </div>
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" required className="mt-1.5 h-11 bg-background/40" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" required rows={6} className="mt-1.5 bg-background/40" />
          </div>
          <Button disabled={sending} className="bg-[var(--gradient-gold)] text-gold-foreground hover:opacity-90 shadow-glow">
            {sending ? "Sending..." : "Send message"}
          </Button>
        </form>
      </div>
    </div>
  );
}
