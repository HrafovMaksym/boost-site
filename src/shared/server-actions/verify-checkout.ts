"use server";

import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import Stripe from "stripe";

export async function verifyCheckoutSession(
  sessionId: string,
): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) return false;

    const decoded = verify(token, process.env.JWT_SECRET!) as { sub: string };
    if (!decoded?.sub) return false;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.status !== "complete") return false;
    if (session.payment_status !== "paid") return false;
    if (session.metadata?.userId !== decoded.sub) return false;

    return true;
  } catch {
    return false;
  }
}
