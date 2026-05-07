import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Lock, PlayCircle, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";
import { useAuth } from "@/lib/auth-context";
import { createRazorpayOrder, verifyRazorpayPayment, getMyPurchases } from "@/server/razorpay.functions";

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
const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

declare global {
  interface Window { Razorpay?: any }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = RAZORPAY_SCRIPT;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [views, setViews] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [paying, setPaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const key = `lumin:views:${course.id}`;
    setViews(Number(localStorage.getItem(key) ?? 0));
  }, [course.id]);

  useEffect(() => {
    if (!user) { setPurchased(false); return; }
    getMyPurchases().then((res) => {
      setPurchased(res.courseIds.includes(course.id));
    }).catch(() => {});
  }, [user, course.id]);

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

  const handlePurchase = async () => {
    if (authLoading) return;
    if (!user) {
      toast("Please log in to purchase.");
      navigate({ to: "/login" });
      return;
    }
    setPaying(true);
    try {
      const ok = await loadRazorpay();
      if (!ok) throw new Error("Razorpay failed to load");

      const order = await createRazorpayOrder({ data: { courseId: course.id } });
      if (order.alreadyPurchased) {
        setPurchased(true);
        toast.success("You already own this course.");
        return;
      }

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Lumin",
        description: order.courseTitle,
        order_id: order.orderId,
        prefill: { email: user.email ?? "" },
        theme: { color: "#c9a84c" },
        handler: async (resp: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            await verifyRazorpayPayment({
              data: {
                orderId: resp.razorpay_order_id,
                paymentId: resp.razorpay_payment_id,
                signature: resp.razorpay_signature,
                courseId: course.id,
              },
            });
            setPurchased(true);
            toast.success("Course unlocked!", { description: "You now have unlimited access." });
          } catch (e: any) {
            toast.error(e?.message ?? "Verification failed");
          }
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      });
      rzp.on("payment.failed", (resp: any) => {
        toast.error("Payment failed", { description: resp?.error?.description });
      });
      rzp.open();
    } catch (e: any) {
      toast.error(e?.message ?? "Could not start payment");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
      <Link to="/courses" className="text-sm text-muted-foreground hover:text-primary">← All courses</Link>

      <div className="mt-6 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-2xl overflow-hidden glass-strong shadow-elegant">
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
              <button onClick={handlePlay} className="absolute inset-0 grid place-items-center group">
                <span className="size-20 rounded-full bg-[var(--gradient-gold)] text-gold-foreground grid place-items-center shadow-glow group-hover:scale-110 transition-smooth">
                  <PlayCircle className="size-10" />
                </span>
              </button>
            )}

            {locked && (
              <div className="absolute inset-0 grid place-items-center p-6">
                <div className="glass-strong rounded-2xl p-8 max-w-sm text-center shadow-elegant">
                  <div className="size-14 mx-auto rounded-full bg-[var(--gradient-gold)] text-gold-foreground grid place-items-center">
                    <Lock className="size-6" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl">Free views exhausted</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You have used your 4 free views. Purchase this course to continue.
                  </p>
                  <Button
                    onClick={handlePurchase}
                    disabled={paying}
                    className="mt-5 w-full bg-[var(--gradient-gold)] text-gold-foreground hover:opacity-90 shadow-glow"
                  >
                    {paying ? "Opening checkout…" : `Buy Now — ₹${course.price}`}
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

          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">{course.code} · Semester {course.semester}</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl">{course.title}</h1>
            <p className="mt-3 text-muted-foreground">Taught by {course.instructor}</p>
            <p className="mt-6 text-foreground/85 leading-relaxed">{course.description}</p>
          </div>

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

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="glass rounded-2xl p-7 shadow-elegant">
            <div className={`aspect-video rounded-xl bg-gradient-to-br ${course.accent} grid place-items-center mb-6`}>
              <PlayCircle className="size-12 text-foreground/70" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl text-gradient-gold">₹{course.price}</span>
              <span className="text-sm text-muted-foreground line-through">₹{course.price + 500}</span>
            </div>
            {purchased ? (
              <Button disabled className="mt-5 w-full">Owned ✓</Button>
            ) : (
              <Button onClick={handlePurchase} disabled={paying} className="mt-5 w-full bg-[var(--gradient-gold)] text-gold-foreground hover:opacity-90 shadow-glow">
                {paying ? "Opening checkout…" : "Buy now"}
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
