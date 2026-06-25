import { useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import { storage } from "../../services/storage";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(storage.getUser());
  const [accessToken, setAccessToken] = useState(storage.getAccessToken());

  const login = (userData, accessToken) => {
    storage.setUser(userData);
    storage.setAccessToken(accessToken);
    setUser(userData);
    setAccessToken(accessToken);
  };

  const logout = () => {
    storage.removeUser();
    storage.removeAccessToken();
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
