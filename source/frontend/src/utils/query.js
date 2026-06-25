export const removeEmptyFields = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== "" && value !== undefined && value !== null,
    ),
  );
