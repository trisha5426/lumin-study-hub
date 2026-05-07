import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — Lumin" }] }),
  component: () => (
    <div className="container mx-auto px-4 py-24 max-w-3xl prose prose-invert">
      <p className="text-xs uppercase tracking-[0.25em] text-primary">Legal</p>
      <h1 className="mt-2 font-display text-5xl">Terms of Service</h1>
      <p className="mt-6 text-muted-foreground">
        By using Lumin you agree to use the platform for personal, non-commercial educational purposes.
        Course videos may not be downloaded, recorded or redistributed. Free trial includes 4 views per course;
        unlimited access requires purchase.
      </p>
    </div>
  ),
});
