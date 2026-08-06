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
    message: "Tạo tài khoản thành công",
  },

  update: {
    code: "COURSE_UPDATE_SUCCESS",
    message: "Cập nhật tài khoản thành công",
  },

  delete: {
    code: "COURSE_DELETE_SUCCESS",
    message: "Xóa tài khoản thành công",
  },
};

export function useCourseActions({
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
    ...modalActions,
    ...crudActions,
    ...submitActions,
  };
}
