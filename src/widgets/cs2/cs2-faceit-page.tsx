"use client";
import { Container } from "@/shared/ui";
import { HeroSection } from "@/features/hero-section/ui/hero-section";
import { FaceitOrderForm } from "@/features/order-form/ui/faceit-order-form";
import { BoostInfoSection } from "@/features/boost-info/ui/boost-info-section";

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

      <BoostInfoSection
        title="Why Choose Our"
        gradientTitle="Faceit Boost?"
        features={[
          "Professional players with 3000+ ELO",
          "Average 75%+ win rate across all orders",
          "VPN and offline mode for account safety",
          "Clean Play without the use of any scripts, exploits, or third-party software",
          "Money-back guarantee if we can't make an order",
          "24/7 support via Discord",
        ]}
        howItWorksTitle="How Faceit Boost Works"
        steps={[
          { step: "1", text: "Select your current and desired Faceit level" },
          {
            step: "2",
            text: "Complete the order and provide account details securely or contact us in ticket via discord",
          },
          {
            step: "3",
            text: "Our boosters starts playing as soon as possible (or by shchedule you choose)",
          },
          {
            step: "4",
            text: "Wait till boost ends and receive your boosted account",
          },
        ]}
      />
    </>
  );
}
