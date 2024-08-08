import type { PaginationParams } from "../types/fetch.types";
import {
  convertFieldsToString,
  type FieldObject,
} from "./field-formatter.helper";
import { convertSortQueryToString } from "./sorting.helper";

export const convertQueryToPaginationParams = (query: {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _populate?: string | string[];
  _fields?: FieldObject | string;
  [key: string]: any;
}): PaginationParams => {
  const params: PaginationParams = {};

  const { _page, _limit, _sort, _populate, _fields, ...rest } = query;

  if (_page) params._page = _page;

  if (_limit) params._limit = _limit;

  if (_sort) params._sort = convertSortQueryToString(_sort);

  if (_populate)
    params._populate = Array.isArray(query._populate)
      ? query._populate.join(",")
      : query._populate;

  if (_fields)
    params._fields =
      typeof _fields === "string" ? _fields : convertFieldsToString(_fields);

  return { ...params, ...rest };
};
