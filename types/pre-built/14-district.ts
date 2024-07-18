import type { Province } from "./13-province";

export type District = {
  _id?: string;
  provinceId: string | Province;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  position: number;
  administrativeUnit?: string;
  administrativeUnitEn?: string;
};
