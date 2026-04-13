"use client";

import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-primary hover:bg-accent-primary-hover text-white glow-effect",
  secondary:
    "bg-bg-card hover:bg-bg-card-hover text-text-primary border border-border",
  outline:
    "bg-transparent hover:bg-bg-card text-text-primary border border-border hover:border-border-hover",
  ghost: "bg-transparent hover:bg-bg-card text-text-secondary hover:text-text-primary",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-full
    transition-all duration-300
    cursor-pointer select-none
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `.trim();

  if (href?.startsWith("#")) {
    const handleAnchorClick = () => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
      <button onClick={handleAnchorClick} className={baseStyles}>
        {children}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseStyles}>
      {children}
    </button>
  );
}
