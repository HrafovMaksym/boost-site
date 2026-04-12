import { Card } from "@/shared/ui";
import type { GameConfig } from "@/entities/games/types";
import { ArrowRight } from "lucide-react";

interface GameCardProps {
  game: GameConfig;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Card href={`/${game.slug}`} glow className="group p-6 md:p-8">
      <div className="flex flex-col h-full">
        <div className="text-4xl md:text-5xl mb-4">{game.icon}</div>
        <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2 group-hover:text-white transition-colors">
          {game.name}
        </h3>
        <p className="text-text-muted text-sm mb-1 font-medium">
          {game.tagline}
        </p>
        <p className="text-text-secondary text-sm leading-relaxed mt-2 mb-6">
          {game.description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {game.services.slice(0, 3).map((service) => (
              <span
                key={service.title}
                className="px-3 py-1 bg-bg-elevated rounded-full text-xs text-text-muted border border-border"
              >
                {service.title}
              </span>
            ))}
            {game.services.length > 3 && (
              <span className="px-3 py-1 bg-bg-elevated rounded-full text-xs text-text-muted border border-border">
                +{game.services.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center text-accent-primary text-sm font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
          View Services
          <ArrowRight size={18} />
        </div>
      </div>
    </Card>
  );
}
