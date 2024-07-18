import type { ResourceTypeEnum, StorageLocationEnum } from "~/utils/enums";

export type FileUploaded = {
  _id?: string;
  url: string;
  urlXSmall?: string;
  urlSmall?: string;
  urlMedium?: string;
  urlLarge?: string;
  urlXLarge?: string;

  fileFolder: string;
  fileSize: number;
  resourceKeys: string[];
  fileName: string;
  fileType: string;
  resourceType: ResourceTypeEnum;
  originalname: string;
  storageLocation: StorageLocationEnum;
};

export type FileFailed = {
  error: string;
  originalname: string;
  fileSize: number;
};

export type UploadedResult = {
  filesUploaded: FileUploaded[];
  filesFailed: FileFailed[];
};
