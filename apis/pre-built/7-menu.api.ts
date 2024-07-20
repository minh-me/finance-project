import type { Menu } from "~/types/pre-built/7-menu";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const MENU_URL = "/menus";
export const menuApi = {
  //  ----- Method: GET -----
  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Menu> => {
    return authFetch.get(`${MENU_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Menu[]> => {
    return guestFetch.get(MENU_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: Menu, options?: FetchOptions): Promise<Menu> => {
    return authFetch.post(MENU_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: Menu,
    options?: FetchOptions,
  ): Promise<Menu> => {
    return authFetch.patch(`${MENU_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${MENU_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<Menu> => {
    return authFetch.delete(`${MENU_URL}/${id}`);
  },
};
