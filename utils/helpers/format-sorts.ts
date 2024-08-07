export const getSortQuery = (sort?: string) => {
  const values = sort?.split(",")?.map(item => {
    const [id, desc] = item.split(":");

    return { id, desc: desc === "desc" };
  });

  return values?.length ? values : [];
};

export const formatSort = (sort: { id: string; desc: boolean }[]) => {
  const values = sort.map(({ id, desc }) => `${id}:${desc ? "desc" : "asc"}`);

  return values?.length ? values.join(",") : undefined;
};

export const updateSortQuery = (sort: { id: string; desc: boolean }[]) => {
  useRouter().push({
    query: {
      ...useRoute().query,
      _sort: formatSort(sort),
    },
  });
};

export const verifyQuery = (query: Record<string, string>) => {
  return {
    ...query,
    _sort: query?._sort
      ?.split(",")
      ?.map(item => {
        const [key, value] = item.split(":");

        return value === "desc" ? `-${key}` : key;
      })
      ?.join(","),
  };
};
