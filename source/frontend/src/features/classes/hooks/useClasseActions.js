import {
  useFeatureModalActions,
  useFeatureResourceActions,
  useFeatureSubmit,
} from "@/hooks";
import { buildApiPayload } from "@/utils";
import { CLASS_FEATURE } from "../constants";

export const CLASS_FEEDBACK = {
  create: {
    code: "CLASS_CREATE_SUCCESS",
    message: "Tạo tài khoản thành công",
  },

  update: {
    code: "CLASS_UPDATE_SUCCESS",
    message: "Cập nhật tài khoản thành công",
  },

  delete: {
    code: "CLASS_DELETE_SUCCESS",
    message: "Xóa tài khoản thành công",
  },
};

export function useClasseActions({
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
    messages: CLASS_FEEDBACK,
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
    successMessages: CLASS_FEEDBACK,
    idKey: CLASS_FEATURE.config.idField
  });

  return {
    ...modalActions,
    ...crudActions,
    ...submitActions,
  };
}
