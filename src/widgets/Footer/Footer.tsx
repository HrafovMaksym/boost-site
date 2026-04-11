import Link from "next/link";
import { Container } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config/games";

const FOOTER_LINKS = {
  Games: [
    { label: "CS2", href: "/cs2" },
    { label: "Dota 2", href: "/dota2" },
    { label: "Valorant", href: "/valorant" },
  ],
  "CS2 Services": [
    { label: "Faceit Boost", href: "/cs2/faceit" },
    { label: "Premier Boost", href: "/cs2/premier" },
    { label: "ESEA Boost", href: "/cs2/esea" },
    { label: "Coaching", href: "/cs2/coaching" },
  ],
  Support: [
    { label: "Discord", href: "#" },
    { label: "Telegram", href: "#" },
    { label: "FAQ", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
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

          {/* Links */}
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

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-text-muted hover:text-text-primary text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-text-muted hover:text-text-primary text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
