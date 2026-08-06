import {
  useFeatureModalActions,
  useFeatureResourceActions,
  useFeatureSubmit,
} from "@/hooks";
import { buildApiPayload } from "@/utils";
import { REGISTRATION_FEATURE } from "../constants";

export const REGISTRATION_FEEDBACK = {
  create: {
    code: "REGISTRATION_CREATE_SUCCESS",
    message: "Tạo tài khoản thành công",
  },

  update: {
    code: "REGISTRATION_UPDATE_SUCCESS",
    message: "Cập nhật tài khoản thành công",
  },

  delete: {
    code: "REGISTRATION_DELETE_SUCCESS",
    message: "Xóa tài khoản thành công",
  },
};

export function useRegistrationActions({
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
    messages: REGISTRATION_FEEDBACK,
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
    successMessages: REGISTRATION_FEEDBACK,
    idKey: REGISTRATION_FEATURE.config.idField
  });

  return {
    ...modalActions,
    ...crudActions,
    ...submitActions,
  };
}
