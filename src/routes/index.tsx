import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, FileText, Gavel, PlayCircle, Sparkles, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-library.jpg";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumin — Premium LL.B Exam Prep for Delhi University" },
      { name: "description", content: "Master DU LL.B semester exams with cinematic video lectures, PYQs, case summaries and model answers." },
    ],
  }),
  component: HomePage,
});

const features = [
  { Icon: PlayCircle, title: "Interactive Lectures", desc: "Cinematic video lessons by top DU faculty and practitioners." },
  { Icon: FileText, title: "Previous Year Papers", desc: "A decade of solved DU LL.B papers, organised by semester." },
  { Icon: Gavel, title: "Case Summaries", desc: "Crisp, exam-ready briefs of every landmark judgment." },
  { Icon: BookOpen, title: "Lecture Notes", desc: "Hand-curated notes that map perfectly to the syllabus." },
];

const testimonials = [
  { name: "Ananya S.", role: "LL.B '25, Faculty of Law, DU", quote: "The case summaries alone saved my Constitutional Law paper. Lumin feels like a personal tutor." },
  { name: "Rohan M.", role: "LL.B '24, Campus Law Centre", quote: "Production quality is unreal. I finally enjoy revising torts at 2 AM." },
  { name: "Priya K.", role: "LL.B '26, Law Centre II", quote: "PYQs with model answers — exactly what DU students actually need." },
];

const tiers = [
  { name: "Single Course", price: 1299, features: ["1 course unlimited views", "PYQs + notes", "Case summaries", "6-month access"] },
  { name: "Semester Pass", price: 4999, popular: true, features: ["All courses of one semester", "PYQs, notes & model answers", "Priority doubt support", "12-month access"] },
  { name: "LL.B Complete", price: 11999, features: ["All 6 semesters unlocked", "All future updates", "1-on-1 mentor calls", "Lifetime access"] },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" width={1920} height={1080} className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
        <div className="container mx-auto px-4 md:px-8 py-24 md:py-36">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" />
              Crafted for Delhi University LL.B
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.05]">
              The art of law,
              <br />
              <span className="text-gradient-gold italic">taught beautifully.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Cinematic lectures, decade-long PYQs and surgical case summaries —
              everything a DU LL.B student needs to walk into the exam hall with quiet confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[var(--gradient-gold)] text-gold-foreground hover:opacity-90 shadow-glow">
                <Link to="/courses">Explore courses <ArrowRight className="ml-1 size-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="glass border-border">
                <Link to="/signup">Start free</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="size-8 rounded-full border-2 border-background bg-gradient-to-br from-amber-300 to-rose-400" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-foreground">
                  {[...Array(5)].map((_,i) => <Star key={i} className="size-3.5 fill-primary text-primary" />)}
                  <span className="ml-1">4.9</span>
                </div>
                <div className="text-xs">Trusted by 3,200+ DU law students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-5">
          {features.map(({ Icon, title, desc }) => (
            <div key={title} className="glass rounded-2xl p-6 transition-smooth hover:-translate-y-1 hover:shadow-glow">
              <div className="size-11 rounded-xl bg-[var(--gradient-gold)] text-gold-foreground grid place-items-center">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Curriculum</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Featured Courses</h2>
          </div>
          <Link to="/courses" className="hidden md:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-smooth">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((c) => (
            <Link
              key={c.id}
              to="/courses/$courseId"
              params={{ courseId: c.id }}
              className="group glass rounded-2xl overflow-hidden transition-smooth hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${c.accent} grid place-items-center`}>
                <Gavel className="size-12 text-foreground/70" />
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md glass-strong text-[10px] tracking-widest uppercase">
                  {c.code}
                </div>
                <div className="absolute bottom-3 right-3 size-12 rounded-full bg-[var(--gradient-gold)] text-gold-foreground grid place-items-center opacity-0 group-hover:opacity-100 transition-smooth">
                  <PlayCircle className="size-5" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{c.hours}h · {c.lessons} lessons</span>
                  <span className="font-display text-xl text-gradient-gold">₹{c.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Voices</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Loved by DU law students</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="glass rounded-2xl p-7">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_,i) => <Star key={i} className="size-4 fill-primary text-primary" />)}
              </div>
              <blockquote className="font-display text-xl leading-snug">"{t.quote}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-br from-amber-300 to-rose-400" />
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Pricing</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Choose your path</h2>
          <p className="mt-3 text-muted-foreground">Watch any course 4 times for free. Unlock unlimited access whenever you're ready.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl p-8 transition-smooth ${
                t.popular
                  ? "bg-[var(--gradient-gold)] text-gold-foreground shadow-glow scale-[1.02]"
                  : "glass hover:-translate-y-1"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background text-primary text-xs uppercase tracking-widest">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-2xl">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl">₹{t.price.toLocaleString("en-IN")}</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className={t.popular ? "text-gold-foreground" : "text-primary"}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-8 w-full ${t.popular ? "bg-background text-foreground hover:bg-background/90" : "bg-[var(--gradient-gold)] text-gold-foreground"}`}
              >
                <Link to="/signup">Get started</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="relative glass rounded-3xl p-12 md:p-20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-60" />
          <div className="relative">
            <Users className="size-10 mx-auto text-primary mb-4" />
            <h2 className="font-display text-4xl md:text-6xl">Walk in prepared. <span className="text-gradient-gold italic">Walk out a lawyer.</span></h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Join thousands of DU LL.B students who trust Lumin every semester.</p>
            <Button asChild size="lg" className="mt-8 bg-[var(--gradient-gold)] text-gold-foreground hover:opacity-90 shadow-glow">
              <Link to="/signup">Create your free account <ArrowRight className="ml-1 size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
