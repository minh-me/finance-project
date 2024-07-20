import { listingApi } from "~/apis/2-listing.api";
import { ActionEnum } from "~/utils/enums";

interface FavoriteProps {
  listingId: string;
}

export const useFavorite = ({ listingId }: FavoriteProps) => {
  const authStore = useAuthStore();

  const { authUser } = storeToRefs(authStore);

  const toggleFavorite = async (isWishlist: boolean) => {
    if (!authUser.value?.user._id) return useLogin().onOpen("login");

    await listingApi.updateWishlist(
      listingId,
      isWishlist ? ActionEnum.Add : ActionEnum.Remove,
    );

    return isWishlist;
  };

  return {
    toggleFavorite,
  };
};
