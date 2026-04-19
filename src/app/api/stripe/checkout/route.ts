import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getTokenFromRequest } from "@/shared/api/get-token";
import { validateAndCalculatePrice } from "@/shared/lib/pricing/pricing";

export async function POST(req: Request) {
  try {
    const decoded = getTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    let order;
    try {
      order = validateAndCalculatePrice(body);
    } catch (err) {
      return NextResponse.json(
        { message: err instanceof Error ? err.message : "Invalid order data" },
        { status: 400 },
      );
    }

    if (order.price <= 0) {
      return NextResponse.json(
        { message: "Invalid order amount" },
        { status: 400 },
      );
    }

    const clientPrice = typeof body.price === "number" ? body.price : null;
    if (clientPrice !== null && Math.abs(clientPrice - order.price) > 0.01) {
      console.warn(
        `Price mismatch: client=${clientPrice}, server=${order.price}, user=${decoded.sub}`,
      );
      return NextResponse.json(
        { message: "Price mismatch. Please refresh the page and try again." },
        { status: 400 },
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: order.service,
              description: `Boost from ${order.currentValue} to ${order.desiredValue}`,
            },
            unit_amount: Math.round(order.price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: decoded.sub,
        service: order.service,
        currentValue: String(order.currentValue),
        desiredValue: String(order.desiredValue),
        options: JSON.stringify(order.options),
        price: String(order.price),
      },
      success_url: `${process.env.WEB_SITE_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.WEB_SITE_URL}/cs2/${order.service.includes("Faceit") ? "faceit" : "premier"}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { message: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
