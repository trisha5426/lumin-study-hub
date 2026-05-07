import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Gavel, PlayCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Lumin LL.B Exam Prep" },
      { name: "description", content: "Browse all Lumin courses for Delhi University LL.B students — Constitutional Law, Contracts, IPC, Torts and more." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => courses.filter((c) =>
      [c.title, c.description, c.code, c.instructor].join(" ").toLowerCase().includes(q.toLowerCase())
    ),
    [q]
  );

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Catalog</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">All Courses</h1>
        <p className="mt-4 text-muted-foreground">
          Every paper of the DU LL.B syllabus, taught with the care of a private tutor.
        </p>
      </div>

      <div className="mt-10 max-w-md relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title, code or instructor"
          className="pl-10 h-12 glass border-border"
        />
      </div>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <Link
            key={c.id}
            to="/courses/$courseId"
            params={{ courseId: c.id }}
            className="group glass rounded-2xl overflow-hidden transition-smooth hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className={`relative aspect-[16/10] bg-gradient-to-br ${c.accent} grid place-items-center`}>
              <Gavel className="size-12 text-foreground/70" />
              <div className="absolute top-3 left-3 px-2 py-1 rounded-md glass-strong text-[10px] tracking-widest uppercase">
                {c.code} · Sem {c.semester}
              </div>
              <div className="absolute bottom-3 right-3 size-12 rounded-full bg-[var(--gradient-gold)] text-gold-foreground grid place-items-center opacity-0 group-hover:opacity-100 transition-smooth">
                <PlayCircle className="size-5" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl">{c.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.instructor}</p>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{c.hours}h · {c.lessons} lessons</span>
                <span className="font-display text-xl text-gradient-gold">₹{c.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">No courses match "{q}".</p>
      )}
    </div>
  );
}
