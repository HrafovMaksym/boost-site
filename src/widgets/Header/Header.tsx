"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/shared/ui";
import { SITE_CONFIG } from "@/shared/config/games";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "CS2", href: "/cs2" },
  { label: "Dota 2", href: "/dota2" },
  { label: "Valorant", href: "/valorant" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-border"
      style={{
        background: "rgba(7, 7, 13, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <Container>
        <div className="flex items-center justify-between h-[var(--header-height)]">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold gradient-text tracking-tight"
          >
            {SITE_CONFIG.name}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-card transition-all duration-300 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/cs2"
              className="inline-flex items-center px-5 py-2.5 bg-accent-primary hover:bg-accent-primary-hover text-white text-sm font-semibold rounded-full transition-all duration-300 glow-effect"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-80 pb-6" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-card transition-all duration-300 text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cs2"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-5 py-3 bg-accent-primary hover:bg-accent-primary-hover text-white text-base font-semibold rounded-full transition-all duration-300"
            >
              Order Now
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
