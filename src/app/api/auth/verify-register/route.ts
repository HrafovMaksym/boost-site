import prisma from "@/shared/lib/prisma/prisma";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { randomUUID } from "crypto";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ message: "Missing token" }, { status: 400 });
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { message: "Token is invalid or expired" },
        { status: 400 },
      );
    }

    if (
      verificationToken.expiresAt &&
      verificationToken.expiresAt < new Date()
    ) {
      return NextResponse.json(
        { message: "Token has expired" },
        { status: 400 },
      );
    }

    const user = verificationToken.user;

    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    const payload = { sub: user.id, email: user.email };

    const accessToken = sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    const refreshToken = randomUUID();
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: refreshExpiresAt,
      },
    });

    const response = NextResponse.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
      path: "/",
    });

    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
