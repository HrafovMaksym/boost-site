import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma/prisma";
import { getTokenFromRequest } from "@/shared/api/get-token";
import { sendMail } from "@/shared/server-actions/mail/mailer";

const STATUS_CONFIG: Record<string, { label: string; color: string; gradient: string }> = {
  PENDING: { label: "Pending", color: "#eab308", gradient: "linear-gradient(135deg, #eab308, #ca8a04)" },
  IN_PROGRESS: { label: "In Progress", color: "#3b82f6", gradient: "linear-gradient(135deg, #3b82f6, #2563eb)" },
  COMPLETED: { label: "Completed", color: "#22c55e", gradient: "linear-gradient(135deg, #22c55e, #16a34a)" },
  CANCELLED: { label: "Cancelled", color: "#ef4444", gradient: "linear-gradient(135deg, #ef4444, #dc2626)" },
};

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const decoded = getTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const admin = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: { role: true },
    });

    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status, startedAt, completedAt } = body;

    const data: Record<string, unknown> = {};
    if (status) data.status = status;
    if (startedAt !== undefined) data.startedAt = startedAt ? new Date(startedAt) : null;
    if (completedAt !== undefined) data.completedAt = completedAt ? new Date(completedAt) : null;

    const order = await prisma.order.update({
      where: { id },
      data,
      include: { user: { select: { name: true, email: true } } },
    });

    if (status && order.user.email) {
      try {
        const shortId = order.id.split("-")[0];
        const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;

        let statusMessage = "";
        if (status === "IN_PROGRESS") {
          statusMessage = "Our professional boosters have started working on your order. You can track the progress from your dashboard.";
        } else if (status === "COMPLETED") {
          statusMessage = "Your boost has been successfully completed! Thank you for choosing CarryMe. We hope you enjoy your new rank!";
        } else if (status === "CANCELLED") {
          statusMessage = "Your order has been cancelled. If you have any questions, please contact our support team.";
        } else {
          statusMessage = "Your order status has been updated. Check your dashboard for details.";
        }

        await sendMail({
          to: order.user.email,
          subject: `Order #${shortId} — ${cfg.label}`,
          html: `
            <div style="font-family: 'Inter', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0e16; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #1f2330;">
              <div style="background: ${cfg.gradient}; padding: 40px 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -1px; color: #ffffff; text-transform: uppercase;">CarryMe</h1>
                <p style="margin: 10px 0 0; color: rgba(255,255,255,0.8); font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Order ${cfg.label}</p>
              </div>
              <div style="padding: 40px 30px;">
                <h2 style="margin: 0 0 20px; font-size: 20px; font-weight: 700;">Hello, ${order.user.name}!</h2>
                <p style="margin: 0 0 30px; line-height: 1.6; color: #9ca3af; font-size: 15px;">${statusMessage}</p>
                <div style="background-color: #161b28; border: 1px solid #2d3446; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                  <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: bold;">Order ID</span>
                    <div style="color: #ffffff; font-weight: 600; font-family: monospace; margin-top: 5px;">#${shortId}</div>
                  </div>
                  <table style="width: 100%; table-layout: fixed;">
                    <tr>
                      <td>
                        <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: bold;">Service</span>
                        <div style="color: #ffffff; font-weight: 600; margin-top: 5px;">${order.service}</div>
                      </td>
                      <td>
                        <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: bold;">Status</span>
                        <div style="color: ${cfg.color}; font-size: 16px; font-weight: 800; margin-top: 5px;">${cfg.label}</div>
                      </td>
                    </tr>
                  </table>
                </div>
                <div style="text-align: center;">
                  <a href="https://carryme.cc/profile/orders" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">View Dashboard</a>
                  <a href="https://discord.gg/6ZzycFAbRr" style="display: inline-block; background-color: #5865F2; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-left: 12px; margin-top: 10px;">Join Discord</a>
                </div>
              </div>
              <div style="background-color: #080a0f; padding: 20px; text-align: center; border-top: 1px solid #1f2330;">
                <p style="margin: 0; color: #4b5563; font-size: 12px;">&copy; 2026 CarryMe Boost. All rights reserved.</p>
              </div>
            </div>
          `,
        });
      } catch (mailError) {
        console.error("Failed to send status update email:", mailError);
      }
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Admin order update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
