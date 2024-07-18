export type PageInfo = {
  _hasNextPage: boolean;
  _hasPrevPage: boolean;
  _limit: number;
  _nextPage: number;
  _page: number;
  _pagingCounter: number;
  _prevPage: number;
  _totalData: number;
  _totalPages: number;
};

export type PaginateResponse<T> = {
  data: T[];
  pageInfo: PageInfo;
};
