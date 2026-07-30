import {
  useFeatureModalActions,
  useFeatureResourceActions,
  useFeatureSubmit,
} from "@/hooks";
import { buildApiPayload } from "@/utils";
import { STUDENT_FEATURE } from "../constants";

export const STUDENT_FEEDBACK = {
  create: {
    code: "STUDENT_CREATE_SUCCESS",
    message: "Tạo học viên thành công",
  },

  update: {
    code: "STUDENT_UPDATE_SUCCESS",
    message: "Cập nhật học viên thành công",
  },

  delete: {
    code: "STUDENT_DELETE_SUCCESS",
    message: "Xóa học viên thành công",
  },
};

export function useStudentActions({
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
    messages: STUDENT_FEEDBACK,
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
    successMessages: STUDENT_FEEDBACK,
    idKey: STUDENT_FEATURE.config.idField
  });

  return {
    modal: modalActions,
    crud: crudActions,
    submit: submitActions.submit,
  };
}
