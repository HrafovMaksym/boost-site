import { StaticImageData } from "next/image";

export interface GameService {
  title: string;
  description: string;
  href: string;
  icon: string;
  features: string[];
}

export interface GameConfig {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  backgroundImage: StaticImageData;
  gradient: string;
  services: GameService[];
}
