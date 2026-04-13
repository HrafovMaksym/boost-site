"use client";
import { useRouter } from "next/navigation";
import React from "react";

export const ButtonBack = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="bg-[#d8d8d843]  dark:bg-black/20 border border-gray-300  text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] cursor-pointer px-3 py-1 rounded-lg"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
};
