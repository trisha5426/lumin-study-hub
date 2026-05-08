import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, GraduationCap, Heart, Scale } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Lumin" },
      { name: "description", content: "Lumin is built by DU law graduates to help LL.B students master semester exams." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { Icon: Scale, title: "Rigour", desc: "Every lecture and note is reviewed by practising lawyers and DU faculty." },
  { Icon: Heart, title: "Empathy", desc: "We were LL.B students once. We build what we wish we had." },
  { Icon: GraduationCap, title: "Outcomes", desc: "Singularly focused on helping you score, not on filler content." },
  { Icon: BookOpen, title: "Craft", desc: "Cinematic production, premium typography, zero compromise." },
];

function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-20 md:py-28">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">About Lumin</p>
        <h1 className="mt-3 font-display text-5xl md:text-7xl leading-[1.05]">
          Light, brought to <span className="text-gradient-brand italic">the law.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Lumin is a learning studio for the next generation of Indian lawyers. We started in
          the corridors of the Faculty of Law, Delhi University, frustrated with scattered PDFs,
          unreadable PYQs and YouTube playlists that go nowhere. So we built the platform we
          wished existed — one that treats LL.B preparation with the seriousness, beauty and
          clarity it deserves.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-4 gap-5">
        {values.map(({ Icon, title, desc }) => (
          <div key={title} className="glass rounded-2xl p-6">
            <Icon className="size-6 text-primary" />
            <h3 className="mt-4 font-display text-xl">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 glass rounded-3xl p-10 md:p-16">
        <h2 className="font-display text-3xl md:text-4xl">Our promise</h2>
        <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
          Show up, watch the lectures, work through the PYQs — and walk into the exam hall
          knowing exactly what to write. That's the deal.
        </p>
      </div>
    </div>
  );
}
