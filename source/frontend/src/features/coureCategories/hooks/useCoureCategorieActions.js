import {
  useFeatureModalActions,
  useFeatureResourceActions,
  useFeatureSubmit,
} from "@/hooks";
import { buildApiPayload } from "@/utils";
import { COURECATEGORIE_FEATURE } from "../constants";

export const COURECATEGORIE_FEEDBACK = {
  create: {
    code: "COURECATEGORIE_CREATE_SUCCESS",
    message: "Tạo tài khoản thành công",
  },

  update: {
    code: "COURECATEGORIE_UPDATE_SUCCESS",
    message: "Cập nhật tài khoản thành công",
  },

  delete: {
    code: "COURECATEGORIE_DELETE_SUCCESS",
    message: "Xóa tài khoản thành công",
  },
};

export function useCoureCategorieActions({
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
    messages: COURECATEGORIE_FEEDBACK,
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
    successMessages: COURECATEGORIE_FEEDBACK,
    idKey: COURECATEGORIE_FEATURE.config.idField
  });

  return {
    ...modalActions,
    ...crudActions,
    ...submitActions,
  };
}
