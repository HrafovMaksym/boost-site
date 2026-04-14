interface SectionTitleProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  centered?: boolean;
}

export const SectionTitle = ({
  title,
  subtitle,
  gradient = true,
  centered = true,
}: SectionTitleProps) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
      <h2
        className={`text-3xl md:text-4xl lg:text-[var(--fs-4xl)] font-bold mb-4 ${
          gradient ? "gradient-text" : "text-text-primary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
