import type { ErrorDetail } from "./error-detail";

export type Exception = {
  type: string;
  name: string;
  title: string;
  errors?: ErrorDetail[];
};
