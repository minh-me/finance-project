import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import {
  calculatePasswordStrength,
  emailRegex,
  phoneRegex,
} from "~/utils/helpers/auth.helper";

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
  z.object({
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

    acceptTerms: z
      .boolean({
        required_error: "Please accept the terms and conditions",
      })
      .refine(val => val, {
        message: "Please accept the terms and conditions",
      }),
    otpCode: z
      .string({
        required_error: "OTP code is required",
      })
      .length(4, { message: "OTP code must be exactly 4 characters" }),
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
