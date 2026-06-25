const USER_KEY = "user";
const ACCESS_TOKEN_KEY = "accessToken";

export const storage = {
  getUser() {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },

  getAccessToken() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    return accessToken ? JSON.parse(accessToken) : null;
  },

  setAccessToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
  },

  removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};
