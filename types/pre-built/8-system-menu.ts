export type SystemMenu = {
  _id?: string;
  parentId?: string | SystemMenu;
  name: string;
  collectionName?: string;
  isGroup: boolean;
  icon?: string;
  href?: string;
  position: number;
  isHorizontal: boolean;
  isShow: boolean;
  deleted: boolean;
  isSystem: boolean;
};
