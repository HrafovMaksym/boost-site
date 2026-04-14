import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  glow?: boolean;
}

export const Card = ({
  children,
  href,
  className = "",
  glow = false,
}: CardProps) => {
  const styles = `
    block rounded-[var(--radius-lg)]
    bg-bg-card border border-border
    transition-all duration-300
    hover:bg-bg-card-hover hover:border-border-hover
    hover:-translate-y-1
    ${glow ? "hover:shadow-[var(--shadow-glow)]" : "hover:shadow-[var(--shadow-card)]"}
    ${className}
  `.trim();

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return <div className={styles}>{children}</div>;
};
