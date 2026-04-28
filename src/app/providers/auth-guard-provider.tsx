"use client";

import { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { clearUser } from "@/entities/user/user-slice";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hook";
import {
  refreshAuthToken,
  onAuthRefreshFailed,
  resetAuthState,
} from "@/shared/config/axios-config";

const REFRESH_INTERVAL = 14 * 60 * 1000;
const MIN_REFRESH_GAP = 10 * 60 * 1000;

export function AuthGuardProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const lastRefreshAt = useRef(0);

  const handleLogout = useCallback(() => {
    resetAuthState();
    lastRefreshAt.current = 0;
    dispatch(clearUser());

    router.replace("/login");
  }, [dispatch, router]);

  const silentRefresh = useCallback(
    async (force = false) => {
      if (!user) return;
      const now = Date.now();
      if (!force && now - lastRefreshAt.current < MIN_REFRESH_GAP) return;
      lastRefreshAt.current = now;
      try {
        await refreshAuthToken();
      } catch {
        // onAuthRefreshFailed listener handles logout when refresh truly fails.
      }
    },
    [user],
  );

  useEffect(() => {
    const unsubscribe = onAuthRefreshFailed(handleLogout);
    return unsubscribe;
  }, [handleLogout]);

  useEffect(() => {
    if (!user) return;

    const intervalId = setInterval(() => silentRefresh(true), REFRESH_INTERVAL);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        silentRefresh();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [user, silentRefresh]);

  return <>{children}</>;
}
