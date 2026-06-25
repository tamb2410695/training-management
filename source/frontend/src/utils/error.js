export const getErrorMessage = (error) =>
  error?.response?.data?.message ?? "Có lỗi xảy ra";
