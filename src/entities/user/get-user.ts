"use server";

import { User } from "./types";
import { serverFetch, ServerFetchError } from "@/shared/api/server-fetch";

export async function getUser(): Promise<User | null> {
  try {
    return null;
    // return await serverFetch<User>("/auth/me");
  } catch (error) {
    if (error instanceof ServerFetchError && error.status === 401) {
      return null;
    }
    console.error(
      "Error fetching user:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}
