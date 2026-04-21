"use client";

import React, { useState, useMemo } from "react";
import {
  GraduationCap,
  Zap,
  ChevronRight,
  Clock,
  HelpCircle,
  FileText,
  Video,
} from "lucide-react";

import { useAppSelector } from "@/shared/hooks/redux-hook";
import Link from "next/link";
import { api } from "@/shared/config/axios-config";
import { toast } from "react-hot-toast";

const COACHING_PRICES: Record<number, number> = {
  1: 21.49,
  2: 42.99,
  3: 62.49,
  4: 83.49,
  5: 102.49,
  6: 122.99,
  7: 140.49,
  8: 159.99,
  9: 174.99,
  10: 193.99,
  11: 213.49,
  12: 232.99,
  13: 246.99,
  14: 265.99,
  15: 284.99,
};

type CoachingMode = "demoReview" | "coaching";

export function CoachOrderForm() {
  const { user } = useAppSelector((state) => state.user);
  const [sessionsCount, setSessionsCount] = useState<number>(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [mode, setMode] = useState<CoachingMode>("coaching");
  const [priority, setPriority] = useState(false);

  const price = useMemo(() => {
    const basePrice = COACHING_PRICES[sessionsCount] || 21.49;
    let multiplier = 1;
    if (priority) multiplier += 0.2;
    return Number((basePrice * multiplier).toFixed(2));
  }, [sessionsCount, priority]);

  const handleOrder = async () => {
    if (!user) return;
    setIsOrdering(true);
    try {
      const { data } = await api.post("stripe/checkout", {
        service: "CS2 Pro Coaching",
        currentValue: sessionsCount,
        desiredValue: sessionsCount,
        options: { priority, mode },
        price,
      });
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      toast.error("Failed to proceed to payment. Please try again.");
      setIsOrdering(false);
    }
  };

  const sliderPercent = ((sessionsCount - 1) / (15 - 1)) * 100;

  return (
    <div className="w-full">
      <div className="bg-[#0b0e16] border border-[#1f2330] rounded-[32px] p-1 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
          <div className="lg:col-span-4 p-8 border-b lg:border-b-0 lg:border-r border-[#1f2330] bg-gradient-to-b from-transparent to-emerald-500/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-emerald-600/10 p-1.5 rounded-lg text-emerald-500 shadow-inner border border-emerald-500/20">
                <GraduationCap size={32} />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter italic text-white leading-none">
                  CarryMe
                </h2>
                <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold opacity-80">
                  Pro Coaching
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
                  Coaching Type
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMode("coaching")}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      mode === "coaching"
                        ? "border-emerald-500/50 bg-gradient-to-br from-emerald-600/20 to-teal-600/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                        : "border-[#1f2330] bg-[#161b28] hover:border-[#2d3446] hover:bg-[#1c2234]"
                    }`}
                  >
                    <Video
                      size={20}
                      className={`transition-colors ${mode === "coaching" ? "text-emerald-400" : "text-gray-500"}`}
                    />
                    <span
                      className={`text-[10px] font-black uppercase tracking-tight ${mode === "coaching" ? "text-white" : "text-gray-400"}`}
                    >
                      Live Coaching
                    </span>
                    {mode === "coaching" && (
                      <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-500">
                        <div className="absolute inset-0.5 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() => setMode("demoReview")}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      mode === "demoReview"
                        ? "border-emerald-500/50 bg-gradient-to-br from-emerald-600/20 to-teal-600/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                        : "border-[#1f2330] bg-[#161b28] hover:border-[#2d3446] hover:bg-[#1c2234]"
                    }`}
                  >
                    <FileText
                      size={20}
                      className={`transition-colors ${mode === "demoReview" ? "text-emerald-400" : "text-gray-500"}`}
                    />
                    <span
                      className={`text-[10px] font-black uppercase tracking-tight ${mode === "demoReview" ? "text-white" : "text-gray-400"}`}
                    >
                      Demo Review
                    </span>
                    {mode === "demoReview" && (
                      <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-500">
                        <div className="absolute inset-0.5 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-4 group p-4 bg-[#161b28]/50 border border-[#2d3446]/50 rounded-2xl relative transition-all hover:bg-[#161b28]">
                <div className="flex justify-between items-end px-1">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Sessions
                    </label>
                    <span className="text-2xl font-black text-white">
                      {sessionsCount}{" "}
                      {sessionsCount === 1 ? "Session" : "Sessions"}
                    </span>
                  </div>
                </div>

                <div className="relative pt-4">
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={sessionsCount}
                    onChange={(e) => setSessionsCount(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#0b0e16] rounded-full appearance-none cursor-pointer accent-emerald-500 border border-[#1f2330] shadow-inner transition-all hover:brightness-110 active:brightness-125 focus:outline-none"
                    style={{
                      background: `linear-gradient(to right, #059669 0%, #34d399 ${sliderPercent}%, #0b0e16 ${sliderPercent}%, #0b0e16 100%)`,
                    }}
                  />
                  <div className="flex justify-between mt-3">
                    <span className="text-[9px] font-black text-gray-600 tracking-tighter shrink-0">
                      1 SESSION
                    </span>
                    <div className="h-px bg-[#1f2330] flex-1 mx-3 self-center opacity-30" />
                    <span className="text-[9px] font-black text-gray-600 tracking-tighter shrink-0">
                      15 SESSIONS
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[#161b28]/50 border-l-2 border-emerald-500 p-4 rounded-r-xl">
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  <span className="text-white font-bold block mb-1">
                    {mode === "coaching" ? "Live Coaching" : "Demo Review"}
                  </span>
                  {mode === "coaching"
                    ? "Play live games with a professional coach spectating in real-time. Get instant feedback on your decisions, positioning, and mechanics."
                    : "Send us your recent match demos and our coach will prepare a detailed breakdown of your gameplay with timestamps and improvement notes."}
                </p>
              </div>

              <div className="pt-4 flex items-center gap-2 text-[10px] text-gray-500 font-medium px-1">
                <Clock size={12} />
                <span>1H PER SESSION</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 relative bg-[#0b0e16] flex flex-col justify-start">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Extra Services
              </p>
            </div>

            <div className="max-w-sm">
              <OptionItem
                active={priority}
                onClick={() => setPriority(!priority)}
                label="Priority"
                pct="+20%"
                icon={<Zap size={16} />}
                tooltip="Your coaching request moves to the top of our queue. We'll match you with a coach and schedule your first session as fast as possible."
              />
            </div>
          </div>

          <div className="lg:col-span-3 p-8 bg-[#0d111a] flex flex-col justify-between border-l border-[#1f2330]">
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-black mb-6 tracking-widest">
                Order Summary
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Type</span>
                  <span className="text-emerald-400 font-bold">
                    {mode === "coaching" ? "Live Coaching" : "Demo Review"}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Sessions</span>
                  <span className="text-white font-bold">
                    {sessionsCount}{" "}
                    {sessionsCount === 1 ? "Session" : "Sessions"}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white font-bold">
                    {sessionsCount}h total
                  </span>
                </div>
                {priority && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Priority</span>
                    <span className="text-emerald-400 font-bold">+20%</span>
                  </div>
                )}
                <div className="h-px bg-white/5 w-full my-4" />
                <div className="flex flex-col">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
                    Final Price
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-emerald-500">
                      &euro;
                    </span>
                    <span className="text-5xl font-black text-white tracking-tighter leading-none">
                      {price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {user ? (
              <button
                onClick={handleOrder}
                disabled={isOrdering}
                className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-500 py-5 rounded-2xl font-black transition-all text-white flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-emerald-900/20 group uppercase tracking-tight text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOrdering ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Redirecting to Payment...
                  </span>
                ) : (
                  <>
                    Proceed to Payment
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            ) : (
              <div className="w-full relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[20px] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative bg-[#0b0e16] rounded-2xl p-4 border border-[#1f2330] shadow-2xl flex flex-col items-center gap-3">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
                    Authentication Required
                  </p>
                  <p className="text-sm font-semibold text-white/90 text-center mb-1">
                    Log in to proceed with your coaching
                  </p>
                  <div className="flex w-full gap-2">
                    <Link
                      href="/login"
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-center text-xs font-bold text-white transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                    >
                      Login
                    </Link>
                    <Link
                      href="/registration"
                      className="flex-1 py-3 bg-[#161b28] hover:bg-[#1c2234] border border-[#2d3446] rounded-xl text-center text-xs font-bold text-white transition-all active:scale-95"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionItem({
  active,
  onClick,
  label,
  pct,
  icon,
  tooltip,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  pct: string;
  icon: React.ReactNode;
  tooltip?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={`relative w-full cursor-pointer group flex items-center p-3 px-4 rounded-xl border transition-all duration-300 min-h-[60px] gap-3 ${
          active
            ? "border-emerald-500/50 bg-gradient-to-br from-emerald-600/20 to-teal-600/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] scale-[1.02] z-10"
            : "border-[#1f2330] bg-[#161b28] hover:border-[#2d3446] hover:bg-[#1c2234]"
        }`}
      >
        {active && (
          <div className="absolute inset-0 rounded-xl bg-gradient-radial from-emerald-500/10 to-transparent pointer-events-none" />
        )}

        <div
          className={`transition-all duration-300 ${active ? "text-emerald-500 scale-110" : "text-gray-500 group-hover:text-gray-400"}`}
        >
          {icon}
        </div>

        <div className="text-left flex-1">
          <p
            className={`text-[10px] font-black tracking-tight leading-tight uppercase transition-colors ${active ? "text-white" : "text-gray-400"}`}
          >
            {label}
          </p>
        </div>

        {tooltip && (
          <span
            className="relative z-20"
            onMouseEnter={(e) => {
              e.stopPropagation();
              setShowTooltip(true);
            }}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={(e) => e.stopPropagation()}
          >
            <HelpCircle
              size={14}
              className={`transition-colors duration-200 cursor-help ${
                showTooltip
                  ? "text-emerald-400"
                  : "text-gray-600 hover:text-emerald-400"
              }`}
            />
          </span>
        )}

        {active && (
          <div className="absolute top-2 right-2 flex items-center justify-center w-3 h-3 rounded-full bg-emerald-500">
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
          </div>
        )}
      </button>

      {tooltip && (
        <div
          className={`absolute top-full right-0 mt-2 w-56 p-3 bg-[#1c2234] border border-[#2d3446] rounded-xl text-[11px] text-gray-300 leading-relaxed shadow-2xl shadow-black/50 z-50 pointer-events-none transition-all duration-200 ${
            showTooltip
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-1 invisible"
          }`}
        >
          <div className="absolute -top-1 right-4 w-2 h-2 bg-[#1c2234] border-l border-t border-[#2d3446] rotate-45" />
          {tooltip}
        </div>
      )}
    </div>
  );
}
