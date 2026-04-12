import { Dota2Page } from "@/widgets/dota2-page/dota2-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dota 2 Boosting Services — BoostPro",
  description:
    "Professional Dota 2 MMR boosting, medal boost, and calibration services. Reach your desired rank safely.",
};

export default function Page() {
  return <Dota2Page />;
}
