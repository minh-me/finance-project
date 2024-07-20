import type { PaginateResponse } from "~/types/paginate-reponse.type";
import type { Setting } from "~/types/pre-built/16-setting";
import type { UpdateResult } from "~/types/update-result";
import { authFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const NOTIFICATION_URL = "/notifications";
export const notificationApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<Setting>> => {
    return authFetch.get(`${NOTIFICATION_URL}/paginate`, query, options);
  },

  count: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<Setting>> => {
    return authFetch.get(`${NOTIFICATION_URL}/count`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Setting> => {
    return authFetch.get(`${NOTIFICATION_URL}/${id}`, query, options);
  },

  //  ----- Method: POST -----
  create: (body: Setting, options?: FetchOptions): Promise<Setting> => {
    return authFetch.post(NOTIFICATION_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: Setting,
    options?: FetchOptions,
  ): Promise<Setting> => {
    return authFetch.patch(`${NOTIFICATION_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${NOTIFICATION_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<Setting> => {
    return authFetch.delete(`${NOTIFICATION_URL}/${id}`);
  },
};
