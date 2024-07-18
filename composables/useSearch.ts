export const useSearch = () => {
  const isOpen = useState("filterModal", () => false);

  const onOpen = () => {
    isOpen.value = true;
  };

  const onClose = () => {
    isOpen.value = false;
  };

  return {
    onOpen,
    onClose,
    isOpen,
  };
};
