import Link from "next/link";
import { Container } from "@/shared/ui";
import { SITE_CONFIG } from "@/entities/games";

const FOOTER_LINKS = {
  Support: [
    { label: "Discord", href: "https://discord.gg/XzMFHxdpJP" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  "CS2 Services": [
    { label: "Faceit Boost", href: "/cs2/faceit" },
    { label: "Premier Boost", href: "/cs2/premier" },
    { label: "Coaching", href: "/cs2/coaching" },
  ],
  Games: [{ label: "CS2", href: "/cs2" }],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          <div className="col-span-2 md:col-span-1 md:pr-8">
            <Link
              href="/"
              className="text-xl font-bold gradient-text tracking-tight"
            >
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-3 text-text-muted text-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-text-primary font-semibold text-sm mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-text-muted hover:text-text-primary text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm ">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}.
            <br />
            CarryMe isn’t endorsed or in any way affiliated with Valve
            Corporation, Riot Games, Inc., and doesn’t reflect the views or
            opinions of anyone officially involved in producing or managing CS2,
            Counter-Strike 2, Valorant, Dota 2, CS2, Counter-Strike 2, Dota 2
            are registered trademarks of the Valve Corporation. Valorant is
            registered trademarks of the Riot Games, Inc. Any other marks are
            trademarks and/or registered trademarks of their respective owners.
          </p>
        </div>
      </Container>
    </footer>
  );
}
