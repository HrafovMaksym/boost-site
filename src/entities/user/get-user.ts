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
    if (error instanceof Error) {
      const isDynamicServerError =
        error.message.includes("Dynamic server usage") ||
        (error as { digest?: string }).digest === "DYNAMIC_SERVER_USAGE";

      if (isDynamicServerError) {
        throw error;
      }
    }

    console.error(
      "Error fetching user:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}
