import Image from "next/image";
import Link from "next/link";
import type { GameConfig } from "@/entities/games/types";
import { ArrowRight } from "lucide-react";

interface GameCardProps {
  game: GameConfig;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link
      href={`/${game.slug}`}
      className="group relative block overflow-hidden rounded-[var(--radius-lg)] border border-border hover:border-border-hover transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
    >
      <Image
        src={game.backgroundImage}
        alt={game.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#080d1e] via-[#080d1e]/85 to-[#080d1e]/30 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col justify-end h-full min-h-[380px] p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-1 group-hover:text-white transition-colors">
          {game.name}
        </h3>
        <p className="gradient-text text-sm font-semibold mb-3">
          {game.tagline}
        </p>
        <p className="text-text-secondary text-sm leading-relaxed mb-5">
          {game.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {game.services.slice(0, 3).map((service) => (
            <span
              key={service.title}
              className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-text-primary border border-white/10"
            >
              {service.title}
            </span>
          ))}
          {game.services.length > 3 && (
            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-text-primary border border-white/10">
              +{game.services.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center gradient-text text-sm font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
          View Services
          <ArrowRight size={18} className="text-accent-secondary" />
        </div>
      </div>
    </Link>
  );
}
