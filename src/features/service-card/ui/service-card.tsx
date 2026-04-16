import Image from "next/image";
import { Card, Button } from "@/shared/ui";
import type { GameService } from "@/entities/games/types";

interface ServiceCardProps {
  service: GameService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const isImageIcon = typeof service.icon !== "string";

  return (
    <Card glow className="p-6 md:p-8 flex flex-col h-full">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="mb-4">
            {isImageIcon && (
              <div className="relative w-12 h-12 md:w-16 md:h-16">
                <Image
                  src={service.icon}
                  alt={service.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold text-text-primary mb-2">
            {service.title}
          </h3>

          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            {service.description}
          </p>

          <ul className="space-y-2 mb-8">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-text-secondary"
              >
                <span className="text-accent-primary text-xs">&#10003;</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <Button href={service.href} variant="secondary" fullWidth>
            Learn More
          </Button>
        </div>
      </div>
    </Card>
  );
}
