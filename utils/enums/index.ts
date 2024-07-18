// === Base ===
export enum ExceptionEnum {
  PageNotAccess = 403,
  PageNotFound = 404,
  ServerError = 500,
}

export enum ErrorTypeEnum {
  ValidationExceptions = "ValidationExceptions",
  ValidationError = "ValidationError",
  CastError = "CastError",
  HttpException = "HttpException",
  InternalServerError = "InternalServerError",
}

// === Pre-built ===
export enum AccountTypeEnum {
  Local = "LOCAL",
  Google = "GOOGLE",
  Facebook = "FACEBOOK",
  Apple = "APPLE",
}

export enum AccountStatus {
  Verified = "VERIFIED",
  Unverified = "UNVERIFIED",
  Locked = "LOCKED",
  Deleted = "DELETED",
}

export enum RoleEnum {
  User = "USER",
  Manager = "MANAGER",
  Admin = "ADMIN",
  SupperAdmin = "SUPER_ADMIN",
}

export enum GenderEnum {
  Male = "MALE",
  Female = "FEMALE",
  Other = "OTHER",
}

export enum OtpTypeEnum {
  Phone = "PHONE",
  Email = "EMAIL",
  Register = "REGISTER",
  ResetPassword = "RESET_PASSWORD",
}

export enum SendOtpToEnum {
  Phone = "PHONE",
  Email = "EMAIL",
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum ResourceTypeEnum {
  Image = "image",
  Video = "video",
  Raw = "raw",
  Auto = "auto",
  Audio = "audio",
}

export enum StorageLocationEnum {
  Local = "LOCAL",
  Cloudinary = "CLOUDINARY",
  S3 = "S3",
}

export enum UploadType {
  image = "image",
  video = "video",
  raw = "raw",
  auto = "auto",
  audio = "audio",
}

export enum NotificationType {
  Post = "POST",
  Comment = "COMMENT",
}

export enum TargetType {
  Personal = "PERSONAL",
  All = "ALL",
}

export enum ImageSize {
  XLarge = "XLarge",
  Large = "Large",
  Medium = "Medium",
  Small = "Small",
  XSmall = "XSmall",
}

export enum ActionEnum {
  Add = "add",
  Remove = "remove",
}

// === Features ===
export enum ListingStatus {
  SoldOut = "SOLD_OUT",
  Active = "ACTIVE",
  ComingSoon = "COMING_SOON",
}
