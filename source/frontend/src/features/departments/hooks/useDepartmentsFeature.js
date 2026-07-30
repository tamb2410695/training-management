/* eslint-disable react-hooks/exhaustive-deps */
import { DEPARTMENT_FEATURE } from "../constants";

import { useDepartmentCrud } from "./useDepartmentCrud";
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
import { useProfileActions } from "./useDepartmentActions";
import { useEffect } from "react";
import { useFeatureToolbar } from "@/hooks/feature/useFeatureToolbar";
import { useActions } from "@/hooks/state/useActions";
import { useRuntimeFeature } from "@/hooks/feature/useRuntimeFeature";

export function useDepartmentsFeature() {
  const crud = useDepartmentCrud();
  const modal = useFeatureModal(DEPARTMENT_FEATURE.config.form);
  const { user } = useAuth();
  const context = {
    record: modal.record ?? {},
    mode: modal.mode ?? "create",
    user,
  };
  
  const runtimeFeature = useRuntimeFeature({
    feature: DEPARTMENT_FEATURE,
    context,
  });

  const form = useFeatureForm({
    validationSchema: DEPARTMENT_FEATURE.validation,
    initialData: DEPARTMENT_FEATURE.forms.defaultValues,
    mode: modal.mode,
  });
  
  const feedback = useFeatureFeedback({form});
  const depaetmentQuery = useFeatureQuery(runtimeFeature.query);
  const debouncedSearch = useDebounce(depaetmentQuery.query.search, 1000);

  useEffect(() => {
    async function loadDepartments() {
      try {
        await crud.getList({
          ...depaetmentQuery.query,
          search: debouncedSearch,
        });
      } catch (error) {
        feedback.handleError(error);
      }
    }

    loadDepartments();
  }, [
    crud.getList,
    depaetmentQuery.query,
    debouncedSearch,
    depaetmentQuery.refreshKey,
  ]);


  const actions = useProfileActions({
    crud,
    query: depaetmentQuery,
    form,
    modal,
    featureFeedback: feedback,
    fields: runtimeFeature.feature.fields,
  });

  const toolbar = useFeatureToolbar({
    query: depaetmentQuery,
    config: DEPARTMENT_FEATURE.config.table.toolbar,
    actions: {
      create: actions.modal.openCreate,
      refresh: actions.crud.refresh,
      reset: actions.crud.reset,
      cancel: actions.modal.cancel,
    },
  });

  const table = useFeatureTable({
    config: DEPARTMENT_FEATURE.config.table.rowActions,
    columns: DEPARTMENT_FEATURE.table.columns,
    items: crud.items,
    pagination: crud.pagination,
    loading: crud.loading,
    rowKey: DEPARTMENT_FEATURE.config.idField,
    actions: {
      view: actions.modal.openView,
      update: actions.modal.openUpdate,
      delete: actions.crud.remove,
      cancel: actions.modal.cancel,
    },

    queryState: depaetmentQuery,
  });

  const formView = useFeatureFormView({
    modal,
    form,
    schema: runtimeFeature,
  });

  const crudModal = {
    actions: useActions(DEPARTMENT_FEATURE.config.form.footerActions, {
      submit: actions.submit,
      cancel: actions.modal.cancel,
    }),
  };

  return {
    depaetmentQuery,
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
