"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

type Range = {
  min: number;
  max: number;
  color: string;
  bg: string;
};

const ranges: Range[] = [
  { min: 0, max: 4999, color: "#8B8B9A", bg: "rgba(60,60,75,0.9)" },
  { min: 5000, max: 9999, color: "#7DD3FC", bg: "rgba(30,60,90,0.9)" },
  { min: 10000, max: 14999, color: "#4F7FE0", bg: "rgba(20,35,90,0.9)" },
  { min: 15000, max: 19999, color: "#A855F7", bg: "rgba(45,20,80,0.9)" },
  { min: 20000, max: 24999, color: "#E030B0", bg: "rgba(80,15,65,0.9)" },
  { min: 25000, max: 29999, color: "#E53030", bg: "rgba(80,15,15,0.9)" },
  { min: 30000, max: Infinity, color: "#DDAA00", bg: "rgba(70,55,5,0.9)" },
];

function getRange(value: number) {
  return ranges.find((r) => value >= r.min && value <= r.max)!;
}

export default function ScoreBadge({ value }: { value: number }) {
  const range = useMemo(() => getRange(value), [value]);

  return (
    <motion.div
      key={range.color}
      initial={{ opacity: 0.7, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center"
      style={{ height: 27 }}
    >
      <div
        className="relative flex items-center h-full font-black tracking-widest overflow-hidden"
        style={{
          paddingLeft: 19,
          paddingRight: 14,
          fontSize: 9,
          color: range.color,
          background: range.bg,
          clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
        }}
      >
        <div
          className="absolute"
          style={{
            left: 7,
            width: 2.5,
            top: -2,
            bottom: -2,
            background: range.color,
            transform: "skewX(-12deg)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: 3,
            width: 2.5,
            top: -2,
            bottom: -2,
            background: range.color,
            transform: "skewX(-12deg)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: 10,
            width: 2,
            top: -2,
            bottom: -2,
            background: range.color,
            opacity: 0.55,
            transform: "skewX(-12deg)",
          }}
        />

        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {value.toLocaleString()}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
