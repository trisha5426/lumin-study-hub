import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Download, FileText, MessageSquare, PlayCircle,
  CheckCircle2, Lock, Send, ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/courses/$courseId/lessons/$lessonId")({
  head: () => ({
    meta: [
      { title: "Lesson — Lumin" },
      { name: "description", content: "Watch your Lumin lecture, take notes and download materials." },
    ],
  }),
  component: LessonPage,
});

const lessons = [
  { id: "1", title: "Introduction to the Constitution", duration: "12:30", done: true },
  { id: "2", title: "Preamble & its Significance", duration: "18:42", done: true },
  { id: "3", title: "Fundamental Rights — Overview", duration: "22:15", done: true },
  { id: "4", title: "Article 14 — Equality before Law", duration: "32:14", done: false, current: true },
  { id: "5", title: "Article 19 — Six Freedoms", duration: "28:50", done: false },
  { id: "6", title: "Article 21 — Right to Life & Liberty", duration: "35:20", done: false, locked: true },
  { id: "7", title: "Directive Principles", duration: "26:00", done: false, locked: true },
];

const comments = [
  { name: "Riya P.", time: "2h ago", text: "The Maneka Gandhi case explanation here is gold. Made the doctrine of substantive due process click finally.", likes: 24 },
  { name: "Aman K.", time: "1d ago", text: "Could you add a side-by-side of Gopalan vs Maneka? Would help in the exam.", likes: 11 },
  { name: "Sneha M.", time: "3d ago", text: "Loved the case map. Downloading the notes now!", likes: 8 },
];

function LessonPage() {
  const { courseId } = useParams({ from: "/courses/$courseId/lessons/$lessonId" });
  const course = courses.find(c => c.id === courseId) ?? courses[0];
  const currentIdx = lessons.findIndex(l => l.current);
  const progress = Math.round(((lessons.filter(l => l.done).length) / lessons.length) * 100);

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      {/* breadcrumb */}
      <div className="text-xs text-muted-foreground flex items-center gap-1 mb-4">
        <Link to="/courses" className="hover:text-foreground">Courses</Link>
        <ChevronRight className="size-3" />
        <Link to="/courses/$courseId" params={{ courseId: course.id }} className="hover:text-foreground">{course.title}</Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground">Lesson {currentIdx + 1}</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        {/* main */}
        <div className="space-y-6 min-w-0">
          {/* video */}
          <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-blue-600/40 to-violet-600/40 overflow-hidden grid place-items-center shadow-soft">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
            <button className="size-20 rounded-full bg-white/95 text-primary grid place-items-center shadow-glow hover:scale-105 transition-smooth">
              <PlayCircle className="size-10" />
            </button>
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
              <div className="h-1 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full bg-gradient-brand w-2/3" />
              </div>
              <div className="mt-2 flex justify-between text-xs">
                <span>32:14</span><span>48:00</span>
              </div>
            </div>
          </div>

          {/* lesson info */}
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">{course.code} · Lecture {currentIdx + 1}</p>
            <h1 className="mt-2 font-display text-2xl md:text-4xl font-bold">{lessons[currentIdx].title}</h1>
            <p className="mt-3 text-muted-foreground">
              We unpack Article 14 — equality before law and equal protection of laws — through landmark cases including
              State of West Bengal v. Anwar Ali Sarkar, E.P. Royappa and Maneka Gandhi v. Union of India.
            </p>

            <div className="mt-6 flex items-center justify-between gap-3">
              <Button variant="outline" disabled={currentIdx === 0}>
                <ChevronLeft className="mr-1 size-4" /> Previous
              </Button>
              <div className="flex-1 max-w-md">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Course progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-brand transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <Button className="bg-gradient-brand text-primary-foreground">
                Next <ChevronRight className="ml-1 size-4" />
              </Button>
            </div>
          </div>

          {/* downloads */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display font-semibold">Downloadable resources</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {[
                { t: "Lecture Notes — Article 14", s: "2.1 MB" },
                { t: "Case Map (Anwar Ali → Maneka)", s: "780 KB" },
              ].map(r => (
                <div key={r.t} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                  <div className="size-10 rounded-lg bg-gradient-brand text-primary-foreground grid place-items-center">
                    <FileText className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{r.t}</p>
                    <p className="text-xs text-muted-foreground">PDF · {r.s}</p>
                  </div>
                  <Button size="sm" variant="ghost"><Download className="size-4" /></Button>
                </div>
              ))}
            </div>
          </div>

          {/* discussion */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-5 text-primary" />
              <h3 className="font-display font-semibold">Discussion</h3>
              <span className="text-xs text-muted-foreground">· {comments.length} comments</span>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
              <Input placeholder="Ask a question or share an insight…" className="bg-background" />
              <Button className="bg-gradient-brand text-primary-foreground"><Send className="size-4" /></Button>
            </form>
            <div className="mt-6 space-y-5">
              {comments.map(c => (
                <div key={c.name} className="flex gap-3">
                  <div className="size-9 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.time}</p>
                    </div>
                    <p className="mt-1 text-sm text-foreground/90 leading-relaxed">{c.text}</p>
                    <button className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                      <ThumbsUp className="size-3" /> {c.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* sidebar — lesson list */}
        <aside className="lg:sticky lg:top-20 self-start">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Course content</p>
              <h3 className="mt-1 font-display font-semibold">{course.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{lessons.length} lessons · {course.hours}h</p>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {lessons.map((l, i) => (
                <Link
                  key={l.id}
                  to="/courses/$courseId/lessons/$lessonId"
                  params={{ courseId: course.id, lessonId: l.id }}
                  className={`flex items-center gap-3 px-5 py-3 border-b border-border hover:bg-muted/50 transition-smooth ${l.current ? "bg-muted" : ""}`}
                >
                  <div className={`size-7 rounded-full grid place-items-center text-xs shrink-0 ${
                    l.done ? "bg-gradient-brand text-primary-foreground" :
                    l.locked ? "bg-muted text-muted-foreground" :
                    "border border-border"
                  }`}>
                    {l.done ? <CheckCircle2 className="size-4" /> : l.locked ? <Lock className="size-3" /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${l.current ? "font-medium text-primary" : ""}`}>{l.title}</p>
                    <p className="text-xs text-muted-foreground">{l.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
