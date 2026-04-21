import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma/prisma";
import { sendMail } from "@/shared/server-actions/mail/mailer";
import { getTokenFromRequest } from "@/shared/api/get-token";

export async function POST(req: Request) {
  try {
    const decoded = getTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: { id: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    const { service, currentValue, desiredValue, options, price } =
      await req.json();

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        service: service || "Faceit ELO",
        currentValue: currentValue || 0,
        desiredValue: desiredValue || 0,
        options: options || {},
        total: price || 0,
      },
    });

    const email = user.email;

    try {
      // Notification to Admin/Support
      await sendMail({
        to: "carryme.support@gmail.com",
        subject: `New Boost Order: ${service || "Faceit ELO"}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #3b82f6;">New Order Created</h2>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>User Email:</strong> ${email}</p>
            <p><strong>Service:</strong> ${service || "Faceit ELO"}</p>
            <p><strong>Current Elo:</strong> ${currentValue}</p>
            <p><strong>Desired Elo:</strong> ${desiredValue}</p>
            <p><strong>Total Price:</strong> €${price}</p>
            <h3>Selected Options:</h3>
            <pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${JSON.stringify(
              options,
              null,
              2,
            )}</pre>
          </div>
        `,
      });

      // Beautiful Confirmation Email to User
      if (email) {
        await sendMail({
          to: email,
          subject: `Order Confirmed: ${service || "Faceit ELO"} Boost`,
          html: `
            <div style="font-family: 'Inter', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0e16; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #1f2330;">
              <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 40px 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -1px; color: #ffffff; text-transform: uppercase;">CarryMe</h1>
                <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.8); font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Order Confirmed</p>
              </div>
              
              <div style="padding: 40px 30px; background-color: #0b0e16;">
                <h2 style="margin: 0 0 20px; font-size: 20px; font-weight: 700; color: #ffffff;">Hello!</h2>
                <p style="margin: 0 0 30px; line-height: 1.6; color: #9ca3af; font-size: 15px;">
                  Thank you for choosing CarryMe. We have successfully received your order and our professional boosters will start working on it shortly. Here are the details of your boost:
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
                    <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: bold;">Total Price</span>
                    <div style="color: #ffffff; font-size: 22px; font-weight: 900; margin-top: 5px;">€${price}</div>
                  </div>
                </div>
                
                <p style="margin: 0 0 30px; line-height: 1.6; color: #9ca3af; font-size: 14px;">
                  You can track the progress of your order directly from your profile dashboard on our website.
                </p>
                
                <div style="text-align: center;">
                  <a href="https://carryme.cc/profile/orders" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">View Dashboard</a>
                  <a href="https://discord.gg/6ZzycFAbRr" style="display: inline-block; background-color: #5865F2; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-left: 12px; margin-top: 10px;">Join Discord</a>
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

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
export async function GET(req: Request) {
  try {
    const decoded = getTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: decoded.sub },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Order error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
