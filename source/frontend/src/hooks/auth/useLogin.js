import { useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";

import { ROUTES } from "../../constants";

export const useLogout = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = () => {
    login();

    navigate(ROUTES.AUTH.LOGIN);
  };

  return handleLogin;
};
