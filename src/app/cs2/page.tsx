import { Container, SectionTitle } from "@/shared/ui";
import { GAMES } from "@/shared/config/games";
import { HeroSection } from "@/widgets/HeroSection/HeroSection";
import { ServiceCard } from "@/widgets/ServiceCard/ServiceCard";
import { FeaturesSection } from "@/widgets/FeaturesSection/FeaturesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CS2 Boosting Services — BoostPro",
  description:
    "Professional CS2 boosting: Faceit, Premier, ESEA rank boost and personal coaching from top players.",
};

export default function CS2Page() {
  const cs2 = GAMES.find((g) => g.slug === "cs2")!;

  return (
    <>
      <HeroSection
        title="CS2"
        gradientTitle="Boosting"
        subtitle={cs2.description}
        ctaText="View Services"
        ctaHref="#services"
      />

      {/* Services */}
      <section id="services" className="py-20 md:py-28 bg-bg-secondary">
        <Container>
          <SectionTitle
            title="CS2 Services"
            subtitle="Choose the service that fits your needs. All services include account safety guarantees."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cs2.services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <FeaturesSection />
    </>
  );
}
