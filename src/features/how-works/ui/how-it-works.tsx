"use client";

import { motion } from "framer-motion";
import { Container, SectionTitle, FadeIn } from "@/shared/ui";

const steps = [
  {
    step: "01",
    title: "Choose Your Service",
    description:
      "Select the game and boosting service you need. Pick your current and desired rank.",
  },
  {
    step: "02",
    title: "Place Your Order",
    description:
      "Complete the order with secure payment. Our team assigns the best available booster.",
  },
  {
    step: "03",
    title: "Track & Receive",
    description:
      "Monitor progress in real-time. Once complete, enjoy your new rank and improved stats.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-bg-secondary">
      <Container>
        <FadeIn>
          <SectionTitle
            title="How It Works"
            subtitle="Getting boosted is simple. Just follow these three easy steps."
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              className="relative text-center md:text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.3,
                ease: "easeOut",
              }}
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-border" />
              )}

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bg-card border border-border mb-6">
                  <span className="text-xl font-bold gradient-text">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>

                <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
