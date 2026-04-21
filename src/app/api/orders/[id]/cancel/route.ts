import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma/prisma";
import { getTokenFromRequest } from "@/shared/api/get-token";
import { sendMail } from "@/shared/server-actions/mail/mailer";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const decoded = getTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { user: { select: { email: true, name: true } } },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (order.userId !== decoded.sub) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (order.status !== "PENDING" && order.status !== "IN_PROGRESS") {
      return NextResponse.json(
        { message: "Only pending or in-progress orders can be cancelled" },
        { status: 400 },
      );
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    try {
      const shortId = order.id.split("-")[0];

      await sendMail({
        to: "carryme.support@gmail.com",
        subject: `Order Cancelled by User: #${shortId}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #ef4444;">Order Cancelled by User</h2>
            <p><strong>Order ID:</strong> #${shortId}</p>
            <p><strong>User:</strong> ${order.user.name} (${order.user.email})</p>
            <p><strong>Service:</strong> ${order.service}</p>
            <p><strong>From:</strong> ${order.currentValue} &rarr; <strong>To:</strong> ${order.desiredValue}</p>
            <p><strong>Total:</strong> &euro;${order.total}</p>
            <p><strong>Previous Status:</strong> ${order.status}</p>
          </div>
        `,
      });

      if (order.user.email) {
        await sendMail({
          to: order.user.email,
          subject: `Order #${shortId} Cancelled`,
          html: `
            <div style="font-family: 'Inter', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0e16; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #1f2330;">
              <div style="background: linear-gradient(135deg, #ef4444, #dc2626); padding: 40px 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -1px; color: #ffffff; text-transform: uppercase;">CarryMe</h1>
                <p style="margin: 10px 0 0; color: rgba(255,255,255,0.8); font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Order Cancelled</p>
              </div>
              <div style="padding: 40px 30px;">
                <h2 style="margin: 0 0 20px; font-size: 20px; font-weight: 700;">Hello, ${order.user.name}!</h2>
                <p style="margin: 0 0 30px; line-height: 1.6; color: #9ca3af; font-size: 15px;">
                  Your order <strong style="color: #ffffff;">#${shortId}</strong> for <strong style="color: #ffffff;">${order.service}</strong> has been cancelled as requested.
                </p>
                <div style="background-color: #161b28; border: 1px solid #2d3446; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                  <table style="width: 100%; table-layout: fixed;">
                    <tr>
                      <td><span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: bold;">Service</span><div style="color: #ffffff; font-weight: 600; margin-top: 5px;">${order.service}</div></td>
                      <td><span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: bold;">Total</span><div style="color: #ffffff; font-size: 18px; font-weight: 800; margin-top: 5px;">&euro;${order.total}</div></td>
                    </tr>
                  </table>
                </div>
                <p style="margin: 0 0 30px; line-height: 1.6; color: #9ca3af; font-size: 14px;">
                  If you have any questions about refunds or need assistance, please reach out to our support team.
                </p>
                <div style="text-align: center;">
                  <a href="https://discord.gg/XzMFHxdpJP" style="display: inline-block; background-color: #5865F2; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Contact Support on Discord</a>
                </div>
              </div>
              <div style="background-color: #080a0f; padding: 20px; text-align: center; border-top: 1px solid #1f2330;">
                <p style="margin: 0; color: #4b5563; font-size: 12px;">&copy; 2026 CarryMe Boost. All rights reserved.</p>
              </div>
            </div>
          `,
        });
      }
    } catch (mailError) {
      console.error("Failed to send cancellation emails:", mailError);
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Cancel order error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
