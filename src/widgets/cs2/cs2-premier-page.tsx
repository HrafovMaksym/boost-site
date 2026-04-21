"use client";
import { Container } from "@/shared/ui";
import { HeroSection } from "@/features/hero-section/ui/hero-section";
import { PremiereOrderForm } from "@/features/order-form/ui/premiere-order-form";
import { BoostInfoSection } from "@/features/boost-info/ui/boost-info-section";

export function CS2PremierPage() {
  return (
    <>
      <HeroSection
        title="Premier"
        gradientTitle="Rating Boost"
        subtitle="Increase your CS2 Premier rating with our professional players. Solo queue or duo queue options available."
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
            <PremiereOrderForm />
          </div>
        </Container>
      </section>

      <BoostInfoSection
        title="Why Choose Our"
        gradientTitle="Premier Boost?"
        features={[
          "Top-rated players with 30,000+ Premier rating",
          "Consistent 75%+ win rate on all Premier orders",
          "Secure VPN protection and offline mode included",
          "Clean Play without the use of any scripts, exploits, or third-party software",
          "Full money-back guarantee if we can't make an order",
          "24/7 live support via Discord",
        ]}
        howItWorksTitle="How Premier Boost Works"
        steps={[
          { step: "1", text: "Enter your current and target Premier rating" },
          {
            step: "2",
            text: "Complete the order and share account details securely or contact us in ticket via discord",
          },
          {
            step: "3",
            text: "Our booster starts your session  as soon as possible (or by shchedule you choose)",
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
