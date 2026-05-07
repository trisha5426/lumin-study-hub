import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Lumin" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/courses`,
        data: { display_name: name },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created!", { description: "Check your inbox to verify your email." });
    navigate({ to: "/login" });
  };

  return (
    <div className="container mx-auto px-4 py-20 md:py-28 grid place-items-center">
      <div className="w-full max-w-md glass rounded-3xl p-8 md:p-10 shadow-elegant">
        <div className="text-center">
          <span className="inline-grid place-items-center size-12 rounded-xl bg-[var(--gradient-gold)] text-gold-foreground shadow-glow">
            <Scale className="size-5" />
          </span>
          <h1 className="mt-4 font-display text-3xl">Join Lumin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Free to start. 4 free views per course.</p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 h-11 bg-background/40" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 h-11 bg-background/40" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 h-11 bg-background/40" />
          </div>
          <Button disabled={loading} className="w-full bg-[var(--gradient-gold)] text-gold-foreground hover:opacity-90 shadow-glow h-11">
            {loading ? "Creating…" : "Create account"}
          </Button>
        </form>
        <p className="mt-6 text-sm text-center text-muted-foreground">
          Already a member? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
