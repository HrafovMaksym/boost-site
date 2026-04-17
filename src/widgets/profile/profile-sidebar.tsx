"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { clsx } from "clsx";
import { menuItems } from "./model/consts";
import { logout } from "@/features/auth/model/actions";
import { LogOut } from "lucide-react";

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 flex flex-col gap-2 p-4 bg-bg-secondary/50 border border-border rounded-2xl h-fit">
      <div className="mb-4 px-2">
        <h2 className="text-text-muted text-xs font-bold uppercase tracking-widest">
          Account
        </h2>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/20"
                  : "text-text-secondary hover:text-white hover:bg-bg-card-hover",
              )}
            >
              <Icon
                size={18}
                className={clsx(
                  "transition-colors",
                  isActive
                    ? "text-white"
                    : "text-text-muted group-hover:text-text-primary",
                )}
              />
              <span className="font-semibold text-sm">{item.name}</span>
            </Link>
          );
        })}

        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-red-500/80 hover:text-red-400 hover:bg-red-500/10 mt-4 group"
        >
          <LogOut
            size={18}
            className="text-red-500/50 group-hover:text-red-500"
          />
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </nav>
    </aside>
  );
}
