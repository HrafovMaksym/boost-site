import { Container, SectionTitle } from "@/shared/ui";
import { HeroSection } from "@/features/hero-section/hero-section";
import { OrderForm } from "@/features/order-form/order-form";
import { CS2_ESEA_CONFIG } from "@/features/order-form/configs";

export function CS2EseaPage() {
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
                  icon: "\uD83D\uDCCA",
                  title: "RWS Improvement",
                  desc: "Our players maintain high RWS scores throughout the boost process.",
                },
                {
                  icon: "\uD83C\uDFC6",
                  title: "League Placement",
                  desc: "Get placed in higher ESEA leagues with better team opportunities.",
                },
                {
                  icon: "\uD83C\uDFAF",
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
