import type { Otp, OtpResponse, VerifyOtp } from "~/types/pre-built/10-otp";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const OTP_URL = "/otp";
export const otpApi = {
  //  ----- Method: GET -----
  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Otp[]> => {
    return guestFetch.get(OTP_URL, query, options);
  },

  //  ----- Method: POST -----
  sendOtp: (body: Otp, options?: FetchOptions): Promise<OtpResponse> => {
    return authFetch.post(OTP_URL, body, options);
  },

  verify: (body: VerifyOtp, options?: FetchOptions): Promise<OtpResponse> => {
    return authFetch.post(OTP_URL, body, options);
  },
};
