import type { PaginationParams } from "~/utils/types";

export const useListingQuery = () => {
  const filter = computed(() => {
    const query = useRoute().query;
    const { auth, ...rest } = query;

    const obj: PaginationParams = {
      _populate: "categoryIds,hostId",
    };

    if (rest._page) obj._page = Number(rest._page);
    if (rest._limit) obj._limit = Number(rest._limit);
    if (rest._sort) obj._sort = rest._sort as string;

    if (rest.category)
      Object.assign(obj, {
        categoryIds: useCategoryStore().getCategoryIdByName(
          rest.category as string,
        ),
      });

    return obj;
  });

  return {
    filter,
  };
};
