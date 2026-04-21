"use client";

import { Container } from "@/shared/ui";
import { HeroSection } from "@/features/hero-section/ui/hero-section";
import { CoachOrderForm } from "@/features/order-form/ui/coach-order-form";
import { BoostInfoSection } from "@/features/boost-info/ui/boost-info-section";

export function CS2CoachingPage() {
  return (
    <>
      <HeroSection
        title="CS2"
        gradientTitle="Coaching"
        subtitle="Learn from the best. Our professional coaches will help you improve your aim, game sense, and overall performance."
        ctaText="Configure Coaching"
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
            <CoachOrderForm />
          </div>
        </Container>
      </section>

      <BoostInfoSection
        title="Why Choose Our"
        gradientTitle="Pro Coaching?"
        features={[
          "Verified professional coaches with competitive experience",
          "1-on-1 personalized sessions tailored to your skill level",
          "Detailed written reports after every session",
          "Demo review, live coaching, and strategy breakdowns",
          "Flexible scheduling to fit your timezone",
          "24/7 live support via Discord",
        ]}
        howItWorksTitle="How Coaching Works"
        steps={[
          { step: "1", text: "Select the number of coaching sessions you need" },
          {
            step: "2",
            text: "Choose your extras and complete the payment",
          },
          {
            step: "3",
            text: "We match you with a coach and schedule your first session",
          },
          {
            step: "4",
            text: "Join the session, learn, and receive your written report",
          },
        ]}
      />
    </>
  );
}
