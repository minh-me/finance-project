export default defineNuxtRouteMiddleware(to => {
  // Auth store here
  // const auth = useAuthStore();
  // eslint-disable-next-line no-console
  console.log({ to });
  // await auth.loadProfile()
  // if (to.meta.requiresAuth && !auth.isAuth) {
  //   return navigateTo('/login')
  // }
});
