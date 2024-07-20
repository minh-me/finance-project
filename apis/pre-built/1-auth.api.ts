import type {
  AuthUser,
  ForgotPasswordResponse,
  Login,
  Register,
  ResetPassword,
  SendOtpToRegister,
  SendTokenToRegister,
  SocialLogin,
} from "~/types/pre-built/1-auth";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions } from "~/utils/types";

const AUTH_URL = "/auth";

export const authApi = {
  register: (data: Register, options?: FetchOptions): Promise<AuthUser> => {
    return guestFetch.post(`${AUTH_URL}/register`, data, options);
  },

  login: (data: Login, options?: FetchOptions): Promise<AuthUser> => {
    return guestFetch.post(`${AUTH_URL}/login`, data, options);
  },

  socialLogin: (
    data: SocialLogin,
    options?: FetchOptions,
  ): Promise<AuthUser> => {
    return guestFetch.post(`${AUTH_URL}/social_login`, data, options);
  },

  sendToken: (
    data: Register,
    options?: FetchOptions,
  ): Promise<SendTokenToRegister> => {
    return guestFetch.post(`${AUTH_URL}/send_token`, data, options);
  },

  activateToken: (
    data: Register,
    options?: FetchOptions,
  ): Promise<AuthUser> => {
    return guestFetch.post(`${AUTH_URL}/activate_token`, data, options);
  },

  sendOtp: (
    data: Omit<SendOtpToRegister, "expiresAt">,
    options?: FetchOptions,
  ): Promise<SendOtpToRegister> => {
    return guestFetch.post(`${AUTH_URL}/send_token`, data, options);
  },

  logout: () => {
    return authFetch.post(`${AUTH_URL}/logout`, {});
  },

  refreshToken: (token: string, options?: FetchOptions): Promise<AuthUser> => {
    return guestFetch.post(`${AUTH_URL}/refresh_token`, { token }, options);
  },

  forgotPassword: (
    email: string,
    options?: FetchOptions,
  ): Promise<ForgotPasswordResponse> => {
    return guestFetch.post(`${AUTH_URL}/forgot_password`, { email }, options);
  },

  resetPassword: (
    body: ResetPassword,
    options?: FetchOptions,
  ): Promise<AuthUser> => {
    return guestFetch.post(`${AUTH_URL}/reset_password`, body, options);
  },
};
