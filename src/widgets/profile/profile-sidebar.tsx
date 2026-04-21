"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { menuItems } from "./model/consts";
import { logout } from "@/features/auth/model/actions";
import { clearUser } from "@/entities/user/user-slice";
import { LogOut, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hook";

export function ProfileSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  return (
    <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-1 h-fit">
      <div className="p-5 bg-bg-secondary/50 border border-border rounded-2xl mb-1">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-blue-600 flex items-center justify-center text-white font-black text-lg uppercase shadow-lg shadow-accent-primary/20">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm truncate">{user?.name || "User"}</p>
            <p className="text-text-muted text-xs truncate">{user?.email || ""}</p>
          </div>
        </div>
      </div>

      <div className="p-3 bg-bg-secondary/50 border border-border rounded-2xl">
        <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest px-3 pt-1 pb-3">
          Account
        </p>

        <nav className="flex flex-col gap-0.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/20"
                    : "text-text-secondary hover:text-white hover:bg-white/5",
                )}
              >
                <Icon
                  size={18}
                  className={clsx(
                    "shrink-0 transition-colors",
                    isActive
                      ? "text-white"
                      : "text-text-muted group-hover:text-white",
                  )}
                />
                <span className="font-semibold text-sm flex-1">{item.name}</span>
                {isActive && <ChevronRight size={14} className="text-white/50" />}
              </Link>
            );
          })}
        </nav>

        <div className="h-px bg-border my-2 mx-3" />

        <button
          onClick={() => {
            dispatch(clearUser());
            logout();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-red-500/70 hover:text-red-400 hover:bg-red-500/10 group cursor-pointer"
        >
          <LogOut
            size={18}
            className="shrink-0 text-red-500/40 group-hover:text-red-500 transition-colors"
          />
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
