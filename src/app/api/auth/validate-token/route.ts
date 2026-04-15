import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { valid: false, message: "Missing token" },
        { status: 400 },
      );
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
      return NextResponse.json(
        { valid: false, message: "Token is invalid or expired" },
        { status: 400 },
      );
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Validate token error:", error);
    return NextResponse.json(
      { valid: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
