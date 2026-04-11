import { Container, SectionTitle } from "@/shared/ui";
import { GAMES } from "@/shared/config/games";
import { HeroSection } from "@/widgets/HeroSection/HeroSection";
import { StatsSection } from "@/widgets/StatsSection/StatsSection";
import { FeaturesSection } from "@/widgets/FeaturesSection/FeaturesSection";
import { GameCard } from "@/widgets/GameCard/GameCard";
import { HowItWorks } from "@/widgets/HowItWorks/HowItWorks";

export default function HomePage() {
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

      {/* Games Section */}
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

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <FeaturesSection />
    </>
  );
}
