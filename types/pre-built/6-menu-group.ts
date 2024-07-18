import type { User } from "./2-user";

export type MenuGroup = {
  createdBy: string | User;
  name: string;
  description?: string;
};
