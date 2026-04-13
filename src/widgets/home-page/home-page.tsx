import { Container, SectionTitle } from "@/shared/ui";
import { GAMES } from "@/entities/games";
import { HeroSection } from "@/features/hero-section/ui/hero-section";
import { StatsSection } from "@/features/stats-section/ui/stats-section";
import { FeaturesSection } from "@/features/features-section/ui/features-section";
import { GameCard } from "@/features/game-card/ui/game-card";
import { HowItWorks } from "@/features/how-works/ui/how-it-works";

export function HomePage() {
  return (
    <>
      <HeroSection
        title="Level Up Your"
        gradientTitle="Game"
        subtitle="Professional boosting services for CS2, Dota 2, and Valorant. Fast, safe, and affordable — powered by top-tier players."
        ctaText="Browse Services"
        ctaHref="/cs2"
        secondaryCtaText="How It Works"
        secondaryCtaHref="#how-it-works"
      />

      <StatsSection />

      <section className="py-20 md:py-28">
        <Container>
          <SectionTitle
            title="Our Games"
            subtitle="Choose your game and start climbing the ranks today."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GAMES.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </Container>
      </section>

      <div id="how-it-works" className="scroll-mt-[var(--header-height)]">
        <HowItWorks />
      </div>

      <FeaturesSection />
    </>
  );
}
