import type { NotificationType, TargetType } from "~/utils/enums";
import type { User } from "./2-user";

export type Notification = {
  _id?: string;
  targetType: TargetType;
  senderId: string | User;
  recipientId: string | User;
  notificationType: NotificationType;
  entityType: string;
  entityId: string;
  title: string;
  description: string;
  thumbnail?: string;
  options?: Record<string, any>;
  isRead: boolean;
};
