"use client";

import { useState } from "react";
import { Container, SectionTitle, FadeIn } from "@/shared/ui";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const globalFaq = [
  {
    label: "How does it work?",
    option:
      "After selecting a service, place your order and proceed to payment. Once the payment is successful, you will receive an email with your order number. Go to your personal account to check the order status. In your dashboard, you will find additional information regarding your order, including the current payment status and fulfillment progress. If you encounter any issues, you can join our Discord and open a support ticket.",
  },
  {
    label: "What are your working hours?",
    option:
      "Support available daily from 10:00 to 24:00. Boosters available 24/7, if something happens with booster the order may be rescheduled by the assigned booster.",
  },
  {
    label: "If I order now, when will the boost start?",
    option:
      "The start time depends on booster availability. When placing your order, you can specify your preferred date and time, as well as set the priority level.",
  },
  {
    label: "Will I get banned for using your service?",
    option:
      "We do not use cheats, exploits, or bugs in our services. However, according to the policies of FACEIT and Riot Games, using boosting services to increase your rank is prohibited and can result in a ban. Therefore, the responsibility for using our services lies with you. That being said, we employ various methods to minimize risk and protect your account from being flagged.",
  },
];

const boostFaq = [
  {
    label: "Can I play on my account while the boost is in progress?",
    option:
      "Unfortunately, you cannot play on the account at the same time, as this would disconnect the booster. However, you can purchase an additional service where the booster plays on a separate account in a party with you (Duo Queue).",
  },
  {
    label: "I bought a boost; can my friend play in the party with us?",
    option:
      "Yes, we can arrange for your friend to join the lobby, though this requires an additional fee.",
  },
  {
    label: "How long will it take to complete my order?",
    option:
      "Completion time depends on the size of your order. On average, a booster can play 10–12 games per day. The total speed will also depend on the specific rank where the boost is being performed.",
  },
];

interface FaqItemProps {
  label: string;
  option: string;
  index: number;
}

function FaqItem({ label, option, index }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FadeIn delay={index * 0.08}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left group"
      >
        <div
          className={`
            rounded-[var(--radius-lg)] border transition-all duration-300
            ${
              isOpen
                ? "bg-bg-card border-accent-primary/30 shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                : "bg-bg-card/50 border-border hover:bg-bg-card hover:border-border-hover"
            }
          `}
        >
          <div className="flex items-center justify-between p-5 md:p-6">
            <h3
              className={`text-sm md:text-base font-semibold pr-4 transition-colors duration-300 ${
                isOpen ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
              }`}
            >
              {label}
            </h3>
            <div
              className={`
                flex-shrink-0 w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center transition-all duration-300
                ${
                  isOpen
                    ? "bg-accent-primary/20 rotate-180"
                    : "bg-border/30 group-hover:bg-border/50"
                }
              `}
            >
              <ChevronDown
                size={16}
                className={`transition-colors duration-300 ${
                  isOpen ? "text-accent-primary" : "text-text-muted"
                }`}
              />
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 md:px-6 md:pb-6">
                  <div className="h-px bg-border/50 mb-4" />
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {option}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </FadeIn>
  );
}

export function FaqPage() {
  return (
    <section className="min-h-screen py-20 md:py-28">
      <Container>
        <FadeIn>
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services, delivery, and support."
            centered
          />
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          {/* General FAQ */}
          <FadeIn delay={0.1}>
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-semibold tracking-wide uppercase">
                General
              </span>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-3 mb-12">
            {globalFaq.map((item, index) => (
              <FaqItem
                key={item.label}
                label={item.label}
                option={item.option}
                index={index}
              />
            ))}
          </div>

          {/* Boosting FAQ */}
          <FadeIn delay={0.1}>
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary text-xs font-semibold tracking-wide uppercase">
                Boosting
              </span>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-3">
            {boostFaq.map((item, index) => (
              <FaqItem
                key={item.label}
                label={item.label}
                option={item.option}
                index={index}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
