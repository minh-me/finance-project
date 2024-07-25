export const useGoTo = () => {
  const router = useRouter();

  const goToQueryFrom = (from?: string) => {
    if (!from) return router.push({ path: "/" });

    const [path, queryString = {}] = (from as string).split("?");

    router.push({
      path: `/${path.replace("/", "")}`,
      query: Object.fromEntries(new URLSearchParams(queryString)),
    });
  };

  const goToSignIn = (query: Record<string, any> = {}) => {
    return router.push({ path: "/auth/sign-in", query });
  };

  const goToSignUp = (query: Record<string, any> = {}) => {
    return router.push({ path: "/auth/sign-up", query });
  };

  const goToResetPassword = (query: Record<string, any> = {}) => {
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
