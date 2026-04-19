import { Status } from "@/shared/types/status";
import {
  ForgotPasswordData,
  ForgotPasswordResponse,
  LoginData,
  LoginResponse,
  RegistrationData,
  RegistrationResponse,
  ResetPasswordData,
  ResetPasswordResponse,
  VerifyData,
  VerifyResponse,
} from "./types";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { authApi } from "./auth-api";

type initialStateProps = {
  status: Status;
  error: string | null;
};

const initialState: initialStateProps = {
  status: Status.IDLE,
  error: null,
};

export const registration = createAsyncThunk<
  RegistrationResponse,
  RegistrationData,
  { rejectValue: string }
>("auth/register", async (data: RegistrationData, thunkAPI) => {
  try {
    const response = await authApi.registration(data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "Registration failed";
    return thunkAPI.rejectWithValue(message);
  }
});

export const verifyRegistration = createAsyncThunk<
  VerifyResponse,
  VerifyData,
  { rejectValue: string }
>("auth/verifyRegistration", async (data: VerifyData, thunkAPI) => {
  try {
    const response = await authApi.verifyRegistration(data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "Token is not valid";
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk<
  LoginResponse,
  LoginData,
  { rejectValue: string }
>("auth/login", async (data: LoginData, thunkAPI) => {
  try {
    const response = await authApi.login(data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "Login failed";
    return thunkAPI.rejectWithValue(message);
  }
});

export const forgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordData,
  { rejectValue: string }
>("auth/forgotPassword", async (data: ForgotPasswordData, thunkAPI) => {
  try {
    const response = await authApi.forgotPassword(data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "Send Email failed";
    return thunkAPI.rejectWithValue(message);
  }
});

export const resetPassword = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordData,
  { rejectValue: string }
>("auth/resetPassword", async (data: ResetPasswordData, thunkAPI) => {
  try {
    const response = await authApi.resetPassword(data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "Recover password failed";
    return thunkAPI.rejectWithValue(message);
  }
});

export const verifyToken = createAsyncThunk<
  VerifyResponse,
  VerifyData,
  { rejectValue: string }
>("auth/verifyToken", async (data: VerifyData, thunkAPI) => {
  try {
    const response = await authApi.validateToken(data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || "Token is not valid";
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state) => {
        state.status = Status.SUCCEEDED;
      })
      .addCase(registration.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(login.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = Status.SUCCEEDED;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = Status.SUCCEEDED;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = Status.SUCCEEDED;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(verifyToken.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state) => {
        state.status = Status.SUCCEEDED;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(verifyRegistration.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(verifyRegistration.fulfilled, (state) => {
        state.status = Status.SUCCEEDED;
      })
      .addCase(verifyRegistration.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const authReducer = authSlice.reducer;
