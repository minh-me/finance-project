import type { Menu } from "~/types/pre-built/7-menu";
import type { ImageSize } from "~/utils/enums";
import { authFetch } from "~/utils/fetch";
import type { FetchOptions } from "~/utils/types";

const UPLOAD_URL = "/uploads";
export const uploadApi = {
  //  ----- Method: POST -----
  uploadFiles: (
    input: {
      file: File[];
      imageSizes?: ImageSize[];
    },
    options?: FetchOptions,
  ): Promise<Menu> => {
    const formData = new FormData();

    input.file.forEach(file => {
      formData.append("files", file);
    });

    input.imageSizes?.forEach(imageSize => {
      formData.append("imageSizes", imageSize);
    });

    return authFetch.post(UPLOAD_URL, formData, options);
  },

  uploadFile: (
    input: {
      file: File;
      imageSizes?: ImageSize[];
    },
    options?: FetchOptions,
  ): Promise<Menu> => {
    const formData = new FormData();
    formData.append("file", input.file);

    input.imageSizes?.forEach(imageSize => {
      formData.append("imageSizes", imageSize);
    });
    return authFetch.post(UPLOAD_URL, formData, options);
  },
};
