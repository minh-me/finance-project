import type { PaginateResponse } from "~/types/paginate-reponse.type";
import type { UserGroup } from "~/types/pre-built/3-user-group";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const USER_GROUP_URL = "/user_groups";
export const userGroupGroupApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<UserGroup>> => {
    return authFetch.get(`${USER_GROUP_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<UserGroup> => {
    return authFetch.get(`${USER_GROUP_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<UserGroup[]> => {
    return guestFetch.get(USER_GROUP_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: UserGroup, options?: FetchOptions): Promise<UserGroup> => {
    return authFetch.post(USER_GROUP_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: UserGroup,
    options?: FetchOptions,
  ): Promise<UserGroup> => {
    return authFetch.patch(`${USER_GROUP_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${USER_GROUP_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<UserGroup> => {
    return authFetch.delete(`${USER_GROUP_URL}/${id}`);
  },
};
