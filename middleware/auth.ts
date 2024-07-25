export default defineNuxtRouteMiddleware(to => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return useGoTo().goToSignIn({
      from: to.fullPath,
    });
  }
});
