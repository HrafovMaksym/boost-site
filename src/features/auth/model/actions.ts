"use server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

import { redirect } from "next/navigation";
import prisma from "@/shared/lib/prisma/prisma";

export interface SessionPayload {
  sub: string;
  email: string;
}

async function clearAuthCookies() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
  } catch {
    // cookies() may be read-only in some RSC contexts; safe to ignore
  }
}

async function resolveUserIdFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (token) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as SessionPayload;
      return decoded.sub;
    } catch {
      // access token expired/invalid — fall through to refresh check
    }
  }

  if (!refreshToken) return null;

  try {
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      select: { userId: true, revokedAt: true, expiresAt: true },
    });

    if (!storedToken) {
      // Cookie holds a token that doesn't exist in DB — clear it so the
      // proxy stops treating the user as authenticated.
      await clearAuthCookies();
      return null;
    }

    if (storedToken.revokedAt || storedToken.expiresAt <= new Date()) {
      // Stale/revoked refresh token. This happens when the rotation
      // response from /api/auth/refresh never reached the browser
      // (closed tab, network error, etc.). Clear cookies so the user is
      // routed to /login cleanly instead of being stuck in a redirect loop.
      await clearAuthCookies();
      return null;
    }

    return storedToken.userId;
  } catch (error) {
    console.error("Failed to validate refresh token", error);
    return null;
  }
}

export async function getSession() {
  const userId = await resolveUserIdFromCookies();

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

    return user;
  } catch (error) {
    return null;
  }
}

export async function verifyAdmin(): Promise<boolean> {
  const userId = await resolveUserIdFromCookies();

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
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (refreshToken) {
    try {
      await prisma.refreshToken.updateMany({
        where: { token: refreshToken, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    } catch (error) {
      console.error("Failed to revoke refresh token on logout", error);
    }
  }

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  redirect("/");
}
