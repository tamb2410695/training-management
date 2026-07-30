import {
  useFeatureModalActions,
  useFeatureResourceActions,
  useFeatureSubmit,
} from "@/hooks";
import { buildApiPayload } from "@/utils";
import { COURSE_FEATURE } from "../constants";

export const COURSE_FEEDBACK = {
  create: {
    code: "COURSE_CREATE_SUCCESS",
    message: "Tạo nhân viên thành công",
  },

  update: {
    code: "COURSE_UPDATE_SUCCESS",
    message: "Cập nhật nhân viên thành công",
  },

  delete: {
    code: "COURSE_DELETE_SUCCESS",
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
    messages: COURSE_FEEDBACK,
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
    successMessages: COURSE_FEEDBACK,
    idKey: COURSE_FEATURE.config.idField
  });


  return {
    modal: modalActions,
    crud: crudActions,
    submit: submitActions.submit,
  };
}
