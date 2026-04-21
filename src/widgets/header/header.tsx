"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/shared/ui";
import { SITE_CONFIG } from "@/entities/games";
import logo from "@/shared/assets/logo.svg";
import { NAV_LINKS } from "./model/consts";

import { logout } from "@/features/auth/model/actions";
import { clearUser } from "@/entities/user/user-slice";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hook";

export function Header() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg-primary/80 backdrop-blur-xl">
      <Container>
        <div className="flex items-center justify-between h-[var(--header-height)]">
          <Link
            href="/"
            className="flex items-center  text-2xl font-bold gradient-text"
          >
            <Image src={logo} alt="Logo" width={42} height={42} />
            <span className="font-[Helvetica] uppercase">
              {SITE_CONFIG.name}
            </span>
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
                  className="px-4 py-2 text-sm text-text-secondary hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/registration"
                  className="px-5 py-2 rounded-full bg-accent-primary hover:bg-accent-primary-hover text-white text-sm font-semibold transition-colors"
                >
                  Registration
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full bg-bg-card hover:bg-bg-card-hover border border-border transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-primary to-blue-600 flex items-center justify-center text-white font-bold text-xs uppercase shadow-md">
                    {user.name?.charAt(0) || "U"}
                  </div>
                  <span className="text-sm font-semibold text-white max-w-[120px] truncate">
                    {user.name || "User"}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-text-muted transition-transform duration-200 ${dropdown ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-bg-card border border-border shadow-2xl shadow-black/40 overflow-hidden p-1.5"
                    >
                      <div className="px-3 py-3 border-b border-border mb-1">
                        <p className="text-white font-bold text-sm truncate">
                          {user.name}
                        </p>
                        <p className="text-text-muted text-xs truncate">
                          {user.email}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setDropdown(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/profile/orders"
                        onClick={() => setDropdown(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                      >
                        Orders
                      </Link>

                      <div className="h-px bg-border my-1" />

                      <button
                        onClick={() => {
                          setDropdown(false);
                          dispatch(clearUser());
                          logout();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
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
                  <div className="flex flex-col gap-1 px-2">
                    <div className="flex items-center gap-3 px-3 py-3 mb-1">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm uppercase shadow-md">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-bold text-sm truncate">
                          {user.name}
                        </p>
                        <p className="text-text-muted text-xs truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="px-4 py-3 rounded-xl hover:bg-white/5 text-text-secondary hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/profile/orders"
                      className="px-4 py-3 rounded-xl hover:bg-white/5 text-text-secondary hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Orders
                    </Link>
                    <div className="h-px bg-border my-1 mx-3" />
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        dispatch(clearUser());
                        logout();
                      }}
                      className="px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 text-left transition-colors"
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
