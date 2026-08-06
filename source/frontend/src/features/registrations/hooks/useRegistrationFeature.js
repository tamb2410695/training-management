/* eslint-disable react-hooks/exhaustive-deps */
import { REGISTRATION_FEATURE } from "../constants";
import { useEffect } from "react";

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

import { useFeatureToolbar } from "@/hooks/feature/useFeatureToolbar";
import { useActions } from "@/hooks/state/useActions";
import { useRegistrationActions } from "./useRegistrationActions";
import { useRegistrationsCrud } from "./useRegistrationCrud";
import { useRuntimeFeature } from "@/hooks/feature/useRuntimeFeature";
import { resolveRegistrationRowRuntime } from "../policies/resolveRegistrationRowRuntime";

export function useRegistrationFeature() {
  const crud = useRegistrationsCrud();
  const modal = useFeatureModal(REGISTRATION_FEATURE.config.form);
  const { user } = useAuth();
  const context = {
    record: modal.record ?? {},
    mode: modal.mode ?? "create",
    user,
  };

  const runtimeFeature = useRuntimeFeature({
    feature: REGISTRATION_FEATURE,
    context,
  });

  const form = useFeatureForm({
    validationSchema: REGISTRATION_FEATURE.validation,
    initialData: REGISTRATION_FEATURE.forms.defaultValues,
    mode: modal.mode,
  });
  const registrationQuery = useFeatureQuery(runtimeFeature.query);
  const feedback = useFeatureFeedback(form);

  const debouncedSearch = useDebounce(registrationQuery.query.search, 1000);

  useEffect(() => {
    async function loadRegistrations() {
      try {
        await crud.getList({
          ...registrationQuery.query,
          search: debouncedSearch,
        });
      } catch (error) {
        feedback.handleError(error);
      }
    }

    loadRegistrations();
  }, [
    crud.getList,
    registrationQuery.query,
    debouncedSearch,
    registrationQuery.refreshKey,
  ]);

  const actions = useRegistrationActions({
    crud,
    query: registrationQuery,
    form,
    modal,
    featureFeedback: feedback,
    fields: REGISTRATION_FEATURE.fields,
  });

  const toolbar = useFeatureToolbar({
    schema: REGISTRATION_FEATURE,
    query: registrationQuery,
    config: REGISTRATION_FEATURE.config.table.toolbar,
    actions: {
      create: actions.openCreate,
      refresh: actions.refresh,
      reset: actions.reset,
      cancel: actions.cancel,
    },
  });

  const table = useFeatureTable({
    config: REGISTRATION_FEATURE.config.table.rowActions,
    columns: REGISTRATION_FEATURE.table.columns,
    items: crud.items,
    pagination: crud.pagination,
    loading: crud.loading,
    rowKey: REGISTRATION_FEATURE.config.idField,
    actions: {
      create: actions.openCreate,
      update: actions.openUpdate,
      view: actions.openView,
      remove: actions.remove,
      cancel: actions.cancel,
    },
    context,
    resolveRowRuntime: resolveRegistrationRowRuntime,
    queryState: registrationQuery,
  });

  const formView = useFeatureFormView({
    modal,
    form,
    schema: runtimeFeature,
  });

  const crudModal = {
    actions: useActions(REGISTRATION_FEATURE.config.form.footerActions, {
      submit: actions.submit,
      cancel: actions.cancel,
    }),
  };

  return {
    registrationQuery,
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
