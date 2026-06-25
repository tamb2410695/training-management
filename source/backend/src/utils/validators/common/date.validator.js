const validateDate = (
  value,
) => {
  const date =
    new Date(value);

  return !Number.isNaN(
    date.getTime(),
  );
};