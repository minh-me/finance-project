import type { SortingState } from "@tanstack/vue-table";
import type { LocationQuery } from "vue-router";

export const parseSortingQueryFromURL = (
  query?: LocationQuery,
): SortingState => {
  const _sort = query?._sort;

  if (!_sort || typeof _sort !== "string") return [];

  const values = _sort.split(",").map(item => {
    const [id, desc] = item.split(":");

    return { id, desc: desc === "desc" };
  });

  return values;
};

export const formatSortingStateToQuery = (
  sort: { id: string; desc: boolean }[],
): string | undefined => {
  const values = sort.map(({ id, desc }) => `${id}:${desc ? "desc" : "asc"}`);

  return values?.length ? values.join(",") : undefined;
};

export const applySortingStateToURL = (
  sort: { id: string; desc: boolean }[],
) => {
  useRouter().push({
    query: {
      ...useRoute().query,
      _sort: formatSortingStateToQuery(sort),
    },
  });
};

export const convertSortQueryToString = (sort?: string) => {
  if (!sort) return undefined;

  return sort
    .split(",")
    .map(item => item.split(":"))
    .map(([key, sortType]) => {
      return sortType ? `${sortType === "desc" ? "-" : ""}${key}` : key;
    })
    .join(",");
};
