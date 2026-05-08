import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Search, Filter, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Notes & PDF Library — Lumin" },
      { name: "description", content: "Concise, exam-ready lecture notes and PDFs for every DU LL.B subject." },
    ],
  }),
  component: NotesPage,
});

const subjects = ["All", "Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"];

const notes = [
  { title: "Constitutional Law I — Article 14", subject: "Sem 2", pages: 28, size: "2.1 MB", color: "from-blue-500/30 to-indigo-500/30" },
  { title: "Law of Contracts — Consideration", subject: "Sem 1", pages: 18, size: "1.4 MB", color: "from-violet-500/30 to-fuchsia-500/30" },
  { title: "IPC — General Exceptions", subject: "Sem 1", pages: 32, size: "2.6 MB", color: "from-rose-500/30 to-pink-500/30" },
  { title: "Torts — Negligence Doctrine", subject: "Sem 1", pages: 22, size: "1.8 MB", color: "from-sky-500/30 to-cyan-500/30" },
  { title: "Family Law — Hindu Marriage Act", subject: "Sem 2", pages: 26, size: "2.0 MB", color: "from-purple-500/30 to-violet-500/30" },
  { title: "Jurisprudence — Schools of Thought", subject: "Sem 3", pages: 34, size: "2.8 MB", color: "from-indigo-500/30 to-blue-500/30" },
  { title: "Constitutional Law II — DPSP", subject: "Sem 3", pages: 24, size: "1.9 MB", color: "from-cyan-500/30 to-blue-500/30" },
  { title: "Property Law — Transfer of Property Act", subject: "Sem 4", pages: 30, size: "2.3 MB", color: "from-fuchsia-500/30 to-pink-500/30" },
  { title: "Evidence Act — Relevancy of Facts", subject: "Sem 5", pages: 28, size: "2.2 MB", color: "from-blue-500/30 to-violet-500/30" },
];

function NotesPage() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState("All");
  const filtered = notes.filter(n =>
    (active === "All" || n.subject === active) &&
    n.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Library</p>
        <h1 className="mt-2 font-display text-4xl md:text-6xl font-bold">Notes & PDF Library</h1>
        <p className="mt-4 text-muted-foreground">
          Hand-curated lecture notes, distilled summaries and quick revision sheets — downloadable for offline study.
        </p>
      </div>

      <div className="mt-10 flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search notes…" className="pl-9 bg-card" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {subjects.map(s => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-smooth whitespace-nowrap ${
                active === s ? "bg-gradient-brand text-primary-foreground border-transparent" : "bg-card border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((n, i) => (
          <motion.div
            key={n.title}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}
            className="group rounded-2xl border border-border bg-card overflow-hidden hover:-translate-y-1 hover:shadow-soft transition-smooth"
          >
            <div className={`relative aspect-[16/10] bg-gradient-to-br ${n.color} grid place-items-center`}>
              <FileText className="size-12 text-foreground/50" />
              <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-card/90 text-[10px] tracking-widest uppercase font-medium">
                {n.subject}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display font-semibold">{n.title}</h3>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{n.pages} pages</span><span>·</span><span>{n.size}</span>
              </div>
              <Button size="sm" className="mt-4 w-full bg-gradient-brand text-primary-foreground">
                <Download className="mr-1 size-4" /> Download PDF
              </Button>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-20">No notes match your search.</div>
        )}
      </div>
    </div>
  );
}
