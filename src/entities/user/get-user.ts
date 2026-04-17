"use server";

import { getSession } from "@/features/auth/model/actions";
import { User } from "./types";

export async function getUser(): Promise<User | null> {
  try {
    const session = await getSession();
    if (!session) return null;

    return {
      id: session.id,
      email: session.email,
      name: session.name,
      role: session.role,
      createdAt: session.createdAt,
    };
  } catch (error) {
    console.error(
      "Error fetching user:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}
