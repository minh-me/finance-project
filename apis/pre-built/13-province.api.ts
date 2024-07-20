import type { PaginateResponse } from "~/types/paginate-reponse.type";
import type { Province } from "~/types/pre-built/13-province";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const PROVINCE_URL = "/districts";
export const provinceApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<Province>> => {
    return authFetch.get(`${PROVINCE_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Province> => {
    return authFetch.get(`${PROVINCE_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Province[]> => {
    return guestFetch.get(PROVINCE_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: Province, options?: FetchOptions): Promise<Province> => {
    return authFetch.post(PROVINCE_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: Province,
    options?: FetchOptions,
  ): Promise<Province> => {
    return authFetch.patch(`${PROVINCE_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${PROVINCE_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<Province> => {
    return authFetch.delete(`${PROVINCE_URL}/${id}`);
  },
};
