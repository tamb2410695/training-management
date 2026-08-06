/* eslint-disable react-hooks/exhaustive-deps */
import { DOCUMENT_FEATURE } from "../constants";
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
import { useDocumentActions } from "./useDocumentActions";
import { useDocumentsCrud } from "./useDocumentCrud";
import { useRuntimeFeature } from "@/hooks/feature/useRuntimeFeature";
import { resolveDocumentRowRuntime } from "../policies/resolveDocumentRowRuntime";

export function useDocumentFeature() {
  const crud = useDocumentsCrud();
  const modal = useFeatureModal(DOCUMENT_FEATURE.config.form);
  const { user } = useAuth();
  const context = {
    record: modal.record ?? {},
    mode: modal.mode ?? "create",
    user,
  };

  const runtimeFeature = useRuntimeFeature({
    feature: DOCUMENT_FEATURE,
    context,
  });

  const form = useFeatureForm({
    validationSchema: DOCUMENT_FEATURE.validation,
    initialData: DOCUMENT_FEATURE.forms.defaultValues,
    mode: modal.mode,
  });
  const documentQuery = useFeatureQuery(runtimeFeature.query);
  const feedback = useFeatureFeedback(form);

  const debouncedSearch = useDebounce(documentQuery.query.search, 1000);

  useEffect(() => {
    async function loadDocuments() {
      try {
        await crud.getList({
          ...documentQuery.query,
          search: debouncedSearch,
        });
      } catch (error) {
        feedback.handleError(error);
      }
    }

    loadDocuments();
  }, [
    crud.getList,
    documentQuery.query,
    debouncedSearch,
    documentQuery.refreshKey,
  ]);

  const actions = useDocumentActions({
    crud,
    query: documentQuery,
    form,
    modal,
    featureFeedback: feedback,
    fields: DOCUMENT_FEATURE.fields,
  });

  const toolbar = useFeatureToolbar({
    schema: DOCUMENT_FEATURE,
    query: documentQuery,
    config: DOCUMENT_FEATURE.config.table.toolbar,
    actions: {
      create: actions.openCreate,
      refresh: actions.refresh,
      reset: actions.reset,
      cancel: actions.cancel,
    },
  });

  const table = useFeatureTable({
    config: DOCUMENT_FEATURE.config.table.rowActions,
    columns: DOCUMENT_FEATURE.table.columns,
    items: crud.items,
    pagination: crud.pagination,
    loading: crud.loading,
    rowKey: DOCUMENT_FEATURE.config.idField,
    actions: {
      create: actions.openCreate,
      update: actions.openUpdate,
      view: actions.openView,
      remove: actions.remove,
      cancel: actions.cancel,
    },
    context,
    resolveRowRuntime: resolveDocumentRowRuntime,
    queryState: documentQuery,
  });

  const formView = useFeatureFormView({
    modal,
    form,
    schema: runtimeFeature,
  });

  const crudModal = {
    actions: useActions(DOCUMENT_FEATURE.config.form.footerActions, {
      submit: actions.submit,
      cancel: actions.cancel,
    }),
  };

  return {
    documentQuery,
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
