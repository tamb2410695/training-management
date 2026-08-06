import {
  useFeatureModalActions,
  useFeatureResourceActions,
  useFeatureSubmit,
} from "@/hooks";
import { buildApiPayload } from "@/utils";
import { DOCUMENT_FEATURE } from "../constants";

export const DOCUMENT_FEEDBACK = {
  create: {
    code: "DOCUMENT_CREATE_SUCCESS",
    message: "Tạo tài khoản thành công",
  },

  update: {
    code: "DOCUMENT_UPDATE_SUCCESS",
    message: "Cập nhật tài khoản thành công",
  },

  delete: {
    code: "DOCUMENT_DELETE_SUCCESS",
    message: "Xóa tài khoản thành công",
  },
};

export function useDocumentActions({
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
    messages: DOCUMENT_FEEDBACK,
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
    successMessages: DOCUMENT_FEEDBACK,
    idKey: DOCUMENT_FEATURE.config.idField
  });

  return {
    ...modalActions,
    ...crudActions,
    ...submitActions,
  };
}
