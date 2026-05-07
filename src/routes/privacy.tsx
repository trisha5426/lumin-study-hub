import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Lumin" }] }),
  component: () => (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary">Legal</p>
      <h1 className="mt-2 font-display text-5xl">Privacy Policy</h1>
      <p className="mt-6 text-muted-foreground">
        We collect only the information needed to deliver your courses — name, email and watch progress.
        We never sell your data. Payments are processed securely by Razorpay.
      </p>
    </div>
  ),
});
