import { Container, SectionTitle } from "@/shared/ui";
import { HeroSection } from "@/features/hero-section/hero-section";
import { OrderForm } from "@/features/order-form/order-form";
import { CS2_PREMIER_CONFIG } from "@/features/order-form/configs";

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

      <section id="order" className="py-20 md:py-28 bg-bg-secondary">
        <Container>
          <div className="max-w-3xl mx-auto">
            <OrderForm config={CS2_PREMIER_CONFIG} />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionTitle
              title="Premier Boost Advantages"
              subtitle="Our Premier boost service is designed for maximum efficiency and safety."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: "\uD83C\uDFAE",
                  title: "Solo or Duo Queue",
                  desc: "Play alongside our booster or let them handle it solo \u2014 your choice.",
                },
                {
                  icon: "\uD83D\uDCC8",
                  title: "Rating Guarantee",
                  desc: "We guarantee the exact rating you ordered. No shortcuts.",
                },
                {
                  icon: "\uD83D\uDD12",
                  title: "Full Account Security",
                  desc: "VPN protection, offline mode, and secure account handling.",
                },
                {
                  icon: "\u23F1\uFE0F",
                  title: "Fast Completion",
                  desc: "Most orders completed within 24-72 hours depending on rating gap.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 rounded-[var(--radius-lg)] bg-bg-card border border-border"
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
