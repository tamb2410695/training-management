const USER_KEY = "user";
const ACCESS_TOKEN_KEY = "accessToken";

export const storage = {
  getUser() {
    const data = localStorage.getItem(USER_KEY);
    try {
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Lỗi parse dữ liệu User từ Storage:", error);
      return null;
    }
  },

  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || null;
  },

  setAccessToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },

  removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  clearAll() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};