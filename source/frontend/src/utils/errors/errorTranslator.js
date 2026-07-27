import { ERROR_CODES, ERROR_MESSAGES_VI } from "../../constants";

export function translateError(code, fallback = null) {
  return (
    ERROR_MESSAGES_VI[code] ??
    fallback ??
    ERROR_MESSAGES_VI[ERROR_CODES.INTERNAL_SERVER_ERROR]
  );
}
