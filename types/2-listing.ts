import type { ListingStatus } from "~/utils/enums";
import type { Category } from "./1-category";
import type { User } from "./pre-built/2-user";

export type Listing = {
  _id?: string;
  hostId: User;
  categoryIds: Category[];
  title: string;
  description: string;
  status: ListingStatus;
  price: number;
  locationValue: string;
  thumbnail: string;
  images: string;
  publishAt: Date;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  reviewCount?: number;
  totalReviewRatings?: number;
  viewedCount?: number;
  isWishlist?: boolean;
};

export type Wishlist = {
  _id?: string;
  userId: string;
  listingId: Listing;
};
