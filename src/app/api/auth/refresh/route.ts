import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import prisma from "@/shared/lib/prisma/prisma";

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") ?? "";
    const cookies = Object.fromEntries(
      cookieHeader
        .split("; ")
        .filter(Boolean)
        .map((c) => {
          const [key, ...rest] = c.split("=");
          return [key, rest.join("=")];
        }),
    );
    const refreshToken = cookies["refresh_token"];

    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token" },
        { status: 401 },
      );
    }

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (
      !storedToken ||
      storedToken.revokedAt ||
      storedToken.expiresAt < new Date()
    ) {
      return NextResponse.json(
        { message: "Invalid or expired refresh token" },
        { status: 401 },
      );
    }

    const accessToken = sign(
      { sub: storedToken.user.id, email: storedToken.user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" },
    );

    const response = NextResponse.json({ accessToken });

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
