import type { PaginateResponse } from "~/types/paginate-reponse.type";
import type { Ward } from "~/types/pre-built/15-ward";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const WARD_URL = "/wards";
export const wardApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<Ward>> => {
    return authFetch.get(`${WARD_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Ward> => {
    return authFetch.get(`${WARD_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Ward[]> => {
    return guestFetch.get(WARD_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: Ward, options?: FetchOptions): Promise<Ward> => {
    return authFetch.post(WARD_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: Ward,
    options?: FetchOptions,
  ): Promise<Ward> => {
    return authFetch.patch(`${WARD_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${WARD_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<Ward> => {
    return authFetch.delete(`${WARD_URL}/${id}`);
  },
};
