import { Container, SectionTitle } from "@/shared/ui";
import { GAMES } from "@/entities/games";
import { HeroSection } from "@/features/hero-section/hero-section";
import { ServiceCard } from "@/features/service-card/service-card";
import { FeaturesSection } from "@/features/features-section/features-section";

export function CS2Page() {
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
