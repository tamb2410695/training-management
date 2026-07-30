/* eslint-disable react-hooks/exhaustive-deps */
import { STAFF_PROFILE_FEATURE } from "../constants";

import { useProfilesCrud } from "./useProfileCrud";
import {
  useAuth,
  useDebounce,
  useFeatureFeedback,
  useFeatureForm,
  useFeatureFormView,
  useFeatureModal,
  useFeatureQuery,
  useFeatureTable,
} from "@/hooks";
import { useProfileActions } from "./useProfileActions";
import { useEffect } from "react";
import { useFeatureToolbar } from "@/hooks/feature/useFeatureToolbar";
import { useActions } from "@/hooks/state/useActions";
import { useRuntimeFeature } from "@/hooks/feature/useRuntimeFeature";

export function useStaffProfileFeature() {
  const crud = useProfilesCrud();
  const modal = useFeatureModal(STAFF_PROFILE_FEATURE.config.form);
  const { user } = useAuth();
  const context = {
    record: modal.record ?? {},
    mode: modal.mode ?? "create",
    user,
  };
  
  const runtimeFeature = useRuntimeFeature({
    feature: STAFF_PROFILE_FEATURE,
    context,
  });

  const form = useFeatureForm({
    validationSchema: STAFF_PROFILE_FEATURE.validation,
    initialData: STAFF_PROFILE_FEATURE.forms.defaultValues,
    mode: modal.mode,
  });
  
  const feedback = useFeatureFeedback({form});
  const profileQuery = useFeatureQuery(runtimeFeature.query);
  const debouncedSearch = useDebounce(profileQuery.query.search, 1000);

  useEffect(() => {
    async function loadStaffProfiles() {
      try {
        await crud.getList({
          ...profileQuery.query,
          search: debouncedSearch,
        });
      } catch (error) {
        feedback.handleError(error);
      }
    }

    loadStaffProfiles();
  }, [
    crud.getList,
    profileQuery.query,
    debouncedSearch,
    profileQuery.refreshKey,
  ]);


  const actions = useProfileActions({
    crud,
    query: profileQuery,
    form,
    modal,
    featureFeedback: feedback,
    fields: runtimeFeature.feature.fields,
  });

  const toolbar = useFeatureToolbar({
    query: profileQuery,
    config: STAFF_PROFILE_FEATURE.config.table.toolbar,
    actions: {
      create: actions.modal.openCreate,
      refresh: actions.crud.refresh,
      reset: actions.crud.reset,
      cancel: actions.modal.cancel,
    },
  });

  const table = useFeatureTable({
    config: STAFF_PROFILE_FEATURE.config.table.rowActions,
    columns: STAFF_PROFILE_FEATURE.table.columns,
    items: crud.items,
    pagination: crud.pagination,
    loading: crud.loading,
    rowKey: STAFF_PROFILE_FEATURE.config.idField,
    actions: {
      view: actions.modal.openView,
      update: actions.modal.openUpdate,
      delete: actions.crud.remove,
      cancel: actions.modal.cancel,
    },

    queryState: profileQuery,
  });

  const formView = useFeatureFormView({
    modal,
    form,
    schema: runtimeFeature,
  });

  const crudModal = {
    actions: useActions(STAFF_PROFILE_FEATURE.config.form.footerActions, {
      submit: actions.submit,
      cancel: actions.modal.cancel,
    }),
  };

  return {
    profileQuery,
    crud,
    actions,
    toolbar,
    table,
    formView,
    form,
    modal,
    feedback,
    crudModal,
  };
}
