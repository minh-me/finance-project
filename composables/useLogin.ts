export const useLogin = () => {
  const router = useRouter();

  const onOpen = (auth: "register" | "login" = "login") => {
    router.push({ query: { auth } });
  };

  const onClose = () => {
    router.push({ query: {} });
  };

  return {
    onOpen,
    onClose,
  };
};
