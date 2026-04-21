"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import premierGif from "@/shared/assets/gif/primier.gif";
import {
  User,
  Zap,
  Users,
  GraduationCap,
  ShieldCheck,
  UserPlus,
  EyeOff,
  Star,
  ChevronRight,
  Clock,
  Rocket,
  HelpCircle,
  Plus,
  Minus,
} from "lucide-react";

import { useAppSelector } from "@/shared/hooks/redux-hook";
import Link from "next/link";
import { api } from "@/shared/config/axios-config";
import { toast } from "react-hot-toast";
import EloBar from "./elo-bar";

export function FaceitOrderForm() {
  const { user } = useAppSelector((state) => state.user);
  const [currentElo, setCurrentElo] = useState<number>(2000);
  const [eloGain, setEloGain] = useState<number>(200);
  const [isOrdering, setIsOrdering] = useState(false);

  const [options, setOptions] = useState({
    selfplay: false,
    priority: false,
    highRating: false,
    moreBoosters: 0,
    superExpress: false,
    premiumCoaching: false,
    soloOnly: false,
    offlineMode: false,
    bringFriend: 0,
    premiumQue: false,
    starBooster: false,
  });

  const eloLimit = options.highRating && options.selfplay ? 3000 : 4000;
  const maxGain = eloLimit - currentElo;
  const safeGain = maxGain >= 25 ? Math.max(25, Math.min(eloGain, maxGain)) : 0;
  const desiredElo = currentElo + safeGain;

  const soloDisabled = options.selfplay || options.highRating;
  const boostersDisabled = options.soloOnly;
  const bringFriendDisabled = !options.selfplay;
  const premiumQueDisabled = options.moreBoosters + options.bringFriend > 3;

  const boostersMaxCount = boostersDisabled ? 0 : (options.selfplay ? Math.min(4, 3 - options.bringFriend) : 4);
  const friendsMaxCount = bringFriendDisabled ? 0 : Math.min(3, 3 - options.moreBoosters);

  const getDynamicRate = (elo: number) => {
    if (elo < 2000) {
      if (elo < 1000) return 0.05;
      if (elo < 1500) return 0.08;
      return 0.15;
    }
    if (elo < 2500) return 0.25 + (elo - 2000) * 0.0003;
    if (elo < 2700) return 0.481;
    if (elo < 3300) return 0.52 + (elo - 2700) * 0.00045;
    if (elo < 3500) return 0.7949;
    if (elo < 3700) return 1.0881;
    return 1.1267;
  };

  const price = useMemo(() => {
    if (desiredElo <= currentElo) return 0;

    let basePrice = 0;
    for (let i = currentElo; i < desiredElo; i++) {
      basePrice += getDynamicRate(i);
    }

    let multiplier = 1;
    if (options.selfplay) multiplier += 0.4;
    if (options.priority) multiplier += 0.15;
    if (options.highRating) multiplier += 0.2;
    multiplier += 0.15 * options.moreBoosters;
    if (options.superExpress) multiplier += 0.4;
    if (options.premiumCoaching) multiplier += 0.8;
    if (options.soloOnly) multiplier += 0.35;
    multiplier += 0.7 * options.bringFriend;
    if (options.premiumQue) multiplier += 0.7;
    if (options.starBooster) multiplier += 0.4;

    return Number((basePrice * multiplier).toFixed(2));
  }, [currentElo, desiredElo, options]);

  const toggleOption = (key: string) => {
    setOptions((prev) => {
      const next = { ...prev };

      if (key === "selfplay") {
        next.selfplay = !prev.selfplay;
        if (next.selfplay) {
          next.soloOnly = false;
          const maxBoosters = 3 - next.bringFriend;
          if (next.moreBoosters > maxBoosters) next.moreBoosters = maxBoosters;
        }
        if (!next.selfplay) {
          next.bringFriend = 0;
        }
      } else if (key === "highRating") {
        next.highRating = !prev.highRating;
        if (next.highRating) next.soloOnly = false;
      } else if (key === "soloOnly") {
        if (!soloDisabled) {
          next.soloOnly = !prev.soloOnly;
          if (next.soloOnly) next.moreBoosters = 0;
        }
      } else if (key === "premiumQue") {
        if (!premiumQueDisabled) {
          next.premiumQue = !prev.premiumQue;
        }
      } else {
        (next as Record<string, boolean | number>)[key] = !(
          prev as Record<string, boolean | number>
        )[key];
      }

      if (next.moreBoosters + next.bringFriend > 3) {
        next.premiumQue = false;
      }

      return next;
    });
  };

  const adjustCounter = (
    key: "moreBoosters" | "bringFriend",
    delta: number,
  ) => {
    setOptions((prev) => {
      const next = { ...prev };
      if (key === "moreBoosters") {
        const max = next.selfplay ? Math.min(4, 3 - next.bringFriend) : 4;
        next.moreBoosters = Math.max(0, Math.min(prev.moreBoosters + delta, max));
      } else {
        const max = Math.min(3, 3 - next.moreBoosters);
        next.bringFriend = Math.max(0, Math.min(prev.bringFriend + delta, max));
      }

      if (next.moreBoosters + next.bringFriend > 3) {
        next.premiumQue = false;
      }

      return next;
    });
  };

  const handleOrder = async () => {
    if (!user) return;
    setIsOrdering(true);
    try {
      const { data } = await api.post("stripe/checkout", {
        service: "Faceit ELO Boost",
        currentValue: currentElo,
        desiredValue: desiredElo,
        options,
        price,
      });
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      toast.error("Failed to proceed to payment. Please try again.");
      setIsOrdering(false);
    }
  };

  const addonsCount = [
    options.selfplay,
    options.priority,
    options.highRating,
    options.moreBoosters > 0,
    options.superExpress,
    options.premiumCoaching,
    options.soloOnly,
    options.offlineMode,
    options.bringFriend > 0,
    options.premiumQue,
    options.starBooster,
  ].filter(Boolean).length;

  return (
    <div className="w-full">
      <div className="bg-[#0b0e16] border border-[#1f2330] rounded-[32px] p-1 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
          <div className="lg:col-span-3 p-8 border-b lg:border-b-0 lg:border-r border-[#1f2330] bg-gradient-to-b from-transparent to-blue-500/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-600/10 p-1.5 rounded-lg text-blue-500 shadow-inner overflow-hidden border border-blue-500/20">
                <Image
                  src={premierGif}
                  alt="Premier"
                  width={32}
                  height={32}
                  className="scale-110"
                />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter italic text-white leading-none">
                  CarryMe
                </h2>
                <p className="text-[10px] text-blue-400 uppercase tracking-widest font-bold opacity-80">
                  Premium Boost
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2 group">
                <div className="flex justify-between items-end px-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Current Rating
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={eloLimit}
                    value={currentElo === 0 ? "" : currentElo}
                    onChange={(e) => {
                      const val =
                        e.target.value === "" ? 0 : Number(e.target.value);
                      if (val >= 0 && val <= eloLimit) setCurrentElo(val);
                    }}
                    className="w-full bg-[#161b28] border border-[#2d3446] rounded-2xl p-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 font-bold text-white transition-all text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="absolute right-4 top-4">
                    <EloBar elo={currentElo} size={32} />
                  </div>
                </div>
              </div>

              <div className="space-y-4 group p-4 bg-[#161b28]/50 border border-[#2d3446]/50 rounded-2xl relative transition-all hover:bg-[#161b28]">
                <div className="flex justify-between items-end px-1">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Target Elo
                    </label>
                    <span className="text-2xl font-black text-white">
                      {desiredElo}
                    </span>
                  </div>
                  <EloBar elo={desiredElo} size={32} />
                </div>

                <div className="relative pt-4">
                  <input
                    type="range"
                    min="25"
                    max={Math.max(25, maxGain)}
                    step="25"
                    value={safeGain}
                    disabled={maxGain < 25}
                    onChange={(e) => setEloGain(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#0b0e16] rounded-full appearance-none cursor-pointer accent-blue-500 border border-[#1f2330] shadow-inner transition-all hover:brightness-110 active:brightness-125 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background:
                        maxGain < 25
                          ? "#0b0e16"
                          : `linear-gradient(to right, #7c3aed 0%, #06b6d4 ${((safeGain - 25) / (maxGain - 25)) * 100}%, #0b0e16 ${((safeGain - 25) / (maxGain - 25)) * 100}%, #0b0e16 100%)`,
                    }}
                  />
                  <div className="flex justify-between mt-3">
                    <span className="text-[9px] font-black text-gray-600 tracking-tighter shrink-0">
                      +25
                    </span>
                    <div className="h-px bg-[#1f2330] flex-1 mx-3 self-center opacity-30" />
                    <span className="text-[9px] font-black text-gray-600 tracking-tighter shrink-0">
                      MAX {eloLimit.toLocaleString()} ELO
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-2 text-[10px] text-gray-500 font-medium px-1">
                <Clock size={12} />
                <span>EST. COMPLETION: 24-48H</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 relative bg-[#0b0e16]">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Extra Boost Services
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 max-h-[350px] md:max-h-none overflow-y-auto md:overflow-visible pr-2 md:pr-0 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#1f2330] [&::-webkit-scrollbar-thumb]:rounded-full">
              <OptionItem
                active={options.selfplay}
                onClick={() => toggleOption("selfplay")}
                label="Self Play"
                pct="+40%"
                icon={<User size={16} />}
                tooltip="Play alongside our boosters. Rank up without sharing your account credentials while learning from the best in real-time."
              />
              <OptionItem
                active={options.priority}
                onClick={() => toggleOption("priority")}
                label="Priority"
                pct="+15%"
                icon={<Zap size={16} />}
                tooltip="Your order moves to the top of our queue, and we'll assign a booster to your account immediately."
              />
              <OptionItem
                active={options.highRating}
                onClick={() => toggleOption("highRating")}
                label="High Rating"
                pct="+20%"
                icon={<Star size={16} />}
                tooltip="Our booster will play from a higher rated account giving you the chance to try yourself in a higher skill level lobby."
              />
              <CounterItem
                count={options.moreBoosters}
                maxCount={boostersMaxCount}
                onIncrement={() => adjustCounter("moreBoosters", 1)}
                onDecrement={() => adjustCounter("moreBoosters", -1)}
                label="Extra Boosters"
                pctPerUnit="+15%"
                icon={<Users size={16} />}
                tooltip="We'll add another booster to your lobby to ensure an even higher win rate and faster completion."
                disabled={boostersDisabled}
              />
              <OptionItem
                active={options.superExpress}
                onClick={() => toggleOption("superExpress")}
                label="Super Express"
                pct="+40%"
                icon={<Rocket size={16} />}
                tooltip="Our boosters will play around the clock to finish your order in the shortest possible time."
              />
              <OptionItem
                active={options.premiumCoaching}
                onClick={() => toggleOption("premiumCoaching")}
                label="Coaching"
                pct="+80%"
                icon={<GraduationCap size={16} />}
                tooltip="Improve your game. Receive a detailed analysis of your mistakes and pro tips from your booster during the service."
              />
              <OptionItem
                active={options.soloOnly}
                onClick={() => toggleOption("soloOnly")}
                label="Solo Only"
                pct="+35%"
                icon={<User size={16} />}
                tooltip="The booster will play strictly solo on your account to perfectly mimic natural user activity."
                disabled={soloDisabled}
              />
              <OptionItem
                active={options.offlineMode}
                onClick={() => toggleOption("offlineMode")}
                label="Offline Mode"
                pct="FREE"
                icon={<EyeOff size={16} />}
                tooltip="Stay invisible. We'll set your Steam status to `Offline` so your friends won't see you playing during the boost."
              />
              <CounterItem
                count={options.bringFriend}
                maxCount={friendsMaxCount}
                onIncrement={() => adjustCounter("bringFriend", 1)}
                onDecrement={() => adjustCounter("bringFriend", -1)}
                label="Bring Friend"
                pctPerUnit="+70%"
                icon={<UserPlus size={16} />}
                tooltip="You and a friend order a boost to play together and boost your rank in the same lobby. Requires Self Play."
                disabled={bringFriendDisabled}
              />
              <OptionItem
                active={options.premiumQue}
                onClick={() => toggleOption("premiumQue")}
                label="Premium Queue"
                pct="+70%"
                icon={<ShieldCheck size={16} />}
                tooltip="Quality matches only. We will use the Faceit Premium queue to ensure better teammates and superior server quality. Available when total extra players ≤ 3."
                disabled={premiumQueDisabled}
              />
              <OptionItem
                active={options.starBooster}
                onClick={() => toggleOption("starBooster")}
                label="Star Booster"
                pct="+40%"
                icon={<Star size={16} />}
                tooltip="Guaranteed high-tier performance. Your order will be handled exclusively by players with FPL-C or 4000+ Elo status."
              />
            </div>
          </div>

          <div className="lg:col-span-3 p-8 bg-[#0d111a] flex flex-col justify-between">
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-black mb-6 tracking-widest">
                Order Summary
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Start Elo</span>
                  <span className="text-white font-bold">{currentElo} ELO</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Target Elo</span>
                  <span className="text-white font-bold">{desiredElo} ELO</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Rating Gain</span>
                  <span className="text-blue-500 font-bold">
                    +{safeGain} ELO
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Addons Active</span>
                  <span className="text-blue-500 font-bold">
                    {addonsCount} selected
                  </span>
                </div>
                <div className="h-px bg-white/5 w-full my-4" />
                <div className="flex flex-col">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
                    Final Price
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-blue-500">€</span>
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
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black transition-all text-white flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-blue-900/20 group uppercase tracking-tight text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[20px] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative bg-[#0b0e16] rounded-2xl p-4 border border-[#1f2330] shadow-2xl flex flex-col items-center gap-3">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
                    Authentication Required
                  </p>
                  <p className="text-sm font-semibold text-white/90 text-center mb-1">
                    Log in to proceed with your boost
                  </p>
                  <div className="flex w-full gap-2">
                    <Link
                      href="/login"
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-center text-xs font-bold text-white transition-all shadow-lg shadow-blue-500/20 active:scale-95"
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
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  pct: string;
  icon: React.ReactNode;
  tooltip?: string;
  disabled?: boolean;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={disabled ? undefined : onClick}
        className={`relative w-full cursor-pointer group flex items-center p-3 px-4 rounded-xl border transition-all duration-300 min-h-[60px] gap-3 ${
          disabled
            ? "border-[#1a1d27] bg-[#12151e] opacity-40 cursor-not-allowed"
            : active
              ? "border-blue-500/50 bg-gradient-to-br from-blue-600/20 to-purple-600/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] scale-[1.02] z-10"
              : "border-[#1f2330] bg-[#161b28] hover:border-[#2d3446] hover:bg-[#1c2234]"
        }`}
      >
        {active && !disabled && (
          <div className="absolute inset-0 rounded-xl bg-gradient-radial from-blue-500/10 to-transparent pointer-events-none" />
        )}

        <div
          className={`transition-all duration-300 ${
            disabled
              ? "text-gray-700"
              : active
                ? "text-blue-500 scale-110"
                : "text-gray-500 group-hover:text-gray-400"
          }`}
        >
          {icon}
        </div>

        <div className="text-left flex-1">
          <p
            className={`text-[10px] font-black tracking-tight leading-tight uppercase transition-colors ${
              disabled
                ? "text-gray-600"
                : active
                  ? "text-white"
                  : "text-gray-400"
            }`}
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
                  ? "text-blue-400"
                  : "text-gray-600 hover:text-blue-400"
              }`}
            />
          </span>
        )}

        {active && !disabled && (
          <div className="absolute top-2 right-2 flex items-center justify-center w-3 h-3 rounded-full bg-blue-500">
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

function CounterItem({
  count,
  maxCount,
  onIncrement,
  onDecrement,
  label,
  pctPerUnit,
  icon,
  tooltip,
  disabled,
}: {
  count: number;
  maxCount: number;
  onIncrement: () => void;
  onDecrement: () => void;
  label: string;
  pctPerUnit: string;
  icon: React.ReactNode;
  tooltip?: string;
  disabled?: boolean;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const active = count > 0 && !disabled;

  return (
    <div className="relative">
      <div
        className={`relative w-full group flex items-center p-3 px-4 rounded-xl border transition-all duration-300 min-h-[60px] gap-3 ${
          disabled
            ? "border-[#1a1d27] bg-[#12151e] opacity-40 cursor-not-allowed "
            : active
              ? "border-blue-500/50 bg-gradient-to-br from-blue-600/20 to-purple-600/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] scale-[1.02] z-10"
              : "border-[#1f2330] bg-[#161b28]"
        }`}
      >
        {active && (
          <div className="absolute inset-0 rounded-xl bg-gradient-radial from-blue-500/10 to-transparent pointer-events-none" />
        )}

        <div
          className={`transition-all duration-300 ${
            disabled
              ? "text-gray-700"
              : active
                ? "text-blue-500 scale-110"
                : "text-gray-500"
          }`}
        >
          {icon}
        </div>

        <div className="text-left flex-1 min-w-0">
          <p
            className={`text-[10px] font-black tracking-tight leading-tight uppercase transition-colors ${
              disabled
                ? "text-gray-600"
                : active
                  ? "text-white"
                  : "text-gray-400"
            }`}
          >
            {label}
          </p>
          <div className="flex items-center gap-1.5 mt-1 relative z-10">
            <button
              onClick={disabled || count <= 0 ? undefined : onDecrement}
              className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                disabled || count <= 0
                  ? "text-gray-700 cursor-not-allowed"
                  : "text-gray-500 hover:text-blue-400 cursor-pointer active:scale-90"
              }`}
            >
              <Minus size={10} strokeWidth={3} />
            </button>
            <span
              className={`text-[10px] font-bold tabular-nums ${active ? "text-blue-400" : "text-gray-500"}`}
            >
              {count}/{maxCount}
            </span>
            <button
              onClick={disabled || count >= maxCount ? undefined : onIncrement}
              className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                disabled || count >= maxCount
                  ? "text-gray-700 cursor-not-allowed"
                  : "text-gray-500 hover:text-blue-400 cursor-pointer active:scale-90"
              }`}
            >
              <Plus size={10} strokeWidth={3} />
            </button>
          </div>
        </div>

        {tooltip && (
          <span
            className="relative z-20"
            onMouseEnter={(e) => {
              e.stopPropagation();
              setShowTooltip(true);
            }}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <HelpCircle
              size={14}
              className={`transition-colors duration-200 cursor-help ${
                showTooltip
                  ? "text-blue-400"
                  : "text-gray-600 hover:text-blue-400"
              }`}
            />
          </span>
        )}

        {active && (
          <div className="absolute top-2 right-2 flex items-center justify-center w-3 h-3 rounded-full bg-blue-500">
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
          </div>
        )}
      </div>

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
