import { Container } from "@/shared/ui";

interface BoostInfoProps {
  title: string;
  gradientTitle: string;
  features: string[];
  howItWorksTitle: string;
  steps: { step: string; text: string }[];
}

export function BoostInfoSection({
  title,
  gradientTitle,
  features,
  howItWorksTitle,
  steps,
}: BoostInfoProps) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {title} <span className="gradient-text">{gradientTitle}</span>
            </h2>
            <div className="space-y-4">
              {features.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-text-secondary"
                >
                  <span className="text-accent-primary mt-0.5 shrink-0">
                    &#10003;
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-[var(--radius-lg)] bg-bg-card border border-border">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              {howItWorksTitle}
            </h3>
            <div className="space-y-6">
              {steps.map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-accent-primary">
                      {item.step}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm pt-1">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
