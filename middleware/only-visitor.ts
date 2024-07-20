export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const { authUser } = storeToRefs(authStore);

  if (authUser.value?.user) return navigateTo("/");

  return navigateTo(from.path);
});
