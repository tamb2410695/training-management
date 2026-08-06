/* eslint-disable react-hooks/exhaustive-deps */
import { ENROLLMENT_FEATURE } from "../constants";
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
import { useEnrollmentActions } from "./useEnrollmentActions";
import { useEnrollmentsCrud } from "./useEnrollmentCrud";
import { useRuntimeFeature } from "@/hooks/feature/useRuntimeFeature";
import { resolveEnrollmentRowRuntime } from "../policies/resolveEnrollmentRowRuntime";

export function useEnrollmentFeature() {
  const crud = useEnrollmentsCrud();
  const modal = useFeatureModal(ENROLLMENT_FEATURE.config.form);
  const { user } = useAuth();
  const context = {
    record: modal.record ?? {},
    mode: modal.mode ?? "create",
    user,
  };

  const runtimeFeature = useRuntimeFeature({
    feature: ENROLLMENT_FEATURE,
    context,
  });

  const form = useFeatureForm({
    validationSchema: ENROLLMENT_FEATURE.validation,
    initialData: ENROLLMENT_FEATURE.forms.defaultValues,
    mode: modal.mode,
  });
  const enrollmentQuery = useFeatureQuery(runtimeFeature.query);
  const feedback = useFeatureFeedback(form);

  const debouncedSearch = useDebounce(enrollmentQuery.query.search, 1000);

  useEffect(() => {
    async function loadEnrollments() {
      try {
        await crud.getList({
          ...enrollmentQuery.query,
          search: debouncedSearch,
        });
      } catch (error) {
        feedback.handleError(error);
      }
    }

    loadEnrollments();
  }, [
    crud.getList,
    enrollmentQuery.query,
    debouncedSearch,
    enrollmentQuery.refreshKey,
  ]);

  const actions = useEnrollmentActions({
    crud,
    query: enrollmentQuery,
    form,
    modal,
    featureFeedback: feedback,
    fields: ENROLLMENT_FEATURE.fields,
  });

  const toolbar = useFeatureToolbar({
    schema: ENROLLMENT_FEATURE,
    query: enrollmentQuery,
    config: ENROLLMENT_FEATURE.config.table.toolbar,
    actions: {
      create: actions.openCreate,
      refresh: actions.refresh,
      reset: actions.reset,
      cancel: actions.cancel,
    },
  });

  const table = useFeatureTable({
    config: ENROLLMENT_FEATURE.config.table.rowActions,
    columns: ENROLLMENT_FEATURE.table.columns,
    items: crud.items,
    pagination: crud.pagination,
    loading: crud.loading,
    rowKey: ENROLLMENT_FEATURE.config.idField,
    actions: {
      create: actions.openCreate,
      update: actions.openUpdate,
      view: actions.openView,
      remove: actions.remove,
      cancel: actions.cancel,
    },
    context,
    resolveRowRuntime: resolveEnrollmentRowRuntime,
    queryState: enrollmentQuery,
  });

  const formView = useFeatureFormView({
    modal,
    form,
    schema: runtimeFeature,
  });

  const crudModal = {
    actions: useActions(ENROLLMENT_FEATURE.config.form.footerActions, {
      submit: actions.submit,
      cancel: actions.cancel,
    }),
  };

  return {
    enrollmentQuery,
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
