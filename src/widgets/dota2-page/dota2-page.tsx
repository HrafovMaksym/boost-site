import { Container, SectionTitle } from "@/shared/ui";
import { GAMES } from "@/entities/games";
import { HeroSection } from "@/features/hero-section/hero-section";
import { ServiceCard } from "@/features/service-card/service-card";
import { FeaturesSection } from "@/features/features-section/features-section";
import { OrderForm } from "@/features/order-form/order-form";
import { DOTA2_MMR_CONFIG } from "@/features/order-form/configs";

const DOTA_MEDALS = [
  "Herald",
  "Guardian",
  "Crusader",
  "Archon",
  "Legend",
  "Ancient",
  "Divine",
  "Immortal",
];

export function Dota2Page() {
  const dota2 = GAMES.find((g) => g.slug === "dota2")!;

  return (
    <>
      <HeroSection
        title="Dota 2"
        gradientTitle="Boosting"
        subtitle={dota2.description}
        ctaText="Configure Boost"
        ctaHref="#order"
        secondaryCtaText="Back to Home"
        secondaryCtaHref="/"
      />

      <section id="services" className="py-20 md:py-28 bg-bg-secondary">
        <Container>
          <SectionTitle
            title="Dota 2 Services"
            subtitle="Comprehensive boosting and coaching services for all skill levels."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dota2.services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section id="order" className="py-20 md:py-28">
        <Container>
          <SectionTitle
            title="Configure Your Boost"
            subtitle="Set your current and desired MMR to get started."
          />
          <div className="max-w-3xl mx-auto">
            <OrderForm config={DOTA2_MMR_CONFIG} />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-secondary">
        <Container>
          <SectionTitle
            title="Medal Ranks"
            subtitle="We boost through all Dota 2 medal tiers. From Herald to Immortal."
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {DOTA_MEDALS.map((medal, index) => (
              <div
                key={medal}
                className="p-5 rounded-[var(--radius-lg)] bg-bg-card border border-border hover:border-border-hover transition-all duration-300 text-center hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
              >
                <div className="text-3xl mb-2">
                  {["\uD83D\uDEE1\uFE0F", "\u2694\uFE0F", "\uD83D\uDDE1\uFE0F", "\uD83C\uDFF9", "\uD83D\uDD2E", "\uD83D\uDC51", "\uD83D\uDCAB", "\uD83C\uDF1F"][index]}
                </div>
                <h3 className="font-semibold text-text-primary text-sm">
                  {medal}
                </h3>
                <p className="text-text-muted text-xs mt-1">
                  {index === 7 ? "Top 1%" : `Tier ${index + 1}`}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FeaturesSection />
    </>
  );
}
