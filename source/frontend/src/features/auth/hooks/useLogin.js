import { useNavigate } from "react-router-dom";

import { ROLES, ROUTES } from "@/constants";
import authService from "../services/authService";
import { useAuth } from "@/hooks/auth/useAuth";
import { useLoading, useFeedback } from "@/hooks";


const auth = authService();

export function useLogin() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const { loading, startLoading, stopLoading } = useLoading();

  const { setSuccess, setError } = useFeedback();

  const redirectByRole = (roleName) => {
    switch (roleName) {
      case ROLES.ADMIN:
        navigate(ROUTES.ADMIN.DASHBOARD);
        break;

      case ROLES.STUDENT:
        navigate(ROUTES.STUDENT.PROFILE);
        break;

      case ROLES.INSTRUCTOR:
        navigate(ROUTES.INSTRUCTOR.PROFILE);
        break;

      default:
        navigate(ROUTES.HOME);
    }
  };

  const loginUser = async (payload) => {
    try {
      startLoading();
      console.log(auth.login)

      const response = await auth.login(payload);

      const { user, accessToken } = response.data;

      login(user, accessToken);

      setSuccess({
        message: "Đăng nhập thành công.",
      });

      redirectByRole(user.roleName);

      return user;
    } catch (error) {
      setError({
        message:
          error?.response?.data?.message ||
          "Thông tin đăng nhập không chính xác.",
      });

      throw error;
    } finally {
      stopLoading();
    }
  };

  return {
    loginUser,
    loading,
  };
}
