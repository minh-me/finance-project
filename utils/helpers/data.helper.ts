export const hasNonEmptyValue = (obj: { [key: string]: any }) => {
  return Object.values(obj).some(
    value => value !== undefined && value !== null && value !== "",
  );
};
