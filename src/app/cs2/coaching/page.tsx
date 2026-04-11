import { Container, SectionTitle } from "@/shared/ui";
import { HeroSection } from "@/widgets/HeroSection/HeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CS2 Coaching — BoostPro",
  description:
    "Professional CS2 coaching from top players. 1-on-1 sessions, demo reviews, strategy coaching, and aim training.",
};

export default function CoachingPage() {
  return (
    <>
      <HeroSection
        title="CS2"
        gradientTitle="Coaching"
        subtitle="Learn from the best. Our professional coaches will help you improve your aim, game sense, and overall performance."
        ctaText="Learn More"
        ctaHref="#learn"
        secondaryCtaText="Back to CS2"
        secondaryCtaHref="/cs2"
      />

      {/* What you'll learn */}
      <section id="learn" className="py-20 md:py-28">
        <Container>
          <SectionTitle
            title="What You'll Learn"
            subtitle="Our coaching covers all aspects of competitive CS2."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🎯",
                title: "Aim & Mechanics",
                desc: "Crosshair placement, spray control, movement, and peeking techniques.",
              },
              {
                icon: "🧠",
                title: "Game Sense",
                desc: "Positioning, rotations, reading the enemy, and information usage.",
              },
              {
                icon: "📋",
                title: "Strategy & Tactics",
                desc: "Execute setups, default plays, post-plant positions, and team coordination.",
              },
              {
                icon: "💪",
                title: "Mental Game",
                desc: "Tilt management, confidence building, and consistent performance under pressure.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-[var(--radius-lg)] bg-bg-card border border-border hover:border-border-hover transition-all duration-300"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
