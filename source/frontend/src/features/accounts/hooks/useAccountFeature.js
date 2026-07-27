/* eslint-disable react-hooks/exhaustive-deps */
import { ACCOUNT_FEATURE } from "../constants";

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
import { useEffect } from "react";
import { useFeatureToolbar } from "@/hooks/feature/useFeatureToolbar";
import { useActions } from "@/hooks/state/useActions";
import { useAccountActions } from "./useAccountActions";
import { useAccountsCrud } from "./useAccountCrud";
import { useAccountSchema } from "./useAccountSchema";
import { useRuntimeFeature } from "@/hooks/feature/useRuntimeFeature";
import { resolveAccountPolicy } from "../policies/resolveAccountPolicy";
import { useState } from "react";

export function useAccountFeature() {
  const crud = useAccountsCrud();
  const [accountType, setAccountType] = useState("student");
  const modal = useFeatureModal(ACCOUNT_FEATURE.config.form);
  const { user } = useAuth();
  const context = {
    account: modal.record ?? {},
    mode: modal.mode ?? "create",
    currentStatus: modal.record.accountStatus,
    user,
    accountType,
  };
  const accountPolicy = resolveAccountPolicy({context});
  const runtimeFeature = useRuntimeFeature({
    feature: ACCOUNT_FEATURE,
    context: {
      record: modal.record,
      mode: modal.mode,
      actions: resolveAccountPolicy,
    },
  });

  const accountQuery = useFeatureQuery(ACCOUNT_FEATURE.query);
  const form = useFeatureForm({
    validationSchema: ACCOUNT_FEATURE.validation,
    initialData: ACCOUNT_FEATURE.forms.defaultValues,
    mode: modal.mode,
  });
  const feedback = useFeatureFeedback(form);

  const runtimeForm = useAccountSchema({
    mode: modal.mode,
    account: modal.record,
  });

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
    schema: ACCOUNT_FEATURE,
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
    runtimeForm,
  };
}
