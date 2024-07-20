import type { Category } from "~/types/1-category";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const CATEGORY_URL = "/categories";
export const categoryApi = {
  //  ----- Method: GET -----
  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Category> => {
    return guestFetch.get(`${CATEGORY_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Category[]> => {
    return guestFetch.get(CATEGORY_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: Category, options?: FetchOptions): Promise<Category> => {
    return authFetch.post(CATEGORY_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: Category,
    options?: FetchOptions,
  ): Promise<Category> => {
    return authFetch.patch(`${CATEGORY_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${CATEGORY_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<Category> => {
    return authFetch.delete(`${CATEGORY_URL}/${id}`);
  },
};
