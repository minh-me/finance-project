import type { PaginateResponse } from "~/types/paginate-reponse.type";
import type { Policy } from "~/types/pre-built/4-policy";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const POLICY_URL = "/policies";
export const policyApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<Policy>> => {
    return authFetch.get(`${POLICY_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Policy> => {
    return authFetch.get(`${POLICY_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Policy[]> => {
    return guestFetch.get(POLICY_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: Policy, options?: FetchOptions): Promise<Policy> => {
    return authFetch.post(POLICY_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: Policy,
    options?: FetchOptions,
  ): Promise<Policy> => {
    return authFetch.patch(`${POLICY_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${POLICY_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<Policy> => {
    return authFetch.delete(`${POLICY_URL}/${id}`);
  },
};
