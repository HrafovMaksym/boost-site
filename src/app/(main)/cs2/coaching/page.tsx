import { CS2CoachingPage } from "@/widgets/cs2/cs2-coaching-page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "CS2 Coaching — CarryMe",
  description:
    "Professional CS2 coaching from top players. 1-on-1 sessions, demo reviews, strategy coaching, and aim training.",
};

export default function Page() {
  return notFound();
  return <CS2CoachingPage />;
}
