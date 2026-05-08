import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Lumin" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-20 md:py-28 grid place-items-center">
      <div className="w-full max-w-md glass rounded-3xl p-8 md:p-10 shadow-elegant">
        <div className="text-center">
          <span className="inline-grid place-items-center size-12 rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
            <Scale className="size-5" />
          </span>
          <h1 className="mt-4 font-display text-3xl">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Continue your LL.B journey.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast("Connect Lovable Cloud to enable real authentication.");
          }}
          className="mt-8 space-y-4"
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required className="mt-1.5 h-11 bg-background/40" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required className="mt-1.5 h-11 bg-background/40" />
          </div>
          <Button className="w-full bg-gradient-brand text-primary-foreground hover:opacity-90 shadow-glow h-11">
            Login
          </Button>
        </form>
        <p className="mt-6 text-sm text-center text-muted-foreground">
          New to Lumin? <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
