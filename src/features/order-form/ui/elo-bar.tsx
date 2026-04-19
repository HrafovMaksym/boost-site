"use client";

import { motion } from "framer-motion";
import { levels } from "../model/consts";

type Props = {
  elo: number;
  className?: string;
  size?: number;
};

export const LEVEL_COLORS: Record<number, string> = {
  1: "#1A1A1A",
  2: "#1FAF5A",
  3: "#2ECC71",
  4: "#FFD91A",
  5: "#FFE21A",
  6: "#FFD21A",
  7: "#FFB21A",
  8: "#FF7A1A",
  9: "#FF6A1A",
  10: "#FF1A1A",
};

export function getLevel(elo: number) {
  return levels.find((l) => elo >= l.min && elo <= l.max) || levels[0];
}

export default function EloBar({ elo, className = "", size = 32 }: Props) {
  const level = getLevel(elo);
  const color = LEVEL_COLORS[level.level] || LEVEL_COLORS[1];

  const fillPercentage = level.level / 10;
  const maxArc = 75;
  const currentArc = maxArc * fillPercentage;

  return (
    <div
      className={`relative inline-flex items-center justify-center filter drop-shadow-lg ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <circle cx="50" cy="50" r="48" fill="#1e2025" />

        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#2d3038"
          strokeWidth="12"
          pathLength="100"
          strokeDasharray="75 100"
          strokeLinecap="butt"
          transform="rotate(135 50 50)"
        />

        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke={color}
          strokeWidth="12"
          pathLength="100"
          initial={{ strokeDasharray: "0 100", stroke: color }}
          animate={{ strokeDasharray: `${currentArc} 100`, stroke: color }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          strokeLinecap="butt"
          transform="rotate(135 50 50)"
        />

        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize="36"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          dy="0.1em"
        >
          {level.level}
        </text>
      </svg>
    </div>
  );
}

export function LevelBadge({
  elo,
  className = "",
}: {
  elo: number;
  className?: string;
}) {
  const level = getLevel(elo);
  const color = LEVEL_COLORS[level.level] || LEVEL_COLORS[1];

  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-1 rounded-md border font-bold text-[10px] uppercase tracking-wider ${className}`}
      style={{
        backgroundColor: `${color}1A`,
        borderColor: `${color}33`,
        color: color,
        boxShadow: `0 0 8px ${color}33`,
      }}
    >
      Level {level.level}
    </div>
  );
}
