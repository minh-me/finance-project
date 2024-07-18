import type { User } from "./2-user";

export type PolicyGroup = {
  _id?: string;
  createdBy: string | User;
  name: string;
  description?: string;
};
