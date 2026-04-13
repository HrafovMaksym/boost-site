import { CS2FaceitPage } from "@/widgets/cs2/cs2-faceit-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faceit Boost — CS2 — BoostPro",
  description:
    "Professional Faceit level boosting from Level 1 to Level 10. High win rate, fast completion, live streaming available.",
};

export default function Page() {
  return <CS2FaceitPage />;
}
