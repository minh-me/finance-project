import type {
  ResourceTypeEnum,
  StorageLocationEnum,
  UploadType,
} from "~/utils/enums";
import type { User } from "./2-user";

export type UserFile = {
  _id?: string;
  userId: string | User;
  resourceKeys: string[];
  fileName: string;
  fileType: UploadType;
  resourceType: ResourceTypeEnum;
  urlXSmall?: string;
  urlSmall?: string;
  urlMedium?: string;
  urlLarge?: string;
  urlXLarge?: string;
  url: string;
  storageLocation: StorageLocationEnum;
  fileFolder: string;
  fileSize: number;
  originalname: string;
};
