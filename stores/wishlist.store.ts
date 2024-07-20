import { listingApi } from "~/apis/2-listing.api";
import type { Listing } from "~/types/2-listing";
import type { PageInfo } from "~/types/paginate-reponse.type";

export const useWishlistStore = defineStore("wishlist", () => {
  const listings = ref<Listing[]>([]);
  const pageInfo = ref<PageInfo>();
  const isLoadMoreLoading = ref<boolean>(false);

  const { filter } = useListingQuery();

  const authStore = useAuthStore();
  const { authUser } = storeToRefs(authStore);

  const filterWatch = computed(() => {
    return new URLSearchParams(filter.value).toString();
  });

  const {
    pending,
    data: listingPagination,
    error,
  } = useAsyncData(
    "wishlist-pagination",
    () => listingApi.getWishlistPaginate(filter.value),
    {
      watch: [filterWatch, authUser],
    },
  );

  watch(
    () => error.value,
    () => {
      if (!error.value) return;

      listings.value = [];
      pageInfo.value = undefined;
    },
  );

  watchEffect(() => {
    if (listingPagination.value) {
      listings.value = listingPagination.value.data;
      pageInfo.value = listingPagination.value.pageInfo;
    }
  });

  const loadMoreListings = async () => {
    if (!pageInfo.value?._nextPage) return;

    isLoadMoreLoading.value = true;

    const data = await listingApi.getWishlistPaginate({
      _page: pageInfo.value._nextPage,
    });

    listings.value.push(...data.data);
    pageInfo.value = data.pageInfo;

    isLoadMoreLoading.value = false;

    return data;
  };

  return {
    loadMoreListings,
    pending,
    listings,
    pageInfo,
    isLoadMoreLoading,
  };
});
