import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Lock, PlayCircle, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/courses/$courseId")({
  head: ({ params }) => {
    const c = courses.find((x) => x.id === params.courseId);
    return {
      meta: [
        { title: c ? `${c.title} — Lumin` : "Course — Lumin" },
        { name: "description", content: c?.description ?? "Lumin LL.B course" },
      ],
    };
  },
  loader: ({ params }) => {
    const course = courses.find((c) => c.id === params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  component: CourseDetail,
});

const FREE_VIEW_LIMIT = 4;

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const [views, setViews] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load watch count from localStorage (will move to DB once Cloud is enabled)
  useEffect(() => {
    const key = `lumin:views:${course.id}`;
    const stored = Number(localStorage.getItem(key) ?? 0);
    setViews(stored);
    setPurchased(localStorage.getItem(`lumin:purchased:${course.id}`) === "1");
  }, [course.id]);

  const locked = !purchased && views >= FREE_VIEW_LIMIT;

  const handlePlay = () => {
    if (locked) return;
    if (!purchased) {
      const next = views + 1;
      setViews(next);
      localStorage.setItem(`lumin:views:${course.id}`, String(next));
      toast(`View ${next} of ${FREE_VIEW_LIMIT} free views used`, {
        description: next === FREE_VIEW_LIMIT ? "This is your last free view." : undefined,
      });
    }
    setPlaying(true);
    videoRef.current?.play();
  };

  const handlePurchase = () => {
    // Razorpay flow goes here once payments are enabled.
    localStorage.setItem(`lumin:purchased:${course.id}`, "1");
    setPurchased(true);
    toast.success("Course unlocked!", { description: "You now have unlimited access." });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
      <Link to="/courses" className="text-sm text-muted-foreground hover:text-primary">← All courses</Link>

      <div className="mt-6 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {/* VIDEO PLAYER */}
          <div className={`relative aspect-video rounded-2xl overflow-hidden glass-strong shadow-elegant ${locked ? "" : ""}`}>
            <video
              ref={videoRef}
              className={`w-full h-full object-cover transition-all duration-500 ${locked ? "blur-xl scale-110" : ""}`}
              poster=""
              controls={playing && !locked}
              onEnded={() => setPlaying(false)}
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              controlsList="nodownload"
              disablePictureInPicture
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent pointer-events-none ${playing && !locked ? "opacity-0" : "opacity-100"}`} />

            {!playing && !locked && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 grid place-items-center group"
              >
                <span className="size-20 rounded-full bg-gradient-brand text-primary-foreground grid place-items-center shadow-glow group-hover:scale-110 transition-smooth">
                  <PlayCircle className="size-10" />
                </span>
              </button>
            )}

            {locked && (
              <div className="absolute inset-0 grid place-items-center p-6">
                <div className="glass-strong rounded-2xl p-8 max-w-sm text-center shadow-elegant">
                  <div className="size-14 mx-auto rounded-full bg-gradient-brand text-primary-foreground grid place-items-center">
                    <Lock className="size-6" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl">Free views exhausted</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You have used your 4 free views. Purchase this course to continue.
                  </p>
                  <Button
                    onClick={handlePurchase}
                    className="mt-5 w-full bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-glow"
                  >
                    Buy Now — ₹{course.price}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {purchased ? (
                <span className="inline-flex items-center gap-1.5 text-primary"><ShieldCheck className="size-4" /> Unlimited access</span>
              ) : (
                <>Free views used: <strong className="text-foreground">{views}/{FREE_VIEW_LIMIT}</strong></>
              )}
            </span>
            <span className="text-muted-foreground">{course.hours}h · {course.lessons} lessons</span>
          </div>

          {/* META */}
          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">{course.code} · Semester {course.semester}</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">{course.title}</h1>
            <p className="mt-3 text-muted-foreground">Taught by {course.instructor}</p>
            <p className="mt-6 text-foreground/85 leading-relaxed">{course.description}</p>
          </div>

          {/* WHAT'S INCLUDED */}
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {[
              "Full video lectures",
              "Previous year question papers",
              "Concise case summaries",
              "Lecture notes (PDF)",
              "Sample model answers",
              "Doubt support",
            ].map((f) => (
              <div key={f} className="glass rounded-xl p-4 flex items-center gap-3">
                <Sparkles className="size-4 text-primary" />
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR — Buy card */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="glass rounded-2xl p-7 shadow-elegant">
            <div className={`aspect-video rounded-xl bg-gradient-to-br ${course.accent} grid place-items-center mb-6`}>
              <PlayCircle className="size-12 text-foreground/70" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl text-gradient-brand">₹{course.price}</span>
              <span className="text-sm text-muted-foreground line-through">₹{course.price + 500}</span>
            </div>
            {purchased ? (
              <Button disabled className="mt-5 w-full">Owned ✓</Button>
            ) : (
              <Button onClick={handlePurchase} className="mt-5 w-full bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-glow">
                Buy now
              </Button>
            )}
            <p className="mt-3 text-xs text-muted-foreground text-center">
              Secure payments via Razorpay · 7-day refund
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
