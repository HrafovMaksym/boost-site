import { ReactNode } from "react";

import { ReduxProvider } from "./redux-provider";
import { ToastProvider } from "./toast-provider";
import { User } from "@/entities/user/types";
import { AuthGuardProvider } from "./auth-guard-provider";

export const MainProvider = ({
  initialUser,
  children,
}: {
  initialUser: User | null;
  children: ReactNode;
}) => {
  return (
    <>
      <ReduxProvider initialUser={initialUser}>
        <AuthGuardProvider>{children} </AuthGuardProvider>
      </ReduxProvider>
      <ToastProvider></ToastProvider>
    </>
  );
};
