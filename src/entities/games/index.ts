import { GameConfig } from "./types";
import dota from "@/shared/assets/dota.png";
import cs2 from "@/shared/assets/cs.png";
import valorant from "@/shared/assets/val.jpg";
export const GAMES: GameConfig[] = [
  {
    name: "CS2",
    slug: "cs2",
    tagline: "Dominate the Competition",
    description:
      "Professional CS2 boosting services. Climb ranks, improve your Faceit level, and reach your Premier goals with our expert players.",
    backgroundImage: cs2,
    gradient: "from-yellow-500 to-orange-600",
    services: [
      {
        title: "Faceit Boost",
        description:
          "Level up your Faceit account from any level to your desired rank. Our pros maintain high win rates.",
        href: "/cs2/faceit",
        icon: "🏆",
        features: [
          "Levels 1-10",
          "High win rate",
          "Fast completion",
          "Live streaming",
        ],
      },
      {
        title: "Premier Boost",
        description:
          "Increase your Premier rating with consistent wins. Reach any rating tier you desire.",
        href: "/cs2/premier",
        icon: "⭐",
        features: [
          "Any rating",
          "Solo or duo queue",
          "Flexible schedule",
          "Rating guarantee",
        ],
      },

      {
        title: "Coaching",
        description:
          "Learn from professional CS2 players. Improve your aim, game sense, and strategy with 1-on-1 sessions.",
        href: "/cs2/coaching",
        icon: "🎓",
        features: [
          "1-on-1 sessions",
          "Demo review",
          "Strategy coaching",
          "Aim training",
        ],
      },
    ],
  },
  {
    name: "Dota 2",
    slug: "dota2",
    tagline: "Rise Through the Ranks",
    description:
      "Expert Dota 2 MMR boosting and coaching. Our 7000+ MMR players will help you reach your desired rank safely.",
    backgroundImage: dota,
    gradient: "from-red-500 to-rose-600",
    services: [
      {
        title: "MMR Boost",
        description:
          "Increase your matchmaking rating with our experienced players.",
        href: "/dota2",
        icon: "📈",
        features: [
          "Any MMR range",
          "Fast completion",
          "Account safety",
          "Progress tracking",
        ],
      },
      {
        title: "Medal Boost",
        description: "Reach your desired medal rank — from Herald to Immortal.",
        href: "/dota2",
        icon: "🏅",
        features: [
          "All medals",
          "Win streak",
          "Duo available",
          "Guaranteed result",
        ],
      },
      {
        title: "Calibration",
        description:
          "Get the best possible calibration results for the new season.",
        href: "/dota2",
        icon: "🎯",
        features: [
          "10 games",
          "High win rate",
          "Best placement",
          "New accounts",
        ],
      },
    ],
  },
  {
    name: "Valorant",
    slug: "valorant",
    tagline: "Unlock Your True Rank",
    description:
      "Professional Valorant rank boosting. From Iron to Radiant, our top-tier players will carry you to victory.",
    backgroundImage: valorant,
    gradient: "from-rose-500 to-pink-600",
    services: [
      {
        title: "Rank Boost",
        description:
          "Climb from any rank to your desired tier with our expert players.",
        href: "/valorant",
        icon: "🚀",
        features: [
          "Iron to Radiant",
          "All acts",
          "Fast delivery",
          "Duo option",
        ],
      },
      {
        title: "Placement Matches",
        description:
          "Get the best results in your placement matches for the new act.",
        href: "/valorant",
        icon: "🎯",
        features: [
          "5 matches",
          "Best placement",
          "New accounts",
          "Experienced pros",
        ],
      },
      {
        title: "Win Boost",
        description: "Purchase a set number of wins at your current rank.",
        href: "/valorant",
        icon: "✅",
        features: [
          "Choose # of wins",
          "Any rank",
          "Quick games",
          "Flexible timing",
        ],
      },
    ],
  },
];

export const SITE_CONFIG = {
  name: "BoostPro",
  tagline: "Level Up Your Game",
  description:
    "Professional gaming boost services for CS2, Dota 2, and Valorant. Fast, safe, and affordable.",
  stats: {
    ordersCompleted: "15,000+",
    happyCustomers: "10,000+",
    averageRating: "4.9",
    proPlayers: "200+",
  },
};
