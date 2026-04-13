import { Container, SectionTitle } from "@/shared/ui";

const features = [
  {
    icon: "⚡",
    title: "Fast Delivery",
    description:
      "Most orders are started within 15 minutes. We value your time and deliver results quickly.",
  },
  {
    icon: "🛡️",
    title: "100% Safe",
    description:
      "We use VPN protection, offline mode, and all necessary precautions to keep your account secure.",
  },
  {
    icon: "💰",
    title: "Best Prices",
    description:
      "Competitive pricing with regular discounts. Quality service doesn't have to break the bank.",
  },
  {
    icon: "🎧",
    title: "24/7 Support",
    description:
      "Our support team is available around the clock via Discord, Telegram, and live chat.",
  },
  {
    icon: "📊",
    title: "Live Tracking",
    description:
      "Watch your boost progress in real-time. Full transparency on every order.",
  },
  {
    icon: "🔄",
    title: "Money-Back Guarantee",
    description:
      "Not satisfied? We offer full refunds if we can't deliver the promised results.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionTitle
          title="Why Choose Us"
          subtitle="We provide the best boosting experience with top-tier security, speed, and support."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 md:p-8 rounded-[var(--radius-lg)] bg-bg-card border border-border hover:border-border-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
