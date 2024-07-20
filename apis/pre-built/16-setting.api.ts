import type { PaginateResponse } from "~/types/paginate-reponse.type";
import type { Setting } from "~/types/pre-built/16-setting";
import type { UpdateResult } from "~/types/update-result";
import { authFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const SETTING_URL = "/settings";
export const settingApi = {
  //  ----- Method: GET -----
  getOne: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<Setting>> => {
    return authFetch.get(`${SETTING_URL}/one`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Setting> => {
    return authFetch.get(`${SETTING_URL}/${id}`, query, options);
  },

  //  ----- Method: POST -----
  create: (body: Setting, options?: FetchOptions): Promise<Setting> => {
    return authFetch.post(SETTING_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: Setting,
    options?: FetchOptions,
  ): Promise<Setting> => {
    return authFetch.patch(`${SETTING_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${SETTING_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<Setting> => {
    return authFetch.delete(`${SETTING_URL}/${id}`);
  },
};
