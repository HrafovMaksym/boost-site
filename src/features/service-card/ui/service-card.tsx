import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import type { GameService } from "@/entities/games/types";
import { Card } from "@/shared/ui";

interface ServiceCardProps {
  service: GameService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const isImageIcon = typeof service.icon !== "string";

  return (
    <div className="group relative h-full">
      {/* Background Glow Effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-b from-accent-primary/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      <Card className="relative h-full flex flex-col p-6 md:p-8 bg-[#0b1021]/80 backdrop-blur-xl border-border hover:border-accent-primary/40 rounded-3xl transition-all duration-500 group-hover:-translate-y-1 shadow-lg group-hover:shadow-[0_8px_40px_-12px_rgba(124,58,237,0.3)] overflow-hidden">
        {/* Subtle decorative top gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-primary/0 via-accent-primary/50 to-accent-secondary/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />

        <div className="flex-1">
          {/* Icon Header */}
          <div className="flex items-center gap-4 mb-6 relative">
            <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
              <div className="absolute inset-0 bg-accent-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              {isImageIcon ? (
                <div className="relative w-8 h-8">
                  <Image
                    src={service.icon as string}
                    alt={service.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <span className="text-3xl relative z-10">
                  {service.icon as string}
                </span>
              )}
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-white transition-colors">
              {service.title}
            </h3>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Features List */}
          <ul className="space-y-3 mb-8">
            {service.features.map((feature, i) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm text-text-secondary group-hover:text-gray-300 transition-colors"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="mt-0.5 w-5 h-5 rounded-full bg-accent-primary/10 flex items-center justify-center shrink-0">
                  <Check
                    size={12}
                    className="text-accent-primary"
                    strokeWidth={3}
                  />
                </div>
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Premium Button */}
        <div className="mt-auto pt-4 border-t border-border/50 group-hover:border-accent-primary/20 transition-colors duration-500">
          <Link
            href={service.href}
            className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white/5 py-3.5 text-sm font-bold text-text-primary border border-white/5 transition-all duration-500 hover:text-white hover:border-transparent hover:shadow-[var(--shadow-glow)]"
          >
            <div className="absolute inset-0 bg-accent-gradient opacity-0 scale-95 transition-all duration-300 hover-trigger" />
            <span className="relative z-10 tracking-wide">
              View More Details
            </span>
            <ArrowRight
              size={18}
              className="relative z-10 transition-transform duration-300 group-[.hover-trigger]:translate-x-1"
            />
          </Link>
        </div>
      </Card>

      {/* Required style to trigger global hover target on inner button */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hover-trigger { transition: all 0.3s ease; }
        a:hover .hover-trigger { opacity: 1; transform: scale(1); }
        a:hover > svg { transform: translateX(4px); }
      `,
        }}
      />
    </div>
  );
}
