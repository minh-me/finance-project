import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const calculatePasswordStrength = (password: string) => {
  let progress = 0;

  // 1. Use a minimum of 8 characters
  if (password.length >= 8) {
    progress += 25;
  }

  // 2. Use a mix of letters and numbers
  if (/[A-Za-z]/.test(password) && /\d/.test(password)) {
    progress += 25;
  }

  // 3. Use at least one special character
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    progress += 25;
  }

  // 4. Use at least one uppercase and one lowercase character
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
    progress += 25;
  }

  return Math.min(progress, 100);
};

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/; // Simplified phone number regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

export const getAuthValues = (authKey: string) => {
  if (phoneRegex.test(authKey)) {
    return { phone: authKey };
  }

  if (emailRegex.test(authKey)) {
    return { email: authKey };
  }

  return {};
};

export const AuthKeySchema = z
  .string({ required_error: "Email or phone is required" })
  .trim()
  .refine(val => phoneRegex.test(val) || emailRegex.test(val), {
    message: "Invalid email or phone",
  });

export const LoginSchema = toTypedSchema(
  z.object({
    authKey: AuthKeySchema,
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
  }),
);

export const RegisterSchema = toTypedSchema(
  z
    .object({
      fullName: z
        .string({ required_error: "Full name is required" })
        .trim()
        .min(3, { message: "Full name must be at least 3 characters" }),
      authKey: AuthKeySchema,
      password: z
        .string({ required_error: "Password is required" })
        .refine(val => !!calculatePasswordStrength(val), {
          message: "Password is too weak",
        }),
      passwordConfirm: z.string({ required_error: "Password is required" }),

      acceptTerms: z
        .boolean({
          required_error: "Please accept the terms and conditions",
        })
        .refine(val => val, {
          message: "Please accept the terms and conditions",
        }),
    })
    .refine(data => data.password === data.passwordConfirm, {
      path: ["passwordConfirm"],
      message: "Passwords do not match",
    }),
);

export const ForgotSchema = toTypedSchema(
  z.object({
    authKey: AuthKeySchema,
    otpCode: z
      .string({
        required_error: "OTP code is required",
      })
      .length(4, { message: "OTP code must be exactly 4 characters" }),
  }),
);

export const ResetPasswordSchema = toTypedSchema(
  z
    .object({
      password: z
        .string({ required_error: "Password is required" })
        .refine(val => !!calculatePasswordStrength(val), {
          message: "Password is too weak",
        }),
      passwordConfirm: z.string({ required_error: "Password is required" }),
      isLogoutOthers: z.boolean().optional(),
    })
    .refine(data => data.password === data.passwordConfirm, {
      path: ["passwordConfirm"],
      message: "Passwords do not match",
    }),
);
