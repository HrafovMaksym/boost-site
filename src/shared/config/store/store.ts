import { User } from "@/entities/user/types";
import { userReducer } from "@/entities/user/user-slice";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = (initialUser?: User | null) => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState: {
      user: { user: initialUser ?? null },
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
