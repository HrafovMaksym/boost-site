import { Container, SectionTitle } from "@/shared/ui";
import { HeroSection } from "@/widgets/HeroSection/HeroSection";
import { OrderForm } from "@/widgets/OrderForm/OrderForm";
import { CS2_ESEA_CONFIG } from "@/widgets/OrderForm/configs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ESEA Boost — CS2 — BoostPro",
  description:
    "Professional ESEA rank boosting from D- to A+. Improve your RWS and climb the ESEA leaderboards.",
};

export default function ESEAPage() {
  return (
    <>
      <HeroSection
        title="ESEA"
        gradientTitle="Rank Boost"
        subtitle="Climb ESEA ranks with professional players. From D- to A+, improve your RWS and dominate the leaderboards."
        ctaText="Configure Boost"
        ctaHref="#order"
        secondaryCtaText="Back to CS2"
        secondaryCtaHref="/cs2"
      />

      {/* Order form */}
      <section id="order" className="py-20 md:py-28 bg-bg-secondary">
        <Container>
          <div className="max-w-3xl mx-auto">
            <OrderForm config={CS2_ESEA_CONFIG} />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle
              title="ESEA Boost Features"
              subtitle="Professional ESEA boosting with all the extras."
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: "📊",
                  title: "RWS Improvement",
                  desc: "Our players maintain high RWS scores throughout the boost process.",
                },
                {
                  icon: "🏆",
                  title: "League Placement",
                  desc: "Get placed in higher ESEA leagues with better team opportunities.",
                },
                {
                  icon: "🎯",
                  title: "Pro Players",
                  desc: "All our ESEA boosters are experienced league players with A+ rank.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-[var(--radius-lg)] bg-bg-card border border-border"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
