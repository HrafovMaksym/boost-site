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

  if (!token) return null;

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as SessionPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  redirect("/");
}
