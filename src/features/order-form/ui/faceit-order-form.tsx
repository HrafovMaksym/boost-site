"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import premierGif from "@/shared/assets/gif/primier.gif";
import {
  TrendingUp,
  User,
  Zap,
  Users,
  Target,
  GraduationCap,
  ShieldCheck,
  Trophy,
  UserPlus,
  EyeOff,
  Star,
  ChevronRight,
  Clock,
  Rocket,
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
  const desiredElo = currentElo + eloGain;

  const [options, setOptions] = useState({
    selfplay: false,
    priority: false, // +15%
    highRating: false, // +20%
    moreBoosters: false, // +15%
    superExpress: false, // +40%
    premiumCoaching: false, // +80%
    soloOnly: false, // +35%
    offlineMode: false, // +0%
    bringFriend: false, // +70%
    premiumQue: false, // +70%
    starBooster: false, // +40%
  });

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
    if (desiredElo <= currentElo) {
      return 0;
    }

    let basePrice = 0;
    for (let i = currentElo; i < desiredElo; i++) {
      basePrice += getDynamicRate(i);
    }

    let multiplier = 1;
    if (options.selfplay) multiplier += 0.4;
    if (options.priority) multiplier += 0.15;
    if (options.highRating) multiplier += 0.2;
    if (options.moreBoosters) multiplier += 0.15;
    if (options.superExpress) multiplier += 0.4;
    if (options.premiumCoaching) multiplier += 0.8;
    if (options.soloOnly) multiplier += 0.35;
    if (options.offlineMode) multiplier += 0;
    if (options.bringFriend) multiplier += 0.7;
    if (options.premiumQue) multiplier += 0.7;
    if (options.starBooster) multiplier += 0.4;

    return Number((basePrice * multiplier).toFixed(2));
  }, [currentElo, desiredElo, options]);

  const toggleOption = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
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

  return (
    <div className="w-full ">
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
                    max={5000}
                    value={currentElo === 0 ? "" : currentElo}
                    onChange={(e) => {
                      const val =
                        e.target.value === "" ? 0 : Number(e.target.value);
                      if (val >= 0 && val <= 5000) setCurrentElo(val);
                    }}
                    className="w-full bg-[#161b28] border border-[#2d3446] rounded-2xl p-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 font-bold text-white transition-all text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <div className="absolute right-4 top-4">
                    <EloBar elo={desiredElo} size={32} />
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
                    max="1500"
                    step="25"
                    value={eloGain}
                    onChange={(e) => setEloGain(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#0b0e16] rounded-full appearance-none cursor-pointer accent-blue-500 border border-[#1f2330] shadow-inner transition-all hover:brightness-110 active:brightness-125 focus:outline-none"
                    style={{
                      background: `linear-gradient(to right, #7c3aed 0%, #06b6d4 ${((eloGain - 25) / 1475) * 100}%, #0b0e16 ${((eloGain - 25) / 1475) * 100}%, #0b0e16 100%)`,
                    }}
                  />
                  <div className="flex justify-between mt-3">
                    <span className="text-[9px] font-black text-gray-600 tracking-tighter shrink-0">
                      START
                    </span>
                    <div className="h-px bg-[#1f2330] flex-1 mx-3 self-center opacity-30" />
                    <span className="text-[9px] font-black text-gray-600 tracking-tighter shrink-0">
                      END +1500
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
              />
              <OptionItem
                active={options.priority}
                onClick={() => toggleOption("priority")}
                label="Priority"
                pct="+15%"
                icon={<Zap size={16} />}
              />
              <OptionItem
                active={options.highRating}
                onClick={() => toggleOption("highRating")}
                label="High Rating"
                pct="+20%"
                icon={<Star size={16} />}
              />
              <OptionItem
                active={options.moreBoosters}
                onClick={() => toggleOption("moreBoosters")}
                label="Extra Boosters"
                pct="+15%"
                icon={<Users size={16} />}
              />
              <OptionItem
                active={options.superExpress}
                onClick={() => toggleOption("superExpress")}
                label="Super Express"
                pct="+40%"
                icon={<Rocket size={16} />}
              />
              <OptionItem
                active={options.premiumCoaching}
                onClick={() => toggleOption("premiumCoaching")}
                label="Coaching"
                pct="+80%"
                icon={<GraduationCap size={16} />}
              />
              <OptionItem
                active={options.soloOnly}
                onClick={() => toggleOption("soloOnly")}
                label="Solo Only"
                pct="+35%"
                icon={<User size={16} />}
              />
              <OptionItem
                active={options.offlineMode}
                onClick={() => toggleOption("offlineMode")}
                label="Offline Mode"
                pct="FREE"
                icon={<EyeOff size={16} />}
              />
              <OptionItem
                active={options.bringFriend}
                onClick={() => toggleOption("bringFriend")}
                label="Bring Friend"
                pct="+70%"
                icon={<UserPlus size={16} />}
              />
              <OptionItem
                active={options.premiumQue}
                onClick={() => toggleOption("premiumQue")}
                label="Premium Queue"
                pct="+70%"
                icon={<ShieldCheck size={16} />}
              />
              <OptionItem
                active={options.starBooster}
                onClick={() => toggleOption("starBooster")}
                label="Star Booster"
                pct="+40%"
                icon={<Star size={16} />}
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
                    +{eloGain} ELO
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Addons Active</span>
                  <span className="text-blue-500 font-bold">
                    {Object.values(options).filter((v) => v).length} selected
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
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  pct: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative cursor-pointer group flex items-center p-3 px-4 rounded-xl border transition-all duration-300 min-h-[60px] gap-3 overflow-hidden ${
        active
          ? "border-blue-500/50 bg-gradient-to-br from-blue-600/20 to-purple-600/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] scale-[1.02] z-10"
          : "border-[#1f2330] bg-[#161b28] hover:border-[#2d3446] hover:bg-[#1c2234]"
      }`}
    >
      {active && (
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent pointer-events-none" />
      )}

      <div
        className={`transition-all duration-300 ${active ? "text-blue-500 scale-110" : "text-gray-500 group-hover:text-gray-400"}`}
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

      {active && (
        <div className="absolute top-2 right-2 flex items-center justify-center w-3 h-3 rounded-full bg-blue-500">
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
        </div>
      )}
    </button>
  );
}
