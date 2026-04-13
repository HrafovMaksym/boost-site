import { Button, Container } from "@/shared/ui";

interface HeroSectionProps {
  title: string;
  gradientTitle?: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export function HeroSection({
  title,
  gradientTitle,
  subtitle,
  ctaText = "Get Started",
  ctaHref = "/cs2",
  secondaryCtaText,
  secondaryCtaHref,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
          style={{ background: "var(--accent-primary)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "var(--accent-secondary)" }}
        />
      </div>

      <Container className="relative z-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[var(--fs-hero)] font-extrabold leading-tight mb-6 tracking-tight">
            {title}{" "}
            {gradientTitle && (
              <span className="gradient-text">{gradientTitle}</span>
            )}
          </h1>

          <p className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={ctaHref} size="lg">
              {ctaText}
            </Button>
            {secondaryCtaText && secondaryCtaHref && (
              <Button href={secondaryCtaHref} variant="outline" size="lg">
                {secondaryCtaText}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
