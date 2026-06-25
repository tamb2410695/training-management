import { useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";

import { ROUTES } from "../constants";

export const useLogout = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.AUTH.LOGIN);
  };

  return handleLogout;
};
