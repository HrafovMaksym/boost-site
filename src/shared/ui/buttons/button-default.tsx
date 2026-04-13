import { LoaderCircle } from "lucide-react";
import React from "react";

interface ButtonDefaultProps {
  text: string;
  onClick?: () => void;
  styles?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

export const ButtonDefault = ({
  text,
  onClick,
  styles,
  leftIcon,
  rightIcon,
  disabled,
  loading,
  type,
}: ButtonDefaultProps) => {
  return (
    <button
      disabled={loading || disabled}
      onClick={onClick}
      type={type}
      className={`
        flex items-center cursor-pointer justify-center gap-2
        rounded-[var(--radius-md)] transition-all duration-300
        bg-accent-primary text-text-primary font-semibold text-sm
        ${styles ? styles : "px-7 py-3.5"}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${!disabled ? "hover:bg-accent-primary-hover hover:shadow-[var(--shadow-glow)]" : ""}
      `}
    >
      {loading ? (
        <LoaderCircle size={20} className="animate-spin" />
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          {text}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
