import type { Listing } from "./2-listing";
import type { User } from "./pre-built/2-user";

export type Review = {
  _id?: string;
  userId: string | User;
  listingId: string | Listing;
  rating: number;
  comment?: string;
};
