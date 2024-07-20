import type { PaginateResponse } from "~/types/paginate-reponse.type";
import type { MenuGroup } from "~/types/pre-built/6-menu-group";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const MENU_GROUP_URL = "/menu_groups";
export const menuGroupApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<MenuGroup>> => {
    return authFetch.get(`${MENU_GROUP_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<MenuGroup> => {
    return authFetch.get(`${MENU_GROUP_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<MenuGroup[]> => {
    return guestFetch.get(MENU_GROUP_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: MenuGroup, options?: FetchOptions): Promise<MenuGroup> => {
    return authFetch.post(MENU_GROUP_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: MenuGroup,
    options?: FetchOptions,
  ): Promise<MenuGroup> => {
    return authFetch.patch(`${MENU_GROUP_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${MENU_GROUP_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<MenuGroup> => {
    return authFetch.delete(`${MENU_GROUP_URL}/${id}`);
  },
};
