import { api } from "@/shared/config/axios-config";
import {
  ForgotPasswordData,
  LoginData,
  RegistrationData,
  ResetPasswordData,
  VerifyData,
} from "./types";

export const authApi = {
  registration: (data: RegistrationData) =>
    api.post("auth/register", data, {
      withCredentials: true,
    }),
  login: (data: LoginData) =>
    api.post("auth/login", data, {
      withCredentials: true,
    }),

  forgotPassword: (data: ForgotPasswordData) =>
    api.post("auth/forgot-password", data),

  validateToken: (data: VerifyData) =>
    api.get(`auth/validate-token?token=${data.token}`),
  resetPassword: (data: ResetPasswordData) =>
    api.post("auth/reset-password", data, {
      withCredentials: true,
    }),
  verifyRegistration: (data: VerifyData) =>
    api.get(`auth/verify-register?token=${data.token}`),
};
