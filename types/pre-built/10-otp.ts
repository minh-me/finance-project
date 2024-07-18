import type { OtpTypeEnum, SendOtpToEnum } from "~/utils/enums";

export type Otp = {
  phone?: string;
  email?: string;
  sendOtpTo: SendOtpToEnum;
  otpType: OtpTypeEnum;
};

export type VerifyOtp = Otp & {
  otpCode: string;
};

export type OtpResponse = Otp & {
  expiredAt: number;
};
