import {
  useFeatureModalActions,
  useFeatureResourceActions,
  useFeatureSubmit,
} from "@/hooks";
import { buildApiPayload } from "@/utils";
import { ACCOUNT_FEATURE } from "../constants";

export const ACCOUNT_FEEDBACK = {
  create: {
    code: "ACCOUNT_CREATE_SUCCESS",
    message: "Tạo tài khoản thành công",
  },

  update: {
    code: "ACCOUNT_UPDATE_SUCCESS",
    message: "Cập nhật tài khoản thành công",
  },

  delete: {
    code: "ACCOUNT_DELETE_SUCCESS",
    message: "Xóa tài khoản thành công",
  },
};

export function useAccountActions({
  crud,
  query,
  form,
  modal,
  featureFeedback,
  fields,
}) {
  const crudActions = useFeatureResourceActions({
    crud,
    query,
    featureFeedback,
    messages: ACCOUNT_FEEDBACK,
  });

  const modalActions = useFeatureModalActions({
    modal,
    form,
  });

  const submitActions = useFeatureSubmit({
    form,
    modal,
    actions: crudActions,
    featureFeedback,
    fields,
    buildPayload: buildApiPayload,
    successMessages: ACCOUNT_FEEDBACK,
    idKey: ACCOUNT_FEATURE.config.idField
  });

  return {
    ...modalActions,
    ...crudActions,
    ...submitActions,
  };
}
