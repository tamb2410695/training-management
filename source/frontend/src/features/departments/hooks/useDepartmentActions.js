import {
  useFeatureModalActions,
  useFeatureResourceActions,
  useFeatureSubmit,
} from "@/hooks";
import { buildApiPayload } from "@/utils";
import { DEPARTMENT_FEATURE } from "../constants";

export const DEPARTMENT_FEEDBACK = {
  create: {
    code: "DEPARTMENT_CREATE_SUCCESS",
    message: "Tạo nhân viên thành công",
  },

  update: {
    code: "DEPARTMENT_UPDATE_SUCCESS",
    message: "Cập nhật nhân viên thành công",
  },

  delete: {
    code: "DEPARTMENT_DELETE_SUCCESS",
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
    messages: DEPARTMENT_FEEDBACK,
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
    successMessages: DEPARTMENT_FEEDBACK,
    idKey: DEPARTMENT_FEATURE.config.idField
  });


  return {
    modal: modalActions,
    crud: crudActions,
    submit: submitActions.submit,
  };
}
