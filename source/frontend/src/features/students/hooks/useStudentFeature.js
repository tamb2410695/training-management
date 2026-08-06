/* eslint-disable react-hooks/exhaustive-deps */
import { STUDENT_FEATURE } from "../constants";

import { useStudentsCrud } from "./useStudentCrud";
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
import { useStudentActions } from "./useStudentActions";
import { useEffect } from "react";
import { useFeatureToolbar } from "@/hooks/feature/useFeatureToolbar";
import { useActions } from "@/hooks/state/useActions";
import { useRuntimeFeature } from "@/hooks/feature/useRuntimeFeature";
import { resolveStudentRowRuntime } from "../policies/resolveStudentRowRuntime";

export function useStudentFeature() {
  const crud = useStudentsCrud();
  const modal = useFeatureModal(STUDENT_FEATURE.config.form);
  const { user } = useAuth();
  const context = {
    record: modal.record ?? {},
    mode: modal.mode ?? "create",
    user,
  };


  const runtimeFeature = useRuntimeFeature({
    feature: STUDENT_FEATURE,
    context,
  });

  const form = useFeatureForm({
    validationSchema: STUDENT_FEATURE.validation,
    initialData: STUDENT_FEATURE.forms.defaultValues,
    mode: modal.mode,
  });

  const feedback = useFeatureFeedback({form});
  const studentQuery = useFeatureQuery(runtimeFeature.query);
  const debouncedSearch = useDebounce(studentQuery.query.search, 1000);

  useEffect(() => {
    async function loadStudents() {
      try {
        await crud.getList({
          ...studentQuery.query,
          search: debouncedSearch,
        });
      } catch (error) {
        feedback.handleError(error);
      }
    }

    loadStudents();
  }, [
    crud.getList,
    studentQuery.query,
    debouncedSearch,
    studentQuery.refreshKey,
  ]);

  const actions = useStudentActions({
    crud,
    query: studentQuery,
    form,
    modal,
    featureFeedback: feedback,
    fields: runtimeFeature.feature.fields,
  });

  const toolbar = useFeatureToolbar({
    query: studentQuery,
    config: STUDENT_FEATURE.config.table.toolbar,
    actions: {
      create: actions.openCreate,
      refresh: actions.refresh,
      reset: actions.reset,
      cancel: actions.cancel,
    },
  });

  const table = useFeatureTable({
    config: STUDENT_FEATURE.config.table.rowActions,
    columns: STUDENT_FEATURE.table.columns,
    items: crud.items,
    pagination: crud.pagination,
    loading: crud.loading,
    rowKey: STUDENT_FEATURE.config.idField,
    actions: {
      create: actions.openCreate,
      update: actions.openUpdate,
      view: actions.openView,
      remove: actions.remove,
      cancel: actions.cancel,
    },

    context,
    resolveRowRuntime: resolveStudentRowRuntime,
    queryState: studentQuery,
  });

  const formView = useFeatureFormView({
    modal,
    form,
    schema: runtimeFeature,
  });

  const crudModal = {
    actions: useActions(STUDENT_FEATURE.config.form.footerActions, {
      submit: actions.submit,
      cancel: actions.cancel,
    }),
  };

  return {
    studentQuery,
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
