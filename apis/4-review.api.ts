import type { Review } from "~/types/4-review";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const REVIEW_URL = "/reviews";
export const bookingApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Review[]> => {
    return guestFetch.get(`${REVIEW_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Review> => {
    return authFetch.get(`${REVIEW_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Review[]> => {
    return guestFetch.get(REVIEW_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: Review, options?: FetchOptions): Promise<Review> => {
    return authFetch.post(REVIEW_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: Review,
    options?: FetchOptions,
  ): Promise<Review> => {
    return authFetch.patch(`${REVIEW_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${REVIEW_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<Review> => {
    return authFetch.delete(`${REVIEW_URL}/${id}`);
  },
};
