"use client";
import React, { useRef, useState, useEffect } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { ChevronDown, AlertCircle, Check } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const isError = Boolean(errors[errorType]);
  const errorMessage = errors[errorType]?.message;
  const errorT = errorMessage ? String(errorMessage) : "";

  const selectedLabel = options.find(
    (opt) => opt.value === selectedValue,
  )?.label;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);

    if (selectRef.current) {
      selectRef.current.value = value;
      const event = new Event("change", { bubbles: true });
      selectRef.current.dispatchEvent(event);
    }
  };

  return (
    <div className="relative w-full mb-6" ref={containerRef}>
      <label
        className={`block text-sm font-semibold mb-2 ml-1 transition-colors duration-200 ${
          isError
            ? "text-red-400"
            : isOpen
              ? "text-accent-primary"
              : "text-text-secondary"
        }`}
      >
        {label}
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative w-full flex items-center justify-between
          rounded-[var(--radius-md)] border cursor-pointer
          bg-bg-card/40 backdrop-blur-md px-4 py-3.5
          transition-all duration-300 group
          ${
            isError
              ? "border-red-500/50 hover:border-red-400/80 shadow-[0_0_15px_-5px_rgba(239,68,68,0.2)]"
              : isOpen
                ? "border-accent-primary/70 ring-2 ring-accent-primary/20 shadow-[0_0_20px_-5px_rgba(124,58,237,0.3)]"
                : "border-border/60 hover:border-border-hover shadow-sm"
          }
        `}
      >
        <span
          className={`text-base transition-colors duration-200 ${
            selectedValue ? "text-text-primary" : "text-text-muted"
          }`}
        >
          {selectedLabel || "Select an option..."}
        </span>

        <ChevronDown
          size={18}
          className={`transition-all duration-300 ${
            isOpen
              ? "rotate-180 text-accent-primary"
              : "text-text-muted group-hover:text-text-secondary"
          }`}
        />

        <div className="absolute inset-0 rounded-[var(--radius-md)] opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      <select
        {...register}
        ref={(el) => {
          selectRef.current = el;
          if (typeof register?.ref === "function") register.ref(el);
        }}
        className="hidden"
        defaultValue=""
      >
        <option value="" disabled />
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute left-0 right-0 z-[100] mt-1 rounded-xl border border-border/60 bg-bg-card/95 backdrop-blur-xl shadow-2xl p-1.5 overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((opt) => {
                const isSelected = opt.value === selectedValue;
                return (
                  <div
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`
                      group flex items-center justify-between px-3 py-2.5 rounded-lg
                      cursor-pointer transition-all duration-200 mb-0.5 last:mb-0
                      ${
                        isSelected
                          ? "bg-accent-primary/20 text-accent-primary font-semibold"
                          : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                      }
                    `}
                  >
                    <span className="text-sm">{opt.label}</span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-accent-primary/20 flex items-center justify-center"
                      >
                        <Check size={12} className="text-accent-primary" />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
