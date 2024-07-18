import { categoryApi } from "~/apis/1-category.api";
import type { Category } from "~/types/1-category";
import { handleError } from "~/utils/helpers/handle-error.helper";

export const useCategoryStore = defineStore("categories", () => {
  const categories = ref<Category[]>([]);
  const isLoading = ref<boolean>(false);

  const loadCategories = async () => {
    isLoading.value = true;
    const { data, error } = await useAsyncData("categories", () =>
      categoryApi.getAll({ _sort: "position", isShow: true }),
    );

    if (data.value) categories.value = data.value;

    if (error.value) handleError(error.value);

    isLoading.value = false;
    return data;
  };

  const getCategoryIdByName = (name: string) => {
    return categories.value.find(
      (category: Category) => category.name.toLowerCase() === name.toLowerCase(),
    )?._id;
  };

  return {
    categories,
    isLoading,
    loadCategories,
    getCategoryIdByName,
  };
});
