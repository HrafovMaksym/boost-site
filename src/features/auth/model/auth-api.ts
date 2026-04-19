import { api } from "@/shared/config/axios-config";
import { AxiosResponse } from "axios";
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

export const authApi = {
  registration: (
    data: RegistrationData,
  ): Promise<AxiosResponse<RegistrationResponse>> =>
    api.post<RegistrationResponse>("auth/register", data, {
      withCredentials: true,
    }),

  login: (data: LoginData): Promise<AxiosResponse<LoginResponse>> =>
    api.post<LoginResponse>("auth/login", data, {
      withCredentials: true,
    }),

  forgotPassword: (
    data: ForgotPasswordData,
  ): Promise<AxiosResponse<ForgotPasswordResponse>> =>
    api.post<ForgotPasswordResponse>("auth/forgot-password", data),

  validateToken: (data: VerifyData): Promise<AxiosResponse<VerifyResponse>> =>
    api.get<VerifyResponse>(`auth/validate-token?token=${data.token}`),

  resetPassword: (
    data: ResetPasswordData,
  ): Promise<AxiosResponse<ResetPasswordResponse>> =>
    api.post<ResetPasswordResponse>("auth/reset-password", data, {
      withCredentials: true,
    }),

  verifyRegistration: (
    data: VerifyData,
  ): Promise<AxiosResponse<VerifyResponse>> =>
    api.get<VerifyResponse>(`auth/verify-register?token=${data.token}`),
};
