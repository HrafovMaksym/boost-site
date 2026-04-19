import { LoaderCircle } from "lucide-react";
import React from "react";
import { BorderBeam } from "@/shared/ui/border-beam";

interface ButtonDefaultProps {
  text: string;
  onClick?: () => void;
  styles?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  borderBeam?: boolean;
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
  borderBeam = false,
}: ButtonDefaultProps) => {
  return (
    <button
      disabled={loading || disabled}
      onClick={onClick}
      type={type}
      className={`
        relative flex items-center cursor-pointer justify-center gap-2
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
          {borderBeam && (
            <BorderBeam
              duration={4}
              size={100}
              reverse
              className="from-transparent via-[#06b6d4] to-transparent"
            />
          )}
          {leftIcon && <span className="z-10">{leftIcon}</span>}
          <span className="z-10">{text}</span>
          {rightIcon && <span className="z-10">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
