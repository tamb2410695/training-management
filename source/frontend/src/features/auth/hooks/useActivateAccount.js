import { useNavigate } from "react-router-dom";

import authService from "../services/authService";
import { ROUTES } from "../../../constants";

import { useLoading, useFeedback } from "@/hooks";

export function useActivateAccount() {
  const navigate = useNavigate();

  const { loading, startLoading, stopLoading } = useLoading();

  const { setSuccess, setError } = useFeedback();

  const activateAccount = async (payload) => {
    try {
      startLoading(true);

      await authService.activateAccount(payload);

      setSuccess({
        message: "Kích hoạt tài khoản thành công.",
      });

      navigate(ROUTES.LOGIN);
    } catch (error) {
      setError({
        message: error?.response?.data?.message || "Mã kích hoạt không hợp lệ.",
      });

      throw error;
    } finally {
      stopLoading(false);
    }
  };

  return {
    activateAccount,
    loading,
  };
}
