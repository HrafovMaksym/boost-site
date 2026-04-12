import { CS2CoachingPage } from "@/widgets/cs2-coaching-page/cs2-coaching-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CS2 Coaching — BoostPro",
  description:
    "Professional CS2 coaching from top players. 1-on-1 sessions, demo reviews, strategy coaching, and aim training.",
};

export default function Page() {
  return <CS2CoachingPage />;
}
