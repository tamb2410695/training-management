import { useNavigate } from "react-router-dom";

import authService from "../services/authService";
import { ROUTES } from "../../../constants";

import { useLoading, useFeedback } from "@/hooks";

export function useRegister() {
  const navigate = useNavigate();

  const { loading, startLoading, stopLoading } = useLoading();

  const { setSuccess, setError } = useFeedback();

  const registerUser = async (payload) => {
    try {
      startLoading();

      await authService.register(payload);

      setSuccess({
        message: "Đăng ký tài khoản thành công.",
      });

      navigate(ROUTES.ACTIVATE_ACCOUNT, {
        state: {
          email: payload.email,
        },
      });
    } catch (error) {
      setError({
        message: error?.response?.data?.message || "Đăng ký thất bại.",
      });

      throw error;
    } finally {
      stopLoading();
    }
  };

  return {
    registerUser,
    loading,
  };
}
