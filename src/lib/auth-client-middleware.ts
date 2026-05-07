import { createMiddleware } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

// Attaches the current Supabase session bearer token to every server-fn request
// from the client, so requireSupabaseAuth can validate the user.
export const attachAuthHeader = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  }
);
