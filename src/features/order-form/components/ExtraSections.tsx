"use client";

import type { ExtraSectionConfig } from "../types";

interface ExtraSectionsProps {
  sections: ExtraSectionConfig[];
  values: Record<string, string | boolean>;
  onChange: (id: string, value: string | boolean) => void;
}

export function ExtraSections({
  sections,
  values,
  onChange,
}: ExtraSectionsProps) {
  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <div
          key={section.id}
          className="p-4 rounded-[var(--radius-md)] bg-bg-primary/60 border border-border"
        >
          {section.type === "select" && section.options && (
            <>
              <label className="text-text-secondary text-sm mb-2 block font-medium">
                {section.label}
                {section.tooltip && (
                  <span
                    className="text-text-muted text-xs ml-2 cursor-help"
                    title={section.tooltip}
                  >
                    &#9432;
                  </span>
                )}
              </label>
              <select
                value={(values[section.id] as string) ?? ""}
                onChange={(e) => onChange(section.id, e.target.value)}
                className="w-full bg-bg-card border border-border rounded-[var(--radius-sm)] px-3 py-2.5 text-text-primary text-sm outline-none focus:border-accent-primary transition-colors appearance-none cursor-pointer"
              >
                {section.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </>
          )}

          {section.type === "toggle" && (
            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm font-medium">
                {section.label}
                {section.tooltip && (
                  <span
                    className="text-text-muted text-xs ml-2 cursor-help"
                    title={section.tooltip}
                  >
                    &#9432;
                  </span>
                )}
              </span>
              <button
                onClick={() => onChange(section.id, !values[section.id])}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                  values[section.id]
                    ? "bg-accent-primary"
                    : "bg-bg-card border border-border"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    values[section.id]
                      ? "translate-x-[22px]"
                      : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
