import type { PaginateResponse } from "~/types/paginate-reponse.type";
import type { District } from "~/types/pre-built/14-district";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const DISTRICT_URL = "/districts";
export const districtApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<District>> => {
    return authFetch.get(`${DISTRICT_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<District> => {
    return authFetch.get(`${DISTRICT_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<District[]> => {
    return guestFetch.get(DISTRICT_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: District, options?: FetchOptions): Promise<District> => {
    return authFetch.post(DISTRICT_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: District,
    options?: FetchOptions,
  ): Promise<District> => {
    return authFetch.patch(`${DISTRICT_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${DISTRICT_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<District> => {
    return authFetch.delete(`${DISTRICT_URL}/${id}`);
  },
};
