export const validationMessages = {
  email: (field) => `${field.label} không đúng định dạng email.`,

  minLength: (field, rule) =>
    `${field.label} phải có ít nhất ${rule.value} ký tự.`,
};
