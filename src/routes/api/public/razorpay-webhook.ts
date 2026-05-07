import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const Route = createFileRoute("/api/public/razorpay-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!secret) return new Response("server misconfigured", { status: 500 });

        const signature = request.headers.get("x-razorpay-signature");
        const body = await request.text();
        if (!signature) return new Response("missing signature", { status: 401 });

        const expected = createHmac("sha256", secret).update(body).digest("hex");
        const a = Buffer.from(signature);
        const b = Buffer.from(expected);
        if (a.length !== b.length || !timingSafeEqual(a, b)) {
          return new Response("invalid signature", { status: 401 });
        }

        let payload: any;
        try { payload = JSON.parse(body); } catch { return new Response("bad json", { status: 400 }); }

        const event = payload.event as string;
        if (event === "payment.captured" || event === "order.paid") {
          const payment = payload.payload?.payment?.entity;
          const orderId = payment?.order_id;
          const paymentId = payment?.id;
          const notes = payment?.notes ?? {};
          if (!orderId) return new Response("ok"); // nothing to do

          const update: any = { status: "paid", razorpay_payment_id: paymentId };
          const { error, data } = await supabaseAdmin
            .from("purchases")
            .update(update)
            .eq("razorpay_order_id", orderId)
            .select("id");

          if (error) {
            console.error("webhook update failed", error);
            return new Response("db error", { status: 500 });
          }

          // Fallback insert if no row existed (e.g. race)
          if ((!data || data.length === 0) && notes.user_id && notes.course_id) {
            await supabaseAdmin.from("purchases").insert({
              user_id: notes.user_id,
              course_id: notes.course_id,
              razorpay_order_id: orderId,
              razorpay_payment_id: paymentId,
              amount: Math.round((payment.amount ?? 0) / 100),
              currency: payment.currency ?? "INR",
              status: "paid",
            });
          }
        }

        return new Response("ok");
      },
    },
  },
});
