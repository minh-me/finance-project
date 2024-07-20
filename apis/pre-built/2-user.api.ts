import type { DeleteResult } from "~/types/delete-result";
import type { PaginateResponse } from "~/types/paginate-reponse.type";
import type { UpdatePassword, User } from "~/types/pre-built/2-user";
import type { UpdateResult } from "~/types/update-result";
import type { AccountStatus } from "~/utils/enums";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const USER_URL = "/users";

export const userApi = {
  //  ----- Method: GET -----
  getMe: (query?: PaginationParams): Promise<User> => {
    return authFetch.get(`${USER_URL}/me`, query);
  },

  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<User>> => {
    return authFetch.get(`${USER_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<User> => {
    return authFetch.get(`${USER_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<User[]> => {
    return guestFetch.get(USER_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: User, options?: FetchOptions): Promise<User> => {
    return authFetch.post(USER_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updatePassword: (body: UpdatePassword): Promise<User> => {
    return authFetch.patch(USER_URL, body);
  },

  updateStatusById: (userId: string, status: AccountStatus): Promise<User> => {
    return authFetch.patch(`${USER_URL}/${userId}/status`, { status });
  },

  updateById: (
    id: string,
    body: User,
    options?: FetchOptions,
  ): Promise<User> => {
    return authFetch.patch(`${USER_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteMe: (): Promise<User> => {
    return authFetch.delete(`${USER_URL}/me`);
  },

  deleteHardManyByIds: (ids: string[]): Promise<DeleteResult> => {
    return authFetch.delete(`${USER_URL}/${ids.join(",")}/hard`);
  },

  deleteHardById: (id: string): Promise<User> => {
    return authFetch.delete(`${USER_URL}/${id}/hard`);
  },

  deleteManySoftByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${USER_URL}/${ids.join(",")}/ids`);
  },

  deleteSoftById: (id: string): Promise<User> => {
    return authFetch.delete(`${USER_URL}/${id}`);
  },
};
