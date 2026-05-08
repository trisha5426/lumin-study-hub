import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, BookOpen, FileText, Gavel, PlayCircle, Sparkles, Star, Users,
  Video, FileQuestion, ScrollText, NotebookPen, Map, Zap, BarChart3, Bell,
  Download, ChevronRight, CheckCircle2, GraduationCap, Quote, Plus, Minus,
  Clock, BookMarked,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumin — Smarter Exam Prep for DU LL.B Students" },
      { name: "description", content: "Master DU LL.B semester exams with video lectures, PYQs, case summaries, sample answers and exam-focused study material." },
      { property: "og:title", content: "Lumin — Smarter Exam Prep for DU LL.B Students" },
      { property: "og:description", content: "Video lectures, PYQs, case summaries and exam-focused material for Delhi University LL.B students." },
    ],
  }),
  component: HomePage,
});

const features = [
  { Icon: Video, title: "Interactive Video Lectures", desc: "Crisp, focused lessons by top DU faculty and practising advocates." },
  { Icon: FileQuestion, title: "Previous Year Papers", desc: "A decade of solved DU LL.B papers, organised by semester and subject." },
  { Icon: ScrollText, title: "Concise Case Summaries", desc: "Exam-ready briefs of every landmark judgment — facts, issues, ratio." },
  { Icon: NotebookPen, title: "Sample Answers", desc: "Model answers written the way DU examiners want them written." },
  { Icon: Map, title: "Semester-wise Roadmaps", desc: "A clear week-by-week plan for every paper in every semester." },
  { Icon: Zap, title: "Quick Revision Notes", desc: "Distilled notes for last-mile revision the night before the exam." },
];

const semesters = [
  { n: 1, subjects: 5, progress: 68, hue: "from-blue-500/20 to-indigo-500/20" },
  { n: 2, subjects: 5, progress: 42, hue: "from-indigo-500/20 to-violet-500/20" },
  { n: 3, subjects: 5, progress: 25, hue: "from-violet-500/20 to-purple-500/20" },
  { n: 4, subjects: 5, progress: 12, hue: "from-purple-500/20 to-fuchsia-500/20" },
  { n: 5, subjects: 5, progress: 0,  hue: "from-sky-500/20 to-blue-500/20" },
  { n: 6, subjects: 5, progress: 0,  hue: "from-cyan-500/20 to-sky-500/20" },
];

const popular = courses.slice(0, 5).map((c, i) => ({
  ...c,
  rating: [4.9, 4.8, 4.9, 4.7, 4.8][i],
  students: [3240, 2890, 3120, 2010, 2540][i],
}));

const testimonials = [
  { name: "Ananya Sharma", role: "LL.B '25, Faculty of Law, DU", quote: "The case summaries alone saved my Constitutional Law paper. Lumin feels like a personal tutor in your pocket." },
  { name: "Rohan Mehta", role: "LL.B '24, Campus Law Centre", quote: "Production quality is unreal. I finally enjoy revising torts at 2 AM. The PYQ pack is gold." },
  { name: "Priya Kapoor", role: "LL.B '26, Law Centre II", quote: "Sample answers in DU's exact style — exactly what students need. My marks jumped a full grade." },
];

const tiers = [
  { name: "Free", price: 0, tag: "Try it out", features: ["Browse all courses", "4 free lecture views", "Sample notes & PYQs", "Community access"] },
  { name: "Semester Pass", price: 4999, tag: "Most popular", popular: true, features: ["All courses of one semester", "PYQs, notes & model answers", "Priority doubt support", "12-month access"] },
  { name: "Premium Access", price: 11999, tag: "Best value", features: ["All 6 semesters unlocked", "All future updates", "1-on-1 mentor calls", "Lifetime access"] },
];

const faqs = [
  { q: "Is Lumin made specifically for Delhi University LL.B?", a: "Yes. Every course, PYQ pack, note set and model answer is mapped to the DU LL.B syllabus and examiner style." },
  { q: "Can I try before I buy?", a: "Absolutely. Watch any lecture up to 4 times for free. Sample notes and PYQs are accessible without payment." },
  { q: "Will I get the latest amendments and case law?", a: "All courses are continuously updated. New landmark judgments and amendments are added within days." },
  { q: "Do you offer a refund?", a: "We offer a 7-day no-questions-asked refund on the Semester Pass and Premium plan." },
  { q: "Can I download notes and PYQs?", a: "Yes — every PDF in your plan is downloadable for offline study." },
];

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Semesters />
      <PopularCourses />
      <DashboardPreview />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}

/* ───────────────────────── Hero ───────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob bg-blue-400 size-[420px] -top-20 -left-20 animate-blob" />
        <div className="blob bg-violet-500 size-[420px] top-40 right-0 animate-blob" style={{ animationDelay: "-6s" }} />
        <div className="blob bg-sky-300 size-[320px] bottom-0 left-1/3 animate-blob" style={{ animationDelay: "-12s" }} />
      </div>
      <div className="container mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs">
              <Sparkles className="size-3.5 text-primary" />
              Crafted for Delhi University LL.B
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
              Smarter Exam Prep for{" "}
              <span className="text-gradient-brand">Delhi University LL.B</span> Students
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Master your semester exams with concise video lectures, case summaries, PYQs, and exam-focused study material — all in one premium platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground hover:opacity-95 shadow-glow">
                <Link to="/courses">Explore Courses <ArrowRight className="ml-1 size-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-card/60 backdrop-blur">
                <Link to="/courses">
                  <PlayCircle className="mr-1 size-4" /> Watch Demo
                </Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="size-8 rounded-full border-2 border-background bg-gradient-to-br from-blue-400 to-violet-500" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-foreground">
                  {[...Array(5)].map((_,i) => <Star key={i} className="size-3.5 fill-primary text-primary" />)}
                  <span className="ml-1 font-medium">4.9</span>
                </div>
                <div className="text-xs">Trusted by 3,200+ DU law students</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[460px]">
              {/* main card */}
              <div className="absolute inset-0 glass rounded-3xl shadow-soft p-6 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div className="size-2 rounded-full bg-red-400" />
                  <div className="size-2 rounded-full bg-yellow-400" />
                  <div className="size-2 rounded-full bg-green-400" />
                  <span className="ml-auto text-xs text-muted-foreground">Constitutional Law I</span>
                </div>
                <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-500/30 to-violet-500/30 grid place-items-center relative">
                  <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
                  <div className="size-16 rounded-full bg-white/90 text-primary grid place-items-center shadow-glow">
                    <PlayCircle className="size-8" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium">Lecture 12 · Article 14 — Equality</div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-brand" />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>32:14</span><span>48:00</span>
                  </div>
                </div>
              </div>

              {/* floating cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                className="absolute -left-8 top-12 glass rounded-2xl p-3 shadow-soft animate-float w-56 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-gradient-brand grid place-items-center text-primary-foreground">
                    <FileText className="size-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">PYQ 2024 solved</div>
                    <div className="text-xs text-muted-foreground">42 questions · 18 pages</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                className="absolute -right-6 bottom-10 glass rounded-2xl p-4 shadow-soft animate-float w-60 hidden md:block"
                style={{ animationDelay: "-3s" }}
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BarChart3 className="size-3.5" /> Weekly progress
                </div>
                <div className="mt-2 flex items-end gap-1.5 h-12">
                  {[40,65,30,80,55,90,70].map((h,i) => (
                    <div key={i} className="flex-1 rounded-sm bg-gradient-brand opacity-80" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="mt-2 text-sm font-medium">+18% vs last week</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Features ───────────────────────── */
function Features() {
  return (
    <section className="container mx-auto px-4 md:px-8 py-20">
      <SectionHead
        eyebrow="Why Lumin"
        title="Everything you need to ace your exams"
        sub="Six pillars built around how DU LL.B students actually study — focused, fast, and exam-aware."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map(({ Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group glass rounded-2xl p-6 transition-smooth hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="size-12 rounded-xl bg-gradient-brand text-primary-foreground grid place-items-center group-hover:scale-110 transition-smooth">
              <Icon className="size-5" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Semesters ───────────────────────── */
function Semesters() {
  return (
    <section className="container mx-auto px-4 md:px-8 py-20">
      <SectionHead
        eyebrow="Semester-wise"
        title="Pick your semester. Start preparing."
        sub="Every semester is mapped to the official DU LL.B syllabus with a clear weekly roadmap."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {semesters.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative rounded-2xl p-6 border border-border bg-card overflow-hidden group transition-smooth hover:-translate-y-1 hover:shadow-soft"
          >
            <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${s.hue} opacity-70`} />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Semester</p>
                <p className="font-display text-5xl font-bold text-gradient-brand">{s.n}</p>
              </div>
              <div className="size-12 rounded-xl bg-card grid place-items-center shadow-card">
                <BookMarked className="size-5 text-primary" />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{s.subjects} subjects · 180+ lessons</p>
            <div className="mt-5">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Your progress</span>
                <span className="font-medium">{s.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-brand transition-all" style={{ width: `${s.progress}%` }} />
              </div>
            </div>
            <Button asChild variant="outline" className="mt-5 w-full bg-card/80">
              <Link to="/courses">View Courses <ChevronRight className="ml-1 size-4" /></Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Popular Courses ───────────────────────── */
function PopularCourses() {
  return (
    <section className="container mx-auto px-4 md:px-8 py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Top picks</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl font-bold">Popular Courses</h2>
        </div>
        <Link to="/courses" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          View all courses <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {popular.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link
              to="/courses/$courseId"
              params={{ courseId: c.id }}
              className="group block rounded-2xl border border-border bg-card overflow-hidden transition-smooth hover:-translate-y-1 hover:shadow-soft"
            >
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${c.accent} grid place-items-center overflow-hidden`}>
                <Gavel className="size-14 text-foreground/40 group-hover:scale-110 transition-smooth" />
                <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-card/90 backdrop-blur text-[10px] tracking-widest uppercase font-medium">
                  {c.code}
                </span>
                <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-card/90 backdrop-blur text-xs flex items-center gap-1">
                  <Star className="size-3 fill-primary text-primary" /> {c.rating}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-smooth">
                  {c.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">By {c.instructor}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {c.hours}h</span>
                  <span className="inline-flex items-center gap-1"><Users className="size-3" /> {c.students.toLocaleString()}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-xl font-semibold">₹{c.price}</span>
                  <Button size="sm" className="bg-gradient-brand text-primary-foreground">Enroll Now</Button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Dashboard Preview ───────────────────────── */
function DashboardPreview() {
  return (
    <section className="container mx-auto px-4 md:px-8 py-20">
      <SectionHead
        eyebrow="Your study HQ"
        title="A dashboard built for serious students"
        sub="Track every lecture, every PYQ, and every revision — all in one calm, focused workspace."
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-3 md:p-4 shadow-soft overflow-hidden"
      >
        <div className="rounded-2xl bg-background/80 backdrop-blur grid md:grid-cols-[220px_1fr] overflow-hidden border border-border">
          {/* sidebar */}
          <aside className="hidden md:flex flex-col gap-1 p-4 border-r border-border bg-muted/40">
            <div className="flex items-center gap-2 px-2 py-3">
              <div className="size-8 rounded-lg bg-gradient-brand grid place-items-center text-primary-foreground">
                <GraduationCap className="size-4" />
              </div>
              <span className="font-display font-semibold">Lumin</span>
            </div>
            {[
              { Icon: BarChart3, label: "Overview", active: true },
              { Icon: BookOpen, label: "My Courses" },
              { Icon: FileText, label: "Notes" },
              { Icon: FileQuestion, label: "PYQs" },
              { Icon: Bell, label: "Notifications" },
            ].map(({ Icon, label, active }) => (
              <div key={label} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${active ? "bg-card text-foreground shadow-card" : "text-muted-foreground"}`}>
                <Icon className="size-4" /> {label}
              </div>
            ))}
          </aside>
          {/* main */}
          <div className="p-5 md:p-7">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="font-display text-xl font-semibold">Welcome back, Ananya 👋</h3>
                <p className="text-sm text-muted-foreground">You're on a 6-day streak. Keep it going.</p>
              </div>
              <Button size="sm" className="bg-gradient-brand text-primary-foreground">
                Continue learning <ArrowRight className="ml-1 size-3.5" />
              </Button>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {[
                { label: "Enrolled", value: "5", sub: "courses" },
                { label: "Watch time", value: "42h", sub: "this month" },
                { label: "PYQs solved", value: "128", sub: "of 200" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border p-4 bg-card">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="font-display text-3xl font-semibold mt-1">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border p-4 bg-card">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Continue learning</h4>
                  <span className="text-xs text-muted-foreground">3 in progress</span>
                </div>
                <div className="mt-3 space-y-3">
                  {courses.slice(0,3).map((c, i) => (
                    <div key={c.id} className="flex items-center gap-3">
                      <div className={`size-10 rounded-lg bg-gradient-to-br ${c.accent} grid place-items-center`}>
                        <Gavel className="size-4 text-foreground/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{c.title}</p>
                        <div className="mt-1 h-1 rounded-full bg-muted">
                          <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${[60,40,25][i]}%` }} />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{[60,40,25][i]}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border p-4 bg-card">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Upcoming quizzes</h4>
                  <span className="text-xs text-muted-foreground">This week</span>
                </div>
                <div className="mt-3 space-y-3">
                  {[
                    { t: "Constitutional Law — Article 21", d: "Tomorrow, 6 PM" },
                    { t: "Contracts — Consideration", d: "Thu, 8 PM" },
                    { t: "IPC — General Exceptions", d: "Sat, 11 AM" },
                  ].map((q) => (
                    <div key={q.t} className="flex items-start gap-3">
                      <div className="size-8 rounded-lg bg-accent text-accent-foreground grid place-items-center">
                        <CheckCircle2 className="size-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{q.t}</p>
                        <p className="text-xs text-muted-foreground">{q.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  <Download className="mr-1 size-3.5" /> Download notes pack
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── Testimonials ───────────────────────── */
function Testimonials() {
  return (
    <section className="container mx-auto px-4 md:px-8 py-20">
      <SectionHead
        eyebrow="Loved by students"
        title="What DU LL.B students say"
        sub="Honest words from the people who actually use Lumin every single day."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border border-border bg-card p-7 shadow-card hover:-translate-y-1 transition-smooth"
          >
            <Quote className="size-7 text-primary/40" />
            <blockquote className="mt-3 text-base leading-relaxed">"{t.quote}"</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-500" />
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Pricing ───────────────────────── */
function Pricing() {
  return (
    <section className="container mx-auto px-4 md:px-8 py-20">
      <SectionHead
        eyebrow="Pricing"
        title="Simple, student-friendly pricing"
        sub="Start free. Upgrade when you're ready. Cancel anytime."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative rounded-2xl p-8 transition-smooth ${
              t.popular
                ? "bg-gradient-brand text-primary-foreground shadow-glow scale-[1.02] border-transparent"
                : "border border-border bg-card hover:-translate-y-1 hover:shadow-soft"
            }`}
          >
            {t.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background text-primary text-[10px] uppercase tracking-widest font-semibold border border-border">
                {t.tag}
              </span>
            )}
            <p className={`text-xs uppercase tracking-widest ${t.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
              {t.tag}
            </p>
            <h3 className="font-display text-2xl font-semibold mt-1">{t.name}</h3>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="font-display text-5xl font-bold">
                {t.price === 0 ? "Free" : `₹${t.price.toLocaleString("en-IN")}`}
              </span>
            </div>
            <ul className="mt-6 space-y-2.5 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <CheckCircle2 className={`size-4 mt-0.5 shrink-0 ${t.popular ? "text-primary-foreground" : "text-primary"}`} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className={`mt-8 w-full ${t.popular ? "bg-background text-foreground hover:bg-background/90" : "bg-gradient-brand text-primary-foreground"}`}
            >
              <Link to="/signup">Get started</Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="container mx-auto px-4 md:px-8 py-20">
      <SectionHead
        eyebrow="FAQ"
        title="Questions, answered"
        sub="Couldn't find what you're looking for? Drop us a line at lumin9279@gmail.com."
      />
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((f, i) => {
          const isOpen = i === open;
          return (
            <div key={f.q} className="rounded-2xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
              >
                <span className="font-medium">{f.q}</span>
                <span className="size-8 rounded-full grid place-items-center bg-muted shrink-0">
                  {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                </span>
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ───────────────────────── Final CTA ───────────────────────── */
function FinalCTA() {
  return (
    <section className="container mx-auto px-4 md:px-8 py-20">
      <div className="relative rounded-3xl p-12 md:p-20 text-center overflow-hidden bg-gradient-brand text-primary-foreground shadow-glow">
        <div aria-hidden className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
        <div className="relative">
          <Users className="size-10 mx-auto mb-4 opacity-90" />
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Walk in prepared. Walk out a lawyer.
          </h2>
          <p className="mt-4 text-primary-foreground/85 max-w-xl mx-auto">
            Join thousands of DU LL.B students who trust Lumin every semester.
          </p>
          <Button asChild size="lg" className="mt-8 bg-background text-foreground hover:bg-background/90">
            <Link to="/signup">Create your free account <ArrowRight className="ml-1 size-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Section Header ───────────────────────── */
function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl md:text-5xl font-bold">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}
