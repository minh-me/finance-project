import type { MenuGroup } from "./6-menu-group";
import type { SystemMenu } from "./8-system-menu";

export type Menu = {
  _id?: string;
  menuGroupIds?: string[] | MenuGroup[];
  parentId?: string | Menu;
  systemMenuId?: string | SystemMenu;
  name?: string;
  position?: number;
  isHorizontal: boolean;
  isShow: boolean;
};
