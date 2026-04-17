import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { createHash } from "crypto";

import { sendMail } from "@/shared/server-actions/mail/mailer";
import prisma from "@/shared/lib/prisma/prisma";
import { getUrl } from "@/shared/server-actions/get-url";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({
        message: "If the email exists, a reset link has been sent.",
      });
    }

    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id, usedAt: null },
    });

    const token = uuidv4();
    const hashedToken = createHash("sha256").update(token).digest("hex");

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: hashedToken,
        expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
      },
    });
    const url = await getUrl();

    const resetUrl = `${url}/reset-password?token=${hashedToken}`;

    await sendMail({
      to: email,
      subject: "Reset your password — Carryme",
      html: `
        <div style="font-family:sans-serif;background:#080d1e;padding:40px 20px;text-align:center;">
          <div style="max-width:480px;margin:0 auto;background:#131b38;border:1px solid #1e2a4a;border-radius:20px;padding:40px;">
            <h1 style="color:#f0f0f5;font-size:24px;margin-bottom:16px;">Reset Your Password</h1>
            <p style="color:#9d9db5;font-size:15px;line-height:1.6;margin-bottom:24px;">
              Click the button below to reset your password. This link expires in 1 hour.
            </p>
            <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:12px;font-weight:600;font-size:15px;">
              Reset Password
            </a>
            <p style="color:#5c5c75;font-size:13px;margin-top:24px;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      message: "If the email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
