/* eslint-disable react-hooks/exhaustive-deps */
import { CLASS_FEATURE } from "../constants";
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
import { useClasseActions } from "./useClasseActions";
import { useClassesCrud } from "./useClasseCrud";
import { useRuntimeFeature } from "@/hooks/feature/useRuntimeFeature";
import { resolveClasseRowRuntime } from "../policies/resolveClasseRowRuntime";

export function useClasseFeature() {
  const crud = useClassesCrud();
  const modal = useFeatureModal(CLASS_FEATURE.config.form);
  const { user } = useAuth();
  const context = {
    record: modal.record ?? {},
    mode: modal.mode ?? "create",
    user,
  };

  const runtimeFeature = useRuntimeFeature({
    feature: CLASS_FEATURE,
    context,
  });

  const form = useFeatureForm({
    validationSchema: CLASS_FEATURE.validation,
    initialData: CLASS_FEATURE.forms.defaultValues,
    mode: modal.mode,
  });
  const classeQuery = useFeatureQuery(runtimeFeature.query);
  const feedback = useFeatureFeedback(form);

  const debouncedSearch = useDebounce(classeQuery.query.search, 1000);

  useEffect(() => {
    async function loadClasses() {
      try {
        await crud.getList({
          ...classeQuery.query,
          search: debouncedSearch,
        });
      } catch (error) {
        feedback.handleError(error);
      }
    }

    loadClasses();
  }, [
    crud.getList,
    classeQuery.query,
    debouncedSearch,
    classeQuery.refreshKey,
  ]);

  const actions = useClasseActions({
    crud,
    query: classeQuery,
    form,
    modal,
    featureFeedback: feedback,
    fields: CLASS_FEATURE.fields,
  });

  const toolbar = useFeatureToolbar({
    schema: CLASS_FEATURE,
    query: classeQuery,
    config: CLASS_FEATURE.config.table.toolbar,
    actions: {
      create: actions.openCreate,
      refresh: actions.refresh,
      reset: actions.reset,
      cancel: actions.cancel,
    },
  });

  const table = useFeatureTable({
    config: CLASS_FEATURE.config.table.rowActions,
    columns: CLASS_FEATURE.table.columns,
    items: crud.items,
    pagination: crud.pagination,
    loading: crud.loading,
    rowKey: CLASS_FEATURE.config.idField,
    actions: {
      create: actions.openCreate,
      update: actions.openUpdate,
      view: actions.openView,
      remove: actions.remove,
      cancel: actions.cancel,
    },
    context,
    resolveRowRuntime: resolveClasseRowRuntime,
    queryState: classeQuery,
  });

  const formView = useFeatureFormView({
    modal,
    form,
    schema: runtimeFeature,
  });

  const crudModal = {
    actions: useActions(CLASS_FEATURE.config.form.footerActions, {
      submit: actions.submit,
      cancel: actions.cancel,
    }),
  };

  return {
    classeQuery,
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
