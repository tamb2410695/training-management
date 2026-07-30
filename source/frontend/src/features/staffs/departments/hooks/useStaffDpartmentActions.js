import {
  useFeatureModalActions,
  useFeatureResourceActions,
  useFeatureSubmit,
} from "@/hooks";
import { buildApiPayload } from "@/utils";
import { STAFF_DEPARTMENT_FEATURE } from "../constants";

export const STAFF_DEPARTMENT_FEEDBACK = {
  create: {
    code: "STAFF_DEPARTMENT_CREATE_SUCCESS",
    message: "Tạo nhân viên thành công",
  },

  update: {
    code: "STAFF_DEPARTMENT_UPDATE_SUCCESS",
    message: "Cập nhật nhân viên thành công",
  },

  delete: {
    code: "STAFF_DEPARTMENT_DELETE_SUCCESS",
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
    messages: STAFF_DEPARTMENT_FEEDBACK,
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
    successMessages: STAFF_DEPARTMENT_FEEDBACK,
    idKey: STAFF_DEPARTMENT_FEATURE.config.idField
  });


  return {
    modal: modalActions,
    crud: crudActions,
    submit: submitActions.submit,
  };
}
