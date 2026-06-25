export const unwrapResponse = (response) => ({
  success: response?.data?.success,
  data: response?.data?.data,
  pagination: response?.data?.pagination,
  message: response?.data?.message,
});