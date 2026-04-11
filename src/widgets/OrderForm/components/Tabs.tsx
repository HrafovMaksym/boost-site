"use client";

import type { TabConfig } from "../types";

interface TabsProps {
  tabs: TabConfig[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 p-1 bg-bg-primary/60 rounded-[var(--radius-md)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 px-4 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? "bg-accent-primary text-white shadow-[var(--shadow-glow)]"
              : "text-text-secondary hover:text-text-primary hover:bg-bg-card/50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
