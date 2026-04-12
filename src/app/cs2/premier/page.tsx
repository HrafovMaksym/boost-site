import { CS2PremierPage } from "@/widgets/cs2-premier-page/cs2-premier-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premier Boost — CS2 — BoostPro",
  description:
    "Professional CS2 Premier rating boost. Increase your rating with consistent wins from our expert players.",
};

export default function Page() {
  return <CS2PremierPage />;
}
