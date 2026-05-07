import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/careers")({
  head: () => ({ meta: [{ title: "Careers — Lumin" }] }),
  component: () => (
    <div className="container mx-auto px-4 py-24 max-w-2xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary">Careers</p>
      <h1 className="mt-2 font-display text-5xl">Build Lumin with us.</h1>
      <p className="mt-4 text-muted-foreground">
        We're a small team obsessed with legal education in India. Roles in content, video and engineering open soon.
        Write to us at <a href="mailto:lumin9279@gmail.com" className="text-primary hover:underline">lumin9279@gmail.com</a>.
      </p>
    </div>
  ),
});
