import { z } from "zod";

const allowedDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "icloud.com",
  "mail.ru",
  "yandex.ru",
  "hotmail.com",
  "aol.com",
  "protonmail.com",
  "zoho.com",
];

export const registrationSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email address is required")
      .email("Invalid email address")
      .refine((val) => {
        const domain = val.split("@")[1];
        return !!domain && allowedDomains.includes(domain);
      }, "Email domain is not allowed"),

    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),

    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email address is required")
    .email("Invalid email address")
    .refine((val) => {
      const domain = val.split("@")[1];
      return !!domain && allowedDomains.includes(domain);
    }, "Email domain is not allowed"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
});

export const forgotPassSchema = z.object({
  email: z
    .string()
    .nonempty("Email address is required")
    .email("Invalid email address")
    .refine((val) => {
      const domain = val.split("@")[1];
      return !!domain && allowedDomains.includes(domain);
    }, "Email domain is not allowed"),
});

export const recoverPassSchema = z
  .object({
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),

    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPassData = z.infer<typeof forgotPassSchema>;
export type RecoverPassData = z.infer<typeof recoverPassSchema>;
