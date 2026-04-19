"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/shared/ui";
import { SITE_CONFIG } from "@/entities/games";
import { NAV_LINKS } from "./model/consts";

import { logout } from "@/features/auth/model/actions";
import { useAppSelector } from "@/shared/hooks/redux-hook";

export function Header() {
  const { user } = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg-primary/80 backdrop-blur-xl">
      <Container>
        <div className="flex items-center justify-between h-[var(--header-height)]">
          <Link href="/" className="text-2xl font-bold gradient-text">
            {SITE_CONFIG.name}
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    isActive
                      ? "text-white bg-white/10 shadow-sm"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm text-text-secondary hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/registration"
                  className="px-5 py-2 rounded-full bg-accent-primary hover:bg-accent-primary-hover text-white text-sm font-semibold"
                >
                  Registration
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card hover:bg-bg-card-hover transition"
                >
                  <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center text-white font-bold">
                    U
                  </div>
                  <span className="text-sm">User</span>
                </button>

                <AnimatePresence>
                  {dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-bg-card border border-border shadow-lg overflow-hidden"
                    >
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-bg-card-hover"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => logout()}
                        className="w-full text-left px-4 py-2 hover:bg-bg-card-hover text-red-400"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-1 py-4 border-t border-border">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "text-white bg-white/10"
                          : "text-text-secondary hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <div className="h-px bg-border my-2" />

                {!user ? (
                  <div className="flex flex-col gap-2 px-4 pt-2 pb-1">
                    <Link
                      href="/login"
                      className="w-full py-3 text-center text-sm font-medium text-text-secondary hover:text-white rounded-xl border border-border hover:border-border-hover transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/registration"
                      className="w-full py-3 text-center rounded-xl bg-accent-primary hover:bg-accent-primary-hover text-white text-sm font-semibold transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      Registration
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/profile"
                      className="px-4 py-3 rounded-lg hover:bg-bg-card text-text-secondary hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        logout();
                      }}
                      className="px-4 py-3 rounded-lg hover:bg-bg-card text-red-400 text-left transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
