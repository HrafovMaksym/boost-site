"use client";

import { Container, SectionTitle, FadeIn } from "@/shared/ui";
import Link from "next/link";

export function TermsPage() {
  return (
    <section className="min-h-screen py-20 md:py-28 bg-bg-primary">
      <Container>
        <FadeIn>
          <SectionTitle
            title="Terms and Conditions"
            subtitle="Last updated: April 16, 2026"
            centered
          />
        </FadeIn>

        <div className="max-w-4xl mx-auto mt-12">
          <FadeIn delay={0.1}>
            <div className="bg-bg-card/30 border border-border rounded-[var(--radius-lg)] p-6 md:p-10 backdrop-blur-sm shadow-xl">
              <div className="space-y-10 text-text-secondary leading-relaxed">
                {/* Section 1 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-secondary/20 text-accent-secondary flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    Agreement to these Terms
                  </h2>
                  <div className="space-y-4">
                    <p>
                      These Terms and Conditions (hereinafter referred to as the{" "}
                      <span className="text-text-primary font-semibold">
                        “Agreement”
                      </span>
                      ) are a legally binding agreement between you, whether
                      personally or on behalf of an entity (
                      <span className="text-text-primary font-semibold">
                        &quot;Customer&quot;
                      </span>
                      , or{" "}
                      <span className="text-text-primary font-semibold">
                        &quot;you&quot;
                      </span>
                      ) and CarryMe (
                      <span className="text-text-primary font-semibold">
                        &quot;Company&quot;
                      </span>
                      ,{" "}
                      <span className="text-text-primary font-semibold">
                        &quot;we&quot;
                      </span>
                      ,{" "}
                      <span className="text-text-primary font-semibold">
                        &quot;us&quot;
                      </span>
                      , or{" "}
                      <span className="text-text-primary font-semibold">
                        &quot;our&quot;
                      </span>
                      ) regarding your access to and the use of{" "}
                      <span className="text-accent-primary underline">
                        carryme.сс
                      </span>{" "}
                      (the{" "}
                      <span className="text-text-primary font-semibold">
                        &quot;Site&quot;
                      </span>
                      ).
                    </p>
                    <p className="p-4 bg-accent-primary/5 border border-accent-primary/20 rounded-xl text-sm">
                      By visiting the Site, you acknowledge that you have read,
                      understood, and accepted these Terms. If you do not agree
                      with any part of these Terms, you must immediately cease
                      using the Site.
                    </p>
                  </div>
                </section>

                {/* Section 2 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-secondary/20 text-accent-secondary flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    Definitions
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        term: "Services",
                        def: "Boosting, coaching, and other virtual assistance provided by the Company.",
                      },
                      {
                        term: "Products",
                        def: "Virtual goods or high-rated accounts provided by the Company.",
                      },
                      {
                        term: "CarryMe Balance",
                        def: "Prepaid store credit in your account used solely for purchases on our Site.",
                      },
                      {
                        term: "Tips",
                        def: "Voluntary gratuities for boosters, processed and allocated by the Company.",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-lg bg-bg-primary/40 border border-border/50"
                      >
                        <span className="text-accent-secondary font-bold text-sm block mb-1">
                          {item.term}
                        </span>
                        <p className="text-sm">{item.def}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 3 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-secondary/20 text-accent-secondary flex items-center justify-center text-sm font-bold">
                      3
                    </span>
                    Services and Obligations
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-text-primary font-bold mb-2">
                        3.1. Nature of Service
                      </h3>
                      <p>
                        We provide boosting services (time and expertise) to
                        help you reach a specific in-game rating. We sell the
                        result (rank) and our time.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-text-primary font-bold mb-2">
                        3.2. Restrictions
                      </h3>
                      <p>
                        During Solo or Lobby services, you are prohibited from
                        playing ranked matches on your account without our
                        boosters until the order is finished. Violation may lead
                        to order cancellation without a refund.
                      </p>
                    </div>
                    <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                      <h3 className="text-orange-400 font-bold mb-2 flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        3.3. Account Safety
                      </h3>
                      <p className="text-sm">
                        According to the rules of Valve, Faceit, Riot Games, and
                        others, account sharing and boosting are prohibited. You
                        use our services at your own risk. CarryMe is not
                        responsible for any bans or restrictions. Getting banned
                        does not entitle you to a refund.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-text-primary font-bold mb-2">
                        3.4. Affiliation
                      </h3>
                      <p>
                        CarryMe is not affiliated with Valve Corporation,
                        Faceit, Riot Games, or any other game developer. All
                        trademarks belong to their respective owners.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-text-primary font-bold mb-2">
                        3.5. Delivery and Refunds
                      </h3>
                      <p>
                        Lead time can be up to 180 days. All sales are final. We
                        do not provide cash refunds. We may, at our discretion,
                        replace a service or provide CarryMe Balance credit.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-text-primary font-bold mb-2">
                        3.6. Balance & Tips
                      </h3>
                      <p>
                        Top-ups to CarryMe Balance and Tips are voluntary and
                        strictly non-refundable.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-secondary/20 text-accent-secondary flex items-center justify-center text-sm font-bold">
                      4
                    </span>
                    Price and Payment
                  </h2>
                  <div className="space-y-4">
                    <p>
                      4.1. Prices are published on the Site and include VAT
                      where applicable.
                    </p>
                    <p>
                      4.2. We reserve the right to adjust pricing at any time.
                      Once an order is paid, the price for that specific order
                      is locked and cannot be changed.
                    </p>
                  </div>
                </section>

                {/* Section 5 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-secondary/20 text-accent-secondary flex items-center justify-center text-sm font-bold">
                      5
                    </span>
                    Cancellations
                  </h2>
                  <div className="space-y-4">
                    <p>
                      5.1. The Company may terminate your order if we believe
                      the service is being used in an unintended or fraudulent
                      manner.
                    </p>
                    <p>
                      5.2. If the Customer fails to fulfill their obligations
                      (e.g., interfering with the booster), we may cancel the
                      order and retain the payment as a penalty.
                    </p>
                  </div>
                </section>

                {/* Section 6 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-secondary/20 text-accent-secondary flex items-center justify-center text-sm font-bold">
                      6
                    </span>
                    Limit of Liability
                  </h2>
                  <div className="space-y-4">
                    <p>
                      6.1. CarryMe is not responsible for delays beyond our
                      control or any loss of profit/sales related to your game
                      accounts.
                    </p>
                    <p>
                      6.2. Our total liability to the Customer shall never
                      exceed the total cost of the Products and Services
                      purchased.
                    </p>
                  </div>
                </section>

                {/* Section 7 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-secondary/20 text-accent-secondary flex items-center justify-center text-sm font-bold">
                      7
                    </span>
                    Law and Jurisdiction
                  </h2>
                  <p>This Contract is governed by European Law.</p>
                </section>

                {/* Section 8 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-secondary/20 text-accent-secondary flex items-center justify-center text-sm font-bold">
                      8
                    </span>
                    Data Protection
                  </h2>
                  <div className="space-y-4">
                    <p>
                      8.1. We act as a &apos;Data Controller&apos; for account
                      management and a &apos;Data Processor&apos; for order
                      execution under the GDPR.
                    </p>
                    <p>
                      8.2. We process personal data only as necessary to provide
                      Services. Full details are available in our{" "}
                      <Link
                        href={"/privacy-policy"}
                        className="text-accent-primary underline"
                      >
                        Privacy Policy
                      </Link>
                      . For inquiries, contact: carryme.support@gmail.com
                    </p>
                  </div>
                </section>

                {/* Section 9 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-secondary/20 text-accent-secondary flex items-center justify-center text-sm font-bold">
                      9
                    </span>
                    Intellectual Property
                  </h2>
                  <p>
                    All content, logos, and technology on the Site are owned
                    solely by CarryMe. You are not granted any ownership rights
                    by using our Services.
                  </p>
                </section>

                {/* Section 10 */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-accent-secondary/20 text-accent-secondary flex items-center justify-center text-sm font-bold">
                      10
                    </span>
                    Complaints
                  </h2>
                  <div className="space-y-4">
                    <p>Any complaints should be sent via:</p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className="flex-1 p-3 bg-bg-primary/60 border border-border/50 rounded-lg">
                        <span className="text-xs text-text-muted uppercase block">
                          Email
                        </span>
                        <span className="text-accent-primary font-medium">
                          carryme.support@gmail.com
                        </span>
                      </div>
                      <div className="flex-1 p-3 bg-bg-primary/60 border border-border/50 rounded-lg">
                        <span className="text-xs text-text-muted uppercase block">
                          Discord
                        </span>
                        <a
                          href="https://discord.gg/XzMFHxdpJP"
                          className="text-accent-secondary font-medium"
                        >
                          Support Channel
                        </a>
                      </div>
                    </div>
                    <p className="text-sm">
                      We will investigate complaints within 7 working days and
                      provide a final answer within 14 working days.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
