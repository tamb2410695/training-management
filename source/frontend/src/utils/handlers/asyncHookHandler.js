export const asyncHookHandler = (fn, { setLoading, setError }) => {
  return async (...args) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await fn(...args);
      return result;
      
    } catch (err) {
      
      const errorMessage = err?.message || "Đã xảy ra lỗi hệ thống.";
      setError(errorMessage);
      
      console.error(`[Hook Error Handled]:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
};