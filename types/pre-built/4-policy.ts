import type { HttpMethod } from "~/utils/enums";
import type { User } from "./2-user";
import type { UserGroup } from "./3-user-group";

export type Policy = {
  _id?: string;
  policyGroupId: string | Policy;
  policyKey: string;
  name: string;
  collectionName: string;
  endpoint: string;
  method: HttpMethod;
  description?: string;
  userIds: string[];
  userGroupIds: string[] | UserGroup[];
  isPublic: boolean;
  blockedUserGroupIds?: string[] | UserGroup[];
  blockedUserIds?: string[] | User[];
};
