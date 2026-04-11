import { Container, SectionTitle } from "@/shared/ui";
import { GAMES } from "@/shared/config/games";
import { HeroSection } from "@/widgets/HeroSection/HeroSection";
import { ServiceCard } from "@/widgets/ServiceCard/ServiceCard";
import { FeaturesSection } from "@/widgets/FeaturesSection/FeaturesSection";
import { OrderForm } from "@/widgets/OrderForm/OrderForm";
import { VALORANT_RANK_CONFIG } from "@/widgets/OrderForm/configs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Valorant Boosting Services — BoostPro",
  description:
    "Professional Valorant rank boosting. From Iron to Radiant with our top-tier players. Fast, safe, affordable.",
};

const VALORANT_RANKS = [
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Ascendant",
  "Immortal",
  "Radiant",
];

export default function ValorantPage() {
  const valorant = GAMES.find((g) => g.slug === "valorant")!;

  return (
    <>
      <HeroSection
        title="Valorant"
        gradientTitle="Boosting"
        subtitle={valorant.description}
        ctaText="Configure Boost"
        ctaHref="#order"
        secondaryCtaText="Back to Home"
        secondaryCtaHref="/"
      />

      {/* Services */}
      <section id="services" className="py-20 md:py-28 bg-bg-secondary">
        <Container>
          <SectionTitle
            title="Valorant Services"
            subtitle="Professional rank boosting, placement matches, and win boost services."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valorant.services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* Order form */}
      <section id="order" className="py-20 md:py-28">
        <Container>
          <SectionTitle
            title="Configure Your Boost"
            subtitle="Select your current and desired rank to get started."
          />
          <div className="max-w-3xl mx-auto">
            <OrderForm config={VALORANT_RANK_CONFIG} />
          </div>
        </Container>
      </section>

      {/* Rank progression */}
      <section className="py-20 md:py-28 bg-bg-secondary">
        <Container>
          <SectionTitle
            title="Valorant Ranks"
            subtitle="We boost through all Valorant competitive tiers."
          />

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-9 gap-3 md:gap-4">
            {VALORANT_RANKS.map((rank, index) => (
              <div
                key={rank}
                className="p-4 rounded-[var(--radius-md)] bg-bg-card border border-border hover:border-border-hover transition-all duration-300 text-center hover:-translate-y-1"
              >
                <div className="text-2xl mb-2">
                  {
                    ["⬜", "🟫", "⬛", "🟨", "🟦", "💎", "🟣", "🔴", "👑"][
                      index
                    ]
                  }
                </div>
                <h3 className="font-semibold text-text-primary text-xs md:text-sm">
                  {rank}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FeaturesSection />
    </>
  );
}
