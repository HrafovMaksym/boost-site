import { ReactNode } from "react";

import { ReduxProvider } from "./redux-provider";
import { ToastProvider } from "./toast-provider";
import { User } from "@/entities/user/types";

export const MainProvider = ({
  initialUser,
  children,
}: {
  initialUser: User | null;
  children: ReactNode;
}) => {
  return (
    <>
      <ReduxProvider initialUser={initialUser}>{children}</ReduxProvider>
      <ToastProvider></ToastProvider>
    </>
  );
};
