import { Card, Button } from "@/shared/ui";
import type { GameService } from "@/shared/config/games";

interface ServiceCardProps {
  service: GameService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card glow className="p-6 md:p-8 flex flex-col h-full">
      <div className="text-3xl md:text-4xl mb-4">{service.icon}</div>

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

      <div className="mt-auto">
        <Button href={service.href} variant="secondary" fullWidth>
          Learn More
        </Button>
      </div>
    </Card>
  );
}
