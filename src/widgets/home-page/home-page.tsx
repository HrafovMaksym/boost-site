import { Container, SectionTitle, FadeIn } from "@/shared/ui";
import { GAMES } from "@/entities/games";
import { HeroSection } from "@/features/hero-section/ui/hero-section";
import { FeaturesSection } from "@/features/features-section/ui/features-section";
import { GameCard } from "@/features/game-card/ui/game-card";
import { HowItWorks } from "@/features/how-works/ui/how-it-works";
import { DiscordCTA } from "@/features/discord-cta/ui/discord-cta";
import { PaymentMarquee } from "@/features/payment-marquee/ui/payment-marquee";

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

      <section className="py-20 md:py-28 border-y border-border">
        <Container>
          <FadeIn>
            <SectionTitle
              title="Our Games"
              subtitle="Choose your game and start climbing the ranks today."
            />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GAMES.map((game, index) => (
              <FadeIn key={game.slug} delay={index * 0.15}>
                <GameCard
                  game={game}
                  isComingSoon={["dota2", "valorant"].includes(game.slug)}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <div id="how-it-works" className="scroll-mt-[var(--header-height)]">
        <HowItWorks />
      </div>

      <FeaturesSection />

      <PaymentMarquee />

      <DiscordCTA />
    </>
  );
}
