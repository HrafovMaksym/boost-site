import { NextResponse } from "next/server";
import { stripe } from "@/shared/config/stripe";
import prisma from "@/shared/lib/prisma/prisma";
import { sendMail } from "@/shared/server-actions/mail/mailer";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { userId, service, currentValue, desiredValue, options, price } =
      session.metadata!;

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true },
      });

      const order = await prisma.order.create({
        data: {
          userId,
          service: service || "Faceit ELO",
          currentValue: Number(currentValue) || 0,
          desiredValue: Number(desiredValue) || 0,
          options: JSON.parse(options || "{}"),
          total: Number(price) || 0,
        },
      });

      const email = user?.email;

      try {
        await sendMail({
          to: "carryme.support@gmail.com",
          subject: `New Boost Order: ${service || "Faceit ELO"}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h2 style="color: #3b82f6;">New Order Created (Paid via Stripe)</h2>
              <p><strong>Order ID:</strong> ${order.id}</p>
              <p><strong>User Email:</strong> ${email}</p>
              <p><strong>Stripe Session:</strong> ${session.id}</p>
              <p><strong>Service:</strong> ${service || "Faceit ELO"}</p>
              <p><strong>Current Elo:</strong> ${currentValue}</p>
              <p><strong>Desired Elo:</strong> ${desiredValue}</p>
              <p><strong>Total Price:</strong> €${price}</p>
              <h3>Selected Options:</h3>
              <pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${JSON.stringify(JSON.parse(options || "{}"), null, 2)}</pre>
            </div>
          `,
        });

        if (email) {
          await sendMail({
            to: email,
            subject: `Order Confirmed: ${service || "Faceit ELO"} Boost`,
            html: `
              <div style="font-family: 'Inter', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0e16; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #1f2330;">
                <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 40px 20px; text-align: center;">
                  <h1 style="margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -1px; color: #ffffff; text-transform: uppercase;">CarryMe</h1>
                  <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.8); font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Payment Confirmed</p>
                </div>

                <div style="padding: 40px 30px; background-color: #0b0e16;">
                  <h2 style="margin: 0 0 20px; font-size: 20px; font-weight: 700; color: #ffffff;">Hello!</h2>
                  <p style="margin: 0 0 30px; line-height: 1.6; color: #9ca3af; font-size: 15px;">
                    Thank you for choosing CarryMe. Your payment has been confirmed and our professional boosters will start working on your order shortly.
                  </p>

                  <div style="background-color: #161b28; border: 1px solid #2d3446; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                    <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                      <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: bold;">Order ID</span>
                      <div style="color: #ffffff; font-weight: 600; font-family: monospace; margin-top: 5px;">#${order.id.split("-")[0]}</div>
                    </div>

                    <table style="width: 100%; margin-bottom: 15px; table-layout: fixed;">
                      <tr>
                        <td>
                          <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: bold;">Current Elo</span>
                          <div style="color: #ffffff; font-size: 18px; font-weight: 800; margin-top: 5px;">${currentValue}</div>
                        </td>
                        <td>
                          <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: bold;">Target Elo</span>
                          <div style="color: #3b82f6; font-size: 18px; font-weight: 800; margin-top: 5px;">${desiredValue}</div>
                        </td>
                      </tr>
                    </table>

                    <div>
                      <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: bold;">Total Paid</span>
                      <div style="color: #22c55e; font-size: 22px; font-weight: 900; margin-top: 5px;">€${price}</div>
                    </div>
                  </div>

                  <div style="text-align: center;">
                    <a href="https://carryme.cc/profile/orders" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">View Dashboard</a>
                  </div>
                </div>

                <div style="background-color: #080a0f; padding: 20px; text-align: center; border-top: 1px solid #1f2330;">
                  <p style="margin: 0; color: #4b5563; font-size: 12px;">© 2026 CarryMe Boost. All rights reserved.</p>
                </div>
              </div>
            `,
          });
        }
      } catch (mailError) {
        console.error("Failed to send order email:", mailError);
      }
    } catch (dbError) {
      console.error("Failed to create order:", dbError);
      return NextResponse.json(
        { error: "Failed to process order" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}
