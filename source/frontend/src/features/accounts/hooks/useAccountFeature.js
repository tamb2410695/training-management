/* eslint-disable react-hooks/exhaustive-deps */
import { ACCOUNT_FEATURE } from "../constants";
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
import { useAccountActions } from "./useAccountActions";
import { useAccountsCrud } from "./useAccountCrud";
import { useRuntimeFeature } from "@/hooks/feature/useRuntimeFeature";

export function useAccountFeature() {
  const crud = useAccountsCrud();
  const modal = useFeatureModal(ACCOUNT_FEATURE.config.form);
  const { user } = useAuth();
  const context = {
    record: modal.record ?? {},
    mode: modal.mode ?? "create",
    user,
  };

  const runtimeFeature = useRuntimeFeature({
    feature: ACCOUNT_FEATURE,
    context,
  });

  const form = useFeatureForm({
    validationSchema: ACCOUNT_FEATURE.validation,
    initialData: ACCOUNT_FEATURE.forms.defaultValues,
    mode: modal.mode,
  });
  const accountQuery = useFeatureQuery(runtimeFeature.query);
  const feedback = useFeatureFeedback(form);

  const debouncedSearch = useDebounce(accountQuery.query.search, 1000);

  useEffect(() => {
    async function loadAccounts() {
      try {
        await crud.getList({
          ...accountQuery.query,
          search: debouncedSearch,
        });
      } catch (error) {
        feedback.handleError(error);
      }
    }

    loadAccounts();
  }, [
    crud.getList,
    accountQuery.query,
    debouncedSearch,
    accountQuery.refreshKey,
  ]);


  const actions = useAccountActions({
    crud,
    query: accountQuery,
    form,
    modal,
    featureFeedback: feedback,
    fields: ACCOUNT_FEATURE.fields,
  });

  const toolbar = useFeatureToolbar({
    schema: ACCOUNT_FEATURE,
    query: accountQuery,
    config: ACCOUNT_FEATURE.config.table.toolbar,
    actions: {
      create: actions.modal.openCreate,
      refresh: actions.crud.refresh,
      reset: actions.crud.reset,
      cancel: actions.modal.cancel,
    },
  });

  const table = useFeatureTable({
    config: ACCOUNT_FEATURE.config.table.rowActions,
    columns: ACCOUNT_FEATURE.table.columns,
    items: crud.items,
    pagination: crud.pagination,
    loading: crud.loading,
    rowKey: ACCOUNT_FEATURE.config.idField,
    actions: {
      view: actions.modal.openView,
      update: actions.modal.openUpdate,
      delete: actions.crud.remove,
      cancel: actions.modal.cancel,
    },

    queryState: accountQuery,
  });

  const formView = useFeatureFormView({
    modal,
    form,
    schema: runtimeFeature,
  });

  const crudModal = {
    actions: useActions(ACCOUNT_FEATURE.config.form.footerActions, {
      submit: actions.submit,
      cancel: actions.modal.cancel,
    }),
  };

  return {
    accountQuery,
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
