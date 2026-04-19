import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";
import { login, verifyRegistration } from "@/features/auth/model/auth-slice";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const responseUser = action.payload.user;
      state.user = {
        id: responseUser.id,
        email: responseUser.email,
        name: responseUser.name || "User",
        createdAt: responseUser.createdAt,
      };
    });

    builder.addCase(verifyRegistration.fulfilled, (state, action) => {
      if (action.payload.user) {
        const responseUser = action.payload.user;
        state.user = {
          id: responseUser.id,
          email: responseUser.email,
          name: responseUser.name || "User",
          createdAt: responseUser.createdAt,
        };
      }
    });
  },
});

export type { User };
export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
