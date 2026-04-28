"use server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

import { redirect } from "next/navigation";
import prisma from "@/shared/lib/prisma/prisma";

export interface SessionPayload {
  sub: string;
  email: string;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  let userId: string | null = null;

  if (token) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as SessionPayload;
      userId = decoded.sub;
    } catch {
      // access token might be expired, fallback to checking refresh token
    }
  }

  if (!userId && refreshToken) {
    console.log("access expired; Refresh still alive");

    try {
      const storedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        select: { userId: true, revokedAt: true, expiresAt: true },
      });
      if (
        storedToken &&
        !storedToken.revokedAt &&
        storedToken.expiresAt > new Date()
      ) {
        userId = storedToken.userId;
      }
    } catch (error) {
      console.error("Failed to check refresh token in getSession", error);
    }
  }

  console.log("userid", userId);

  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    console.log("user exist");
    return user;
  } catch (error) {
    return null;
  }
}

export async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  let userId: string | null = null;

  if (token) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as SessionPayload;
      userId = decoded.sub;
    } catch {
      // access token might be expired, fallback to checking refresh token
    }
  }

  if (!userId && refreshToken) {
    try {
      const storedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        select: { userId: true, revokedAt: true, expiresAt: true },
      });
      if (
        storedToken &&
        !storedToken.revokedAt &&
        storedToken.expiresAt > new Date()
      ) {
        userId = storedToken.userId;
      }
    } catch (error) {
      console.error("Failed to check refresh token in verifyAdmin", error);
    }
  }

  if (!userId) return false;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    return user?.role === "ADMIN";
  } catch {
    return false;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  redirect("/");
}
