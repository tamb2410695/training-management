export const resetForm = (defaultValues) => ({
  ...defaultValues,
});

export const pickFields = (source, fields) =>
  fields.reduce((result, field) => {
    result[field] = source[field];

    return result;
  }, {});
