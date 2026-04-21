"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import premierGif from "@/shared/assets/gif/primier.gif";
import {
  User,
  Zap,
  Users,
  Target,
  GraduationCap,
  Trophy,
  UserPlus,
  ChevronRight,
  Clock,
  HelpCircle,
  Plus,
  Minus,
} from "lucide-react";

import { useAppSelector } from "@/shared/hooks/redux-hook";
import Link from "next/link";
import { api } from "@/shared/config/axios-config";
import { toast } from "react-hot-toast";
import ScoreBadge from "./premier-bar";

export function PremiereOrderForm() {
  const { user } = useAppSelector((state) => state.user);
  const [currentRating, setCurrentRating] = useState<number>(10000);
  const [ratingGain, setRatingGain] = useState<number>(2000);
  const [isOrdering, setIsOrdering] = useState(false);
  const maxGain = 30000 - currentRating;
  const safeGain =
    maxGain >= 500 ? Math.max(500, Math.min(ratingGain, maxGain)) : 0;
  const desiredRating = currentRating + safeGain;

  const [options, setOptions] = useState({
    selfplay: false,
    priority: false,
    boostersAmount: 0,
    express: false,
    coaching: false,
    solo: false,
    bringFriend: 0,
    rankedBooster: false,
  });

  const soloDisabled = options.selfplay;
  const bringFriendDisabled = !options.selfplay;

  const boostersMaxCount = options.selfplay ? Math.min(4, 3 - options.bringFriend) : 4;
  const friendsMaxCount = bringFriendDisabled ? 0 : Math.min(3, 3 - options.boostersAmount);

  const getPremiereRate = (rating: number) => {
    if (rating < 15000) return 0.01608;
    if (rating < 21000) return 0.01916;
    if (rating < 25000) return 0.02978;
    if (rating < 31000) return 0.04751;
    return 0.10295;
  };

  const price = useMemo(() => {
    if (desiredRating <= currentRating) return 0;

    let basePrice = 0;
    for (let i = currentRating; i < desiredRating; i++) {
      basePrice += getPremiereRate(i);
    }

    let multiplier = 1;
    if (options.selfplay) multiplier += 0.4;
    if (options.priority) multiplier += 0.15;
    multiplier += 0.15 * options.boostersAmount;
    if (options.express) multiplier += 0.4;
    if (options.coaching) multiplier += 0.8;
    if (options.solo) multiplier += 0.35;
    multiplier += 0.7 * options.bringFriend;
    if (options.rankedBooster) multiplier += 0.4;

    return Number((basePrice * multiplier).toFixed(2));
  }, [currentRating, desiredRating, options]);

  const toggleOption = (key: string) => {
    setOptions((prev) => {
      const next = { ...prev };

      if (key === "selfplay") {
        next.selfplay = !prev.selfplay;
        if (next.selfplay) {
          next.solo = false;
          const maxBoosters = 3 - next.bringFriend;
          if (next.boostersAmount > maxBoosters) next.boostersAmount = maxBoosters;
        }
        if (!next.selfplay) next.bringFriend = 0;
      } else if (key === "solo") {
        if (!soloDisabled) next.solo = !prev.solo;
      } else {
        (next as Record<string, boolean | number>)[key] = !(
          prev as Record<string, boolean | number>
        )[key];
      }

      return next;
    });
  };

  const adjustCounter = (
    key: "boostersAmount" | "bringFriend",
    delta: number,
  ) => {
    setOptions((prev) => {
      const next = { ...prev };
      if (key === "boostersAmount") {
        const max = next.selfplay ? Math.min(4, 3 - next.bringFriend) : 4;
        next.boostersAmount = Math.max(0, Math.min(prev.boostersAmount + delta, max));
      } else {
        const max = Math.min(3, 3 - next.boostersAmount);
        next.bringFriend = Math.max(0, Math.min(prev.bringFriend + delta, max));
      }
      return next;
    });
  };

  const handleOrder = async () => {
    if (!user) return;
    setIsOrdering(true);
    try {
      const { data } = await api.post("stripe/checkout", {
        service: "CS2 Premiere Boost",
        currentValue: currentRating,
        desiredValue: desiredRating,
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

  const sliderPercent =
    maxGain <= 500 ? 0 : ((safeGain - 500) / (maxGain - 500)) * 100;

  const addonsCount = [
    options.selfplay,
    options.priority,
    options.boostersAmount > 0,
    options.express,
    options.coaching,
    options.solo,
    options.bringFriend > 0,
    options.rankedBooster,
  ].filter(Boolean).length;

  return (
    <div className="w-full">
      <div className="bg-[#0b0e16] border border-[#1f2330] rounded-[32px] p-1 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
          <div className="lg:col-span-3 p-8 border-b lg:border-b-0 lg:border-r border-[#1f2330] bg-gradient-to-b from-transparent to-purple-500/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-purple-600/10 p-1.5 rounded-lg text-purple-500 shadow-inner overflow-hidden border border-purple-500/20">
                <Image
                  src={premierGif}
                  alt="Premiere"
                  width={32}
                  height={32}
                  className="scale-110"
                />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter italic text-white leading-none">
                  CarryMe
                </h2>
                <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold opacity-80">
                  Premiere Boost
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
                    max={30000}
                    step={100}
                    value={currentRating === 0 ? "" : currentRating}
                    onChange={(e) => {
                      const val =
                        e.target.value === "" ? 0 : Number(e.target.value);
                      if (val >= 0 && val <= 30000) setCurrentRating(val);
                    }}
                    className="w-full bg-[#161b28] border border-[#2d3446] rounded-2xl p-4 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 font-bold text-white transition-all text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="absolute right-4 top-4">
                    <ScoreBadge value={currentRating} />
                  </div>
                </div>
              </div>

              <div className="space-y-4 group p-4 bg-[#161b28]/50 border border-[#2d3446]/50 rounded-2xl relative transition-all hover:bg-[#161b28]">
                <div className="flex justify-between items-end px-1">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Target Rating
                    </label>
                    <span className="text-2xl font-black text-white">
                      {desiredRating.toLocaleString()}
                    </span>
                  </div>
                  <ScoreBadge value={desiredRating} />
                </div>

                <div className="relative pt-4">
                  <input
                    type="range"
                    min="500"
                    max={Math.max(500, maxGain)}
                    step="100"
                    value={safeGain}
                    disabled={maxGain < 500}
                    onChange={(e) => setRatingGain(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#0b0e16] rounded-full appearance-none cursor-pointer accent-purple-500 border border-[#1f2330] shadow-inner transition-all hover:brightness-110 active:brightness-125 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background:
                        maxGain < 500
                          ? "#0b0e16"
                          : `linear-gradient(to right, #7c3aed 0%, #a855f7 ${sliderPercent}%, #0b0e16 ${sliderPercent}%, #0b0e16 100%)`,
                    }}
                  />
                  <div className="flex justify-between mt-3">
                    <span className="text-[9px] font-black text-gray-600 tracking-tighter shrink-0">
                      +500
                    </span>
                    <div className="h-px bg-[#1f2330] flex-1 mx-3 self-center opacity-30" />
                    <span className="text-[9px] font-black text-gray-600 tracking-tighter shrink-0">
                      MAX 30,000
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-2 text-[10px] text-gray-500 font-medium px-1">
                <Clock size={12} />
                <span>EST. COMPLETION: 48-72H</span>
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
                icon={<Users size={16} />}
                tooltip="Play in a lobby with our professionals. Increase your rating while playing alongside pros without sharing your account."
              />
              <OptionItem
                active={options.priority}
                onClick={() => toggleOption("priority")}
                label="Priority"
                pct="+15%"
                icon={<Target size={16} />}
                tooltip="Your order gets top priority in the queue. We will find and assign a booster to your order as quickly as possible."
              />
              <CounterItem
                count={options.boostersAmount}
                maxCount={boostersMaxCount}
                onIncrement={() => adjustCounter("boostersAmount", 1)}
                onDecrement={() => adjustCounter("boostersAmount", -1)}
                label="Extra Booster"
                pctPerUnit="+15%"
                icon={<UserPlus size={16} />}
                tooltip="We will add another booster to your lobby. This ensures an incredible win rate and even faster completion."
              />
              <OptionItem
                active={options.express}
                onClick={() => toggleOption("express")}
                label="Express"
                pct="+40%"
                icon={<Zap size={16} />}
                tooltip="Accelerated completion. Our boosters will dedicate maximum time to your order to reach the target faster than standard estimates."
              />
              <OptionItem
                active={options.coaching}
                onClick={() => toggleOption("coaching")}
                label="Coaching"
                pct="+80%"
                icon={<GraduationCap size={16} />}
                tooltip="Get valuable tips and an analysis of your gameplay from the booster. A great chance to improve your personal skill level."
              />
              <OptionItem
                active={options.solo}
                onClick={() => toggleOption("solo")}
                label="Solo Only"
                pct="+35%"
                icon={<User size={16} />}
                tooltip="The booster will play strictly solo on your account, mimicking natural activity for maximum security."
                disabled={soloDisabled}
              />
              <CounterItem
                count={options.bringFriend}
                maxCount={friendsMaxCount}
                onIncrement={() => adjustCounter("bringFriend", 1)}
                onDecrement={() => adjustCounter("bringFriend", -1)}
                label="Bring Friend"
                pctPerUnit="+70%"
                icon={<Users size={16} />}
                tooltip="You and a friend order a boost to play together and boost your rank in the same lobby. Requires Self Play."
                disabled={bringFriendDisabled}
              />
              <OptionItem
                active={options.rankedBooster}
                onClick={() => toggleOption("rankedBooster")}
                label="Ranked Booster"
                pct="+40%"
                icon={<Trophy size={16} />}
                tooltip="Your order will be handled exclusively by a top-tier performer with the highest win rate in our service."
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
                  <span className="text-gray-400">Start Rating</span>
                  <span className="text-white font-bold">
                    {currentRating.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Target Rating</span>
                  <span className="text-white font-bold">
                    {desiredRating.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Rating Gain</span>
                  <span className="text-purple-400 font-bold">
                    +{safeGain.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Addons Active</span>
                  <span className="text-purple-400 font-bold">
                    {addonsCount} selected
                  </span>
                </div>
                <div className="h-px bg-white/5 w-full my-4" />
                <div className="flex flex-col">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
                    Final Price
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-purple-500">
                      €
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
                className="w-full cursor-pointer bg-purple-600 hover:bg-purple-500 py-5 rounded-2xl font-black transition-all text-white flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-purple-900/20 group uppercase tracking-tight text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-[20px] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
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
                      className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-center text-xs font-bold text-white transition-all shadow-lg shadow-purple-500/20 active:scale-95"
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
              ? "border-purple-500/50 bg-gradient-to-br from-purple-600/20 to-pink-600/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] scale-[1.02] z-10"
              : "border-[#1f2330] bg-[#161b28] hover:border-[#2d3446] hover:bg-[#1c2234]"
        }`}
      >
        {active && !disabled && (
          <div className="absolute inset-0 rounded-xl bg-gradient-radial from-purple-500/10 to-transparent pointer-events-none" />
        )}

        <div
          className={`transition-all duration-300 ${
            disabled
              ? "text-gray-700"
              : active
                ? "text-purple-500 scale-110"
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
                  ? "text-purple-400"
                  : "text-gray-600 hover:text-purple-400"
              }`}
            />
          </span>
        )}

        {active && !disabled && (
          <div className="absolute top-2 right-2 flex items-center justify-center w-3 h-3 rounded-full bg-purple-500">
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
            ? "border-[#1a1d27] bg-[#12151e] opacity-40"
            : active
              ? "border-purple-500/50 bg-gradient-to-br from-purple-600/20 to-pink-600/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] scale-[1.02] z-10"
              : "border-[#1f2330] bg-[#161b28]"
        }`}
      >
        {active && (
          <div className="absolute inset-0 rounded-xl bg-gradient-radial from-purple-500/10 to-transparent pointer-events-none" />
        )}

        <div
          className={`transition-all duration-300 ${
            disabled
              ? "text-gray-700"
              : active
                ? "text-purple-500 scale-110"
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
                  : "text-gray-500 hover:text-purple-400 cursor-pointer active:scale-90"
              }`}
            >
              <Minus size={10} strokeWidth={3} />
            </button>
            <span
              className={`text-[10px] font-bold tabular-nums ${active ? "text-purple-400" : "text-gray-500"}`}
            >
              {count}/{maxCount}
            </span>
            <button
              onClick={
                disabled || count >= maxCount ? undefined : onIncrement
              }
              className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                disabled || count >= maxCount
                  ? "text-gray-700 cursor-not-allowed"
                  : "text-gray-500 hover:text-purple-400 cursor-pointer active:scale-90"
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
                  ? "text-purple-400"
                  : "text-gray-600 hover:text-purple-400"
              }`}
            />
          </span>
        )}

        {active && (
          <div className="absolute top-2 right-2 flex items-center justify-center w-3 h-3 rounded-full bg-purple-500">
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
