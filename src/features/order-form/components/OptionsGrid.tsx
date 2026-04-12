"use client";

import type { OptionConfig } from "../types";

interface OptionsGridProps {
  options: OptionConfig[];
  selected: Record<string, boolean>;
  quantities: Record<string, number>;
  currency: string;
  onToggle: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
}

export function OptionsGrid({
  options,
  selected,
  quantities,
  currency,
  onToggle,
  onQuantityChange,
}: OptionsGridProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">
        Additional Options
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map((option) => {
          const isActive = !!selected[option.id];

          return (
            <div key={option.id}>
              <button
                onClick={() => onToggle(option.id)}
                className={`w-full p-3 rounded-[var(--radius-md)] border text-left transition-all duration-200 ${
                  isActive
                    ? "border-accent-primary bg-accent-primary/10"
                    : "border-border bg-bg-primary/60 hover:border-border-hover"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-accent-primary border-accent-primary"
                        : "border-text-muted"
                    }`}
                  >
                    {isActive && (
                      <svg
                        viewBox="0 0 12 12"
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </div>
                  <span className="text-text-primary text-sm font-medium leading-tight">
                    {option.label}
                  </span>
                  {option.tooltip && (
                    <span
                      className="text-text-muted text-xs cursor-help ml-auto shrink-0"
                      title={option.tooltip}
                    >
                      &#9432;
                    </span>
                  )}
                </div>
                <span className="text-text-muted text-xs pl-6">
                  +{option.priceModifier}
                  {option.modifierType === "percentage" ? "%" : ` ${currency}`}
                </span>
              </button>

              {isActive && option.hasQuantity && (
                <div className="flex items-center justify-center gap-3 mt-2 p-2 rounded-[var(--radius-sm)] bg-bg-primary/40">
                  <span className="text-text-muted text-xs">
                    {option.quantityLabel ?? "Qty"}
                  </span>
                  <button
                    onClick={() =>
                      onQuantityChange(
                        option.id,
                        Math.max(
                          option.quantityMin ?? 1,
                          (quantities[option.id] ??
                            option.quantityDefault ??
                            1) - 1
                        )
                      )
                    }
                    className="w-6 h-6 rounded bg-bg-card border border-border text-text-primary text-xs flex items-center justify-center hover:border-accent-primary"
                  >
                    &minus;
                  </button>
                  <span className="text-text-primary text-sm font-medium w-6 text-center">
                    {quantities[option.id] ?? option.quantityDefault ?? 1}
                  </span>
                  <button
                    onClick={() =>
                      onQuantityChange(
                        option.id,
                        Math.min(
                          option.quantityMax ?? 5,
                          (quantities[option.id] ??
                            option.quantityDefault ??
                            1) + 1
                        )
                      )
                    }
                    className="w-6 h-6 rounded bg-bg-card border border-border text-text-primary text-xs flex items-center justify-center hover:border-accent-primary"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
