export const useGoTo = () => {
  const route = useRoute();
  const router = useRouter();
  const query = route.query;

  const goToQueryFrom = () => {
    if (!query?.from) return router.push({ path: "/" });

    const [path, queryString = {}] = (query.from as string).split("?");

    router.push({
      path: `/${path}`,
      query: Object.fromEntries(new URLSearchParams(queryString)),
    });
  };

  const goToSignIn = () => {
    return router.push({ path: "/auth/sign-in", query });
  };

  const goToSignUp = () => {
    return router.push({ path: "/auth/sign-up", query });
  };

  const goToResetPassword = () => {
    return router.push({ path: "/auth/reset-password", query });
  };

  const goBack = () => {
    return router.go(-1);
  };

  const goTo = (path: string, query?: Record<string, any>) => {
    router.push({
      path,
      query,
    });
  };

  return {
    goToQueryFrom,
    goToSignIn,
    goToSignUp,
    goToResetPassword,
    goBack,
    goTo,
  };
};
