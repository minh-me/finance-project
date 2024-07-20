import type { PaginateResponse } from "~/types/paginate-reponse.type";
import type { UserFile } from "~/types/pre-built/12-user-file";
import type { UpdateResult } from "~/types/update-result";
import { authFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const USER_FILE_URL = "/user_files";
export const userFileApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<UserFile>> => {
    return authFetch.get(`${USER_FILE_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<UserFile> => {
    return authFetch.get(`${USER_FILE_URL}/${id}`, query, options);
  },

  //  ----- Method: PATCH -----
  deleteByFileName: (
    fileName: string,
    options?: FetchOptions,
  ): Promise<UserFile> => {
    return authFetch.delete(`${USER_FILE_URL}/filename/${fileName}`, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${USER_FILE_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<UserFile> => {
    return authFetch.delete(`${USER_FILE_URL}/${id}`);
  },
};
