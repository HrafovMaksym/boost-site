"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container, SectionTitle, FadeIn } from "@/shared/ui";
import Delievery from "@/shared/assets/gif/delievery.gif";
import Safe from "@/shared/assets/gif/safe.gif";
import Price from "@/shared/assets/gif/bestPrices.gif";
import Support from "@/shared/assets/gif/chat.gif";
import Tracking from "@/shared/assets/gif/traking.gif";
import Guarantee from "@/shared/assets/gif/refund.gif";

const features = [
  {
    icon: Delievery,
    title: "Fast Delivery",
    description:
      "Most orders are started within 15 minutes. We value your time and deliver results quickly.",
  },
  {
    icon: Safe,
    title: "100% Safe",
    description:
      "We use VPN protection, offline mode, and all necessary precautions to keep your account secure.",
  },
  {
    icon: Price,
    title: "Best Prices",
    description:
      "Competitive pricing with regular discounts. Quality service doesn't have to break the bank.",
  },
  {
    icon: Support,
    title: "24/7 Support",
    description:
      "Our support team is available around the clock via Discord, Telegram, and live chat.",
  },
  {
    icon: Tracking,
    title: "Live Tracking",
    description:
      "Watch your boost progress in real-time. Full transparency on every order.",
  },
  {
    icon: Guarantee,
    title: "Money-Back Guarantee",
    description:
      "Not satisfied? We offer full refunds if we can't deliver the promised results.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <FadeIn>
          <SectionTitle
            title="Why Choose Us"
            subtitle="We provide the best boosting experience with top-tier security, speed, and support."
          />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="px-10 py-8 rounded-[var(--radius-lg)] bg-bg-card border border-border hover:border-border-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
            >
              <div className="mb-4">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  className="w-9 h-9 object-contain"
                  unoptimized
                />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
