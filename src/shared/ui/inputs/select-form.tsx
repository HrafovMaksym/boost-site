"use client";
import React, { useRef, useState } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { ChevronDown, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFormProps {
  label: string;
  options: SelectOption[];
  register: UseFormRegisterReturn;
  errorType: string;
  errors: FieldErrors;
}

export const SelectForm = ({
  label,
  options,
  register,
  errorType,
  errors,
}: SelectFormProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const isFloating = isFocused || hasValue;
  const isError = Boolean(errors[errorType]);
  const errorMessage = errors[errorType]?.message;
  const errorT = errorMessage ? String(errorMessage) : "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHasValue(e.target.value.length > 0);
    register?.onChange?.(e);
  };

  return (
    <div className="relative w-full mb-6">
      <div className="relative">
        <motion.div
          initial={false}
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`pointer-events-none absolute inset-0 rounded-[var(--radius-md)] ${
            isError
              ? "shadow-[0_0_20px_4px_rgba(239,68,68,0.15)]"
              : "shadow-[0_0_20px_4px_rgba(124,58,237,0.15)]"
          }`}
        />

        <motion.label
          onClick={() => selectRef.current?.focus()}
          animate={
            isFloating
              ? { top: "8px", scale: 0.85, x: 0 }
              : { top: "50%", scale: 1, x: 0 }
          }
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className={`absolute left-3.5 origin-left cursor-pointer select-none text-sm font-medium leading-none -translate-y-1/2 z-10 transition-colors duration-200 ${
            isError
              ? "text-red-400"
              : isFocused
                ? "text-accent-primary"
                : "text-text-muted"
          }`}
        >
          {label}
        </motion.label>

        <select
          ref={(el) => {
            selectRef.current = el;
            if (typeof register?.ref === "function") register.ref(el);
          }}
          name={register?.name}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            register?.onBlur?.(e);
          }}
          onChange={handleChange}
          defaultValue=""
          className={`
            peer w-full rounded-[var(--radius-md)] border appearance-none
            bg-bg-card/60 backdrop-blur-sm
            pr-11 text-text-primary outline-none
            cursor-pointer
            transition-[border-color,box-shadow,padding] duration-300 hover:border-border-hover
            text-base px-4
            ${isFloating ? "pt-6 pb-2.5" : "py-4"}
            ${
              isError
                ? "border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                : "border-border focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20"
            }
          `}
        >
          <option value="" disabled hidden />
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-bg-card text-text-primary">
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${
            isFocused ? "text-accent-primary" : "text-text-muted"
          }`}
        />

        <motion.span
          animate={{ scaleX: isFocused ? 1 : 0 }}
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`pointer-events-none absolute bottom-0 left-[10%] h-[2px] w-[80%] origin-center rounded-full ${
            isError
              ? "bg-gradient-to-r from-transparent via-red-400 to-transparent"
              : "bg-gradient-to-r from-transparent via-accent-primary to-accent-secondary"
          }`}
        />
      </div>

      <AnimatePresence>
        {isError && errorT && (
          <motion.p
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mt-1.5 flex items-center gap-1.5 overflow-hidden pl-1 text-xs text-red-400"
          >
            <AlertCircle size={12} className="shrink-0" />
            {errorT}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
