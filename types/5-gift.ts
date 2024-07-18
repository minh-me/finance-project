import type { User } from "./pre-built/2-user";

export type Gift = {
  _id?: string;
  userId: string | User;
  recipientEmail: string;
  amount: number;
  message: string;
};
