import type { PaginateResponse } from "~/types/paginate-reponse.type";
import type { PolicyGroup } from "~/types/pre-built/5-policy-group";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const POLICY_GROUP_URL = "/policy_groups";
export const policyGroupApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<PolicyGroup>> => {
    return authFetch.get(`${POLICY_GROUP_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PolicyGroup> => {
    return authFetch.get(`${POLICY_GROUP_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PolicyGroup[]> => {
    return guestFetch.get(POLICY_GROUP_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: PolicyGroup, options?: FetchOptions): Promise<PolicyGroup> => {
    return authFetch.post(POLICY_GROUP_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: PolicyGroup,
    options?: FetchOptions,
  ): Promise<PolicyGroup> => {
    return authFetch.patch(`${POLICY_GROUP_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${POLICY_GROUP_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<PolicyGroup> => {
    return authFetch.delete(`${POLICY_GROUP_URL}/${id}`);
  },
};
