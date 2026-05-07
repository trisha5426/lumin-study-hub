import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { attachAuthHeader } from "@/lib/auth-client-middleware";
import { courses } from "@/data/courses";

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { courseId: string }) => {
    if (!data?.courseId || typeof data.courseId !== "string") throw new Error("courseId required");
    return data;
  })
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const course = courses.find((c) => c.id === data.courseId);
    if (!course) throw new Error("Course not found");

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) throw new Error("Razorpay keys not configured");

    // Already purchased?
    const { data: existing } = await supabaseAdmin
      .from("purchases")
      .select("id")
      .eq("user_id", userId)
      .eq("course_id", course.id)
      .eq("status", "paid")
      .maybeSingle();
    if (existing) return { alreadyPurchased: true as const };

    const amountPaise = course.price * 100;
    const auth = btoa(`${keyId}:${keySecret}`);
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt: `lumin_${course.id}_${userId.slice(0, 8)}_${Date.now()}`,
        notes: { user_id: userId, course_id: course.id },
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Razorpay order error:", text);
      throw new Error("Failed to create order");
    }
    const order = (await res.json()) as { id: string; amount: number; currency: string };

    await supabaseAdmin.from("purchases").insert({
      user_id: userId,
      course_id: course.id,
      razorpay_order_id: order.id,
      amount: course.price,
      currency: "INR",
      status: "created",
    });

    return {
      alreadyPurchased: false as const,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      courseTitle: course.title,
    };
  });

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { orderId: string; paymentId: string; signature: string; courseId: string }) => {
    if (!d?.orderId || !d?.paymentId || !d?.signature || !d?.courseId) throw new Error("invalid input");
    return d;
  })
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const keySecret = process.env.RAZORPAY_KEY_SECRET!;
    const { createHmac } = await import("crypto");
    const expected = createHmac("sha256", keySecret)
      .update(`${data.orderId}|${data.paymentId}`)
      .digest("hex");
    if (expected !== data.signature) throw new Error("Invalid signature");

    const { error } = await supabaseAdmin
      .from("purchases")
      .update({
        status: "paid",
        razorpay_payment_id: data.paymentId,
      })
      .eq("razorpay_order_id", data.orderId)
      .eq("user_id", userId);
    if (error) {
      console.error("update purchase failed", error);
      throw new Error("Could not record payment");
    }
    return { success: true };
  });

export const getMyPurchases = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("purchases")
      .select("course_id,status")
      .eq("user_id", userId)
      .eq("status", "paid");
    if (error) throw error;
    return { courseIds: (data ?? []).map((r) => r.course_id) };
  });
