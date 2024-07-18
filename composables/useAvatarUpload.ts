export const useAvatarUpload = () => {
  const isOpen = useState("avatarUploadModal", () => false);

  const onOpen = () => {
    isOpen.value = true;
  };

  const onClose = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    onOpen,
    onClose,
  };
};
