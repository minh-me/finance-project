import type { SystemMenu } from "~/types/pre-built/8-system-menu";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const SYSTEM_MENU_URL = "/system_menus";
export const systemMenuApi = {
  //  ----- Method: GET -----
  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<SystemMenu> => {
    return authFetch.get(`${SYSTEM_MENU_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<SystemMenu[]> => {
    return guestFetch.get(SYSTEM_MENU_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: SystemMenu, options?: FetchOptions): Promise<SystemMenu> => {
    return authFetch.post(SYSTEM_MENU_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: SystemMenu,
    options?: FetchOptions,
  ): Promise<SystemMenu> => {
    return authFetch.patch(`${SYSTEM_MENU_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${SYSTEM_MENU_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<SystemMenu> => {
    return authFetch.delete(`${SYSTEM_MENU_URL}/${id}`);
  },
};
