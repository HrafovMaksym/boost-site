"use client";

import { motion } from "framer-motion";
import { Container, SectionTitle, FadeIn } from "@/shared/ui";
import { steps } from "../model/consts";

export function HowItWorks() {
  return (
    <section className=" py-20 md:py-28 bg-bg-secondary">
      <Container>
        <FadeIn>
          <SectionTitle
            title="How It Works"
            subtitle="Getting boosted is simple. Just follow these three easy steps."
          />
        </FadeIn>

        <div className="relative">
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+3rem)] right-[calc(50%+3rem)] h-px bg-border" />
          <div className="hidden md:block absolute top-8 left-[calc(50%+3rem)] right-[calc(16.67%+3rem)] h-px bg-border" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                className="relative text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.3,
                  ease: "easeOut",
                }}
              >
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bg-card border border-border mb-6">
                    <span className="text-xl font-bold gradient-text">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>

                  <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
