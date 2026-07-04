export const pickFields = (data, allowedFields) => {
  return Object.fromEntries(
    Object.entries(data).filter(([field]) => allowedFields.includes(field)),
  );
};
