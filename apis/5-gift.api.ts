import type { Gift } from "~/types/5-gift";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const REVIEW_URL = "/gifts";
export const giftApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Gift[]> => {
    return guestFetch.get(`${REVIEW_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Gift> => {
    return authFetch.get(`${REVIEW_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Gift[]> => {
    return guestFetch.get(REVIEW_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: Gift, options?: FetchOptions): Promise<Gift> => {
    return authFetch.post(REVIEW_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: Gift,
    options?: FetchOptions,
  ): Promise<Gift> => {
    return authFetch.patch(`${REVIEW_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${REVIEW_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<Gift> => {
    return authFetch.delete(`${REVIEW_URL}/${id}`);
  },
};
