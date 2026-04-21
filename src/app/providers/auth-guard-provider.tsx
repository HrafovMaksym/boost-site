"use client";

import { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { clearUser } from "@/entities/user/user-slice";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hook";
import { api, onAuthRefreshFailed } from "@/shared/config/axios-config";

const REFRESH_INTERVAL = 14 * 60 * 1000;

export function AuthGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const isRefreshing = useRef(false);

  const handleLogout = useCallback(() => {
    dispatch(clearUser());
    router.replace("/auth/login");
  }, [dispatch, router]);

  const silentRefresh = useCallback(async () => {
    if (!user || isRefreshing.current) return;
    isRefreshing.current = true;
    try {
      await api.post("/auth/refresh");
    } catch {
      handleLogout();
    } finally {
      isRefreshing.current = false;
    }
  }, [user, handleLogout]);

  useEffect(() => {
    const unsubscribe = onAuthRefreshFailed(handleLogout);
    return unsubscribe;
  }, [handleLogout]);

  useEffect(() => {
    if (!user) return;

    const intervalId = setInterval(silentRefresh, REFRESH_INTERVAL);

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
