import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, FileQuestion, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/pyqs")({
  head: () => ({
    meta: [
      { title: "Previous Year Question Papers — Lumin" },
      { name: "description", content: "A decade of solved DU LL.B previous year question papers, organised by semester and subject." },
    ],
  }),
  component: PYQPage,
});

const years = [2024, 2023, 2022, 2021, 2020, 2019];
const papers = [
  { subject: "Constitutional Law I", sem: 2 },
  { subject: "Law of Contracts", sem: 1 },
  { subject: "Criminal Law (IPC)", sem: 1 },
  { subject: "Law of Torts & CPA", sem: 1 },
  { subject: "Family Law I", sem: 2 },
  { subject: "Jurisprudence", sem: 3 },
  { subject: "Constitutional Law II", sem: 3 },
  { subject: "Property Law", sem: 4 },
];

function PYQPage() {
  const [year, setYear] = useState(2024);
  return (
    <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Archive</p>
        <h1 className="mt-2 font-display text-4xl md:text-6xl font-bold">Previous Year Papers</h1>
        <p className="mt-4 text-muted-foreground">
          A decade of solved DU LL.B exam papers — with model answers written by top scorers and faculty.
        </p>
      </div>

      <div className="mt-10 flex gap-2 overflow-x-auto">
        {years.map(y => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-smooth whitespace-nowrap ${
              year === y ? "bg-gradient-brand text-primary-foreground border-transparent" : "bg-card border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <CalendarDays className="inline mr-1 size-3.5" /> {y}
          </button>
        ))}
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {papers.map((p, i) => (
          <motion.div
            key={p.subject}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.03 }}
            className="rounded-2xl border border-border bg-card p-5 hover:-translate-y-1 hover:shadow-soft transition-smooth"
          >
            <div className="flex items-start justify-between">
              <div className="size-11 rounded-xl bg-gradient-brand text-primary-foreground grid place-items-center">
                <FileQuestion className="size-5" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-medium text-muted-foreground">Sem {p.sem}</span>
            </div>
            <h3 className="mt-4 font-display font-semibold text-lg">{p.subject}</h3>
            <p className="mt-1 text-xs text-muted-foreground">DU LL.B · {year} · Solved</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" className="flex-1 bg-gradient-brand text-primary-foreground">
                <Download className="mr-1 size-4" /> Paper
              </Button>
              <Button size="sm" variant="outline" className="flex-1">Solutions</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
