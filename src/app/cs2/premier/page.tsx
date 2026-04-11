import { Container, SectionTitle } from "@/shared/ui";
import { HeroSection } from "@/widgets/HeroSection/HeroSection";
import { OrderForm } from "@/widgets/OrderForm/OrderForm";
import { CS2_PREMIER_CONFIG } from "@/widgets/OrderForm/configs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premier Boost — CS2 — BoostPro",
  description:
    "Professional CS2 Premier rating boost. Increase your rating with consistent wins from our expert players.",
};

export default function PremierPage() {
  return (
    <>
      <HeroSection
        title="Premier"
        gradientTitle="Rating Boost"
        subtitle="Increase your CS2 Premier rating with our professional players. Solo queue or duo queue options available."
        ctaText="Configure Boost"
        ctaHref="#order"
        secondaryCtaText="Back to CS2"
        secondaryCtaHref="/cs2"
      />

      {/* Order form */}
      <section id="order" className="py-20 md:py-28 bg-bg-secondary">
        <Container>
          <div className="max-w-3xl mx-auto">
            <OrderForm config={CS2_PREMIER_CONFIG} />
          </div>
        </Container>
      </section>

      {/* Premier advantages */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionTitle
              title="Premier Boost Advantages"
              subtitle="Our Premier boost service is designed for maximum efficiency and safety."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: "🎮",
                  title: "Solo or Duo Queue",
                  desc: "Play alongside our booster or let them handle it solo — your choice.",
                },
                {
                  icon: "📈",
                  title: "Rating Guarantee",
                  desc: "We guarantee the exact rating you ordered. No shortcuts.",
                },
                {
                  icon: "🔒",
                  title: "Full Account Security",
                  desc: "VPN protection, offline mode, and secure account handling.",
                },
                {
                  icon: "⏱️",
                  title: "Fast Completion",
                  desc: "Most orders completed within 24-72 hours depending on rating gap.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-[var(--radius-lg)] bg-bg-card border border-border"
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-text-primary mb-1">
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
