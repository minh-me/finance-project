import type { Listing } from "~/types/2-listing";
import type { PaginateResponse } from "~/types/paginate-reponse.type";
import type { UpdateResult } from "~/types/update-result";
import type { ActionEnum } from "~/utils/enums";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const LISTING_URL = "/listings";
export const listingApi = {
  //  ----- Method: GET -----
  getWishlistPaginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<Listing>> => {
    return authFetch.get(`${LISTING_URL}/wishlist/paginate`, query, options);
  },

  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<Listing>> => {
    return guestFetch.get(`${LISTING_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Listing> => {
    return authFetch.get(`${LISTING_URL}/${id}`, query, options);
  },

  //  ----- Method: POST -----
  create: (body: Listing, options?: FetchOptions): Promise<Listing> => {
    return authFetch.post(LISTING_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateWishlist: (
    id: string,
    action: ActionEnum,
    options?: FetchOptions,
  ): Promise<Listing> => {
    return authFetch.patch(
      `${LISTING_URL}/${id}/wishlist/${action}`,
      {},
      options,
    );
  },

  updateById: (
    id: string,
    body: Listing,
    options?: FetchOptions,
  ): Promise<Listing> => {
    return authFetch.patch(`${LISTING_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${LISTING_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<Listing> => {
    return authFetch.delete(`${LISTING_URL}/${id}`);
  },
};
