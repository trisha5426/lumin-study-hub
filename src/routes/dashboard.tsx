import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BarChart3, BookOpen, Bell, FileQuestion, FileText, GraduationCap, Search,
  Settings, Trophy, Flame, Clock, ChevronRight, Download, PlayCircle, Gavel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Lumin" },
      { name: "description", content: "Your personal Lumin dashboard — track progress, continue learning, download notes." },
    ],
  }),
  component: DashboardPage,
});

const navItems = [
  { Icon: BarChart3, label: "Overview", active: true },
  { Icon: BookOpen, label: "My Courses" },
  { Icon: FileText, label: "Notes" },
  { Icon: FileQuestion, label: "PYQs" },
  { Icon: Trophy, label: "Achievements" },
  { Icon: Bell, label: "Notifications" },
  { Icon: Settings, label: "Settings" },
];

function DashboardPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-20 self-start">
          <div className="rounded-2xl border border-border bg-card p-3">
            <div className="flex items-center gap-2 px-2 py-3">
              <div className="size-9 rounded-xl bg-gradient-brand grid place-items-center text-primary-foreground">
                <GraduationCap className="size-5" />
              </div>
              <div>
                <div className="font-display font-semibold leading-tight">Ananya S.</div>
                <div className="text-xs text-muted-foreground">Semester 2</div>
              </div>
            </div>
            <nav className="mt-2 space-y-1">
              {navItems.map(({ Icon, label, active }) => (
                <button
                  key={label}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-smooth ${
                    active ? "bg-gradient-brand text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" /> {label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 space-y-6">
          {/* topbar */}
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold">Welcome back, Ananya 👋</h1>
              <p className="text-sm text-muted-foreground">You're on a 6-day streak. Keep it going.</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search courses, notes…" className="pl-9 bg-card" />
            </div>
          </div>

          {/* stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { Icon: BookOpen, label: "Enrolled", value: "5", sub: "courses" },
              { Icon: Clock, label: "Watch time", value: "42h", sub: "this month" },
              { Icon: FileQuestion, label: "PYQs solved", value: "128", sub: "of 200" },
              { Icon: Flame, label: "Streak", value: "6 days", sub: "personal best: 14" },
            ].map(({ Icon, label, value, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
                  <Icon className="size-4 text-primary" />
                </div>
                <p className="font-display text-3xl font-bold mt-2">{value}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </motion.div>
            ))}
          </div>

          {/* continue learning */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">Continue learning</h2>
              <Link to="/courses" className="text-xs text-primary inline-flex items-center gap-1 hover:underline">
                All courses <ChevronRight className="size-3" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {courses.slice(0, 3).map((c, i) => (
                <Link
                  key={c.id}
                  to="/courses/$courseId"
                  params={{ courseId: c.id }}
                  className="group rounded-xl border border-border overflow-hidden hover:-translate-y-1 hover:shadow-soft transition-smooth"
                >
                  <div className={`relative aspect-[16/9] bg-gradient-to-br ${c.accent} grid place-items-center`}>
                    <Gavel className="size-10 text-foreground/50" />
                    <div className="absolute bottom-3 right-3 size-10 rounded-full bg-card/90 grid place-items-center">
                      <PlayCircle className="size-5 text-primary" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-medium text-sm truncate">{c.title}</p>
                    <div className="mt-2 h-1 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${[60,40,25][i]}%` }} />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">{[60,40,25][i]}% complete</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* row */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">Upcoming quizzes</h3>
              <div className="mt-4 space-y-3">
                {[
                  { t: "Constitutional Law — Article 21", d: "Tomorrow, 6 PM" },
                  { t: "Contracts — Consideration", d: "Thu, 8 PM" },
                  { t: "IPC — General Exceptions", d: "Sat, 11 AM" },
                ].map((q) => (
                  <div key={q.t} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                    <div className="size-10 rounded-lg bg-accent text-accent-foreground grid place-items-center">
                      <FileQuestion className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{q.t}</p>
                      <p className="text-xs text-muted-foreground">{q.d}</p>
                    </div>
                    <Button size="sm" variant="outline">Start</Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">Downloadable notes</h3>
              <div className="mt-4 space-y-3">
                {[
                  { t: "Article 14 — Equality before law", s: "2.1 MB" },
                  { t: "Consideration in Contracts", s: "1.4 MB" },
                  { t: "General Exceptions — IPC", s: "2.6 MB" },
                ].map((n) => (
                  <div key={n.t} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                    <div className="size-10 rounded-lg bg-gradient-brand text-primary-foreground grid place-items-center">
                      <FileText className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{n.t}</p>
                      <p className="text-xs text-muted-foreground">PDF · {n.s}</p>
                    </div>
                    <Button size="sm" variant="ghost"><Download className="size-4" /></Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
