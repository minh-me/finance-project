import type { Province } from "./13-province";
import type { District } from "./14-district";

export type Ward = {
  _id?: string;
  provinceId: string | Province;
  districtId: string | District;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  position: number;
  administrativeUnit?: string;
  administrativeUnitEn?: string;
};
