import { SUCCESS_CODES, SUCCESS_MESSAGES_VI } from "../../constants";

export function translateSuccess(code, fallback = null) {
  return (
    SUCCESS_MESSAGES_VI[code] ??
    fallback ??
    SUCCESS_MESSAGES_VI[SUCCESS_CODES.OPERATION_SUCCES]
  );
}
