import { SUCCESS_CODES } from "../../constants";
import { translateSuccess } from "./successTranslator";


export function successHandler(response) {
  const code = response?.code ?? SUCCESS_CODES.OPERATION_SUCCESS;

  return {
    success: true,
    code,
    message: translateSuccess(code, response?.message),
    data: response?.data ?? null,
    pagination: response?.pagination ?? null,
  };
}
