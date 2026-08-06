import {
  useFeatureModalActions,
  useFeatureResourceActions,
  useFeatureSubmit,
} from "@/hooks";
import { buildApiPayload } from "@/utils";
import { ENROLLMENT_FEATURE } from "../constants";

export const ENROLLMENT_FEEDBACK = {
  create: {
    code: "ENROLLMENT_CREATE_SUCCESS",
    message: "Tạo tài khoản thành công",
  },

  update: {
    code: "ENROLLMENT_UPDATE_SUCCESS",
    message: "Cập nhật tài khoản thành công",
  },

  delete: {
    code: "ENROLLMENT_DELETE_SUCCESS",
    message: "Xóa tài khoản thành công",
  },
};

export function useEnrollmentActions({
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
    messages: ENROLLMENT_FEEDBACK,
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
    successMessages: ENROLLMENT_FEEDBACK,
    idKey: ENROLLMENT_FEATURE.config.idField
  });

  return {
    ...modalActions,
    ...crudActions,
    ...submitActions,
  };
}
