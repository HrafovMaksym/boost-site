"use client";
import { Container } from "@/shared/ui";
import { HeroSection } from "@/features/hero-section/ui/hero-section";
import { FaceitOrderForm } from "@/features/order-form/ui/faceit-order-form";

export function CS2FaceitPage() {
  return (
    <>
      <HeroSection
        title="Faceit"
        gradientTitle="Boost"
        subtitle="Level up your Faceit account with our professional players. From Level 1 to Level 10 with high win rates and full account security."
        ctaText="Configure Boost"
        ctaHref="#order"
        secondaryCtaText="Back to CS2"
        secondaryCtaHref="/cs2"
      />

      <section
        id="order"
        className="py-20 md:py-28 bg-bg-secondary overflow-hidden"
      >
        <Container>
          <div className="w-full">
            <FaceitOrderForm />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Our{" "}
                <span className="gradient-text">Faceit Boost?</span>
              </h2>
              <div className="space-y-4">
                {[
                  "Professional players with 3000+ ELO",
                  "Average 85%+ win rate across all orders",
                  "Live stream available on request",
                  "VPN and offline mode for account safety",
                  "Money-back guarantee if we can't deliver",
                  "24/7 support via Discord and Telegram",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-text-secondary"
                  >
                    <span className="text-accent-primary mt-0.5 shrink-0">
                      &#10003;
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[var(--radius-lg)] bg-bg-card border border-border">
              <h3 className="text-xl font-bold text-text-primary mb-4">
                How Faceit Boost Works
              </h3>
              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    text: "Select your current and desired Faceit level",
                  },
                  {
                    step: "2",
                    text: "Complete the order and provide account details securely",
                  },
                  {
                    step: "3",
                    text: "Our pro starts playing within 15 minutes",
                  },
                  {
                    step: "4",
                    text: "Track progress live and receive your boosted account",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-accent-primary">
                        {item.step}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm pt-1">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
