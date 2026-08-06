import {
  useFeatureModalActions,
  useFeatureResourceActions,
  useFeatureSubmit,
} from "@/hooks";
import { buildApiPayload } from "@/utils";
import { STAFF_PROFILE_FEATURE } from "../constants";

export const STAFF_PROFILE_FEEDBACK = {
  create: {
    code: "STAFF_PROFILE_CREATE_SUCCESS",
    message: "Tạo nhân viên thành công",
  },

  update: {
    code: "STAFF_PROFILE_UPDATE_SUCCESS",
    message: "Cập nhật nhân viên thành công",
  },

  delete: {
    code: "STAFF_PROFILE_DELETE_SUCCESS",
    message: "Xóa nhân viên thành công",
  },
};

export function useProfileActions({
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
    messages: STAFF_PROFILE_FEEDBACK,
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
    successMessages: STAFF_PROFILE_FEEDBACK,
    idKey: STAFF_PROFILE_FEATURE.config.idField
  });

  return {
    ...modalActions,
    ...crudActions,
    ...submitActions,
  };
}
