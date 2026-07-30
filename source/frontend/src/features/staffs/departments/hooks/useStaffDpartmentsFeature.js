/* eslint-disable react-hooks/exhaustive-deps */
import { STAFF_DEPARTMENT_FEATURE } from "../constants";

import { useProfilesCrud } from "./useStaffDpartmentCrud";
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
import { useProfileActions } from "./useStaffDpartmentActions";
import { useEffect } from "react";
import { useFeatureToolbar } from "@/hooks/feature/useFeatureToolbar";
import { useActions } from "@/hooks/state/useActions";
import { useRuntimeFeature } from "@/hooks/feature/useRuntimeFeature";

export function useDepartmentFeature() {
  const crud = useProfilesCrud();
  const modal = useFeatureModal(STAFF_DEPARTMENT_FEATURE.config.form);
  const { user } = useAuth();
  const context = {
    record: modal.record ?? {},
    mode: modal.mode ?? "create",
    user,
  };
  
  const runtimeFeature = useRuntimeFeature({
    feature: STAFF_DEPARTMENT_FEATURE,
    context,
  });

  const form = useFeatureForm({
    validationSchema: STAFF_DEPARTMENT_FEATURE.validation,
    initialData: STAFF_DEPARTMENT_FEATURE.forms.defaultValues,
    mode: modal.mode,
  });
  
  const feedback = useFeatureFeedback({form});
  const staffDepaetmentQuery = useFeatureQuery(runtimeFeature.query);
  const debouncedSearch = useDebounce(staffDepaetmentQuery.query.search, 1000);

  useEffect(() => {
    async function loadDepartments() {
      try {
        await crud.getList({
          ...staffDepaetmentQuery.query,
          search: debouncedSearch,
        });
      } catch (error) {
        feedback.handleError(error);
      }
    }

    loadDepartments();
  }, [
    crud.getList,
    staffDepaetmentQuery.query,
    debouncedSearch,
    staffDepaetmentQuery.refreshKey,
  ]);


  const actions = useProfileActions({
    crud,
    query: staffDepaetmentQuery,
    form,
    modal,
    featureFeedback: feedback,
    fields: runtimeFeature.feature.fields,
  });

  const toolbar = useFeatureToolbar({
    query: staffDepaetmentQuery,
    config: STAFF_DEPARTMENT_FEATURE.config.table.toolbar,
    actions: {
      create: actions.modal.openCreate,
      refresh: actions.crud.refresh,
      reset: actions.crud.reset,
      cancel: actions.modal.cancel,
    },
  });

  const table = useFeatureTable({
    config: STAFF_DEPARTMENT_FEATURE.config.table.rowActions,
    columns: STAFF_DEPARTMENT_FEATURE.table.columns,
    items: crud.items,
    pagination: crud.pagination,
    loading: crud.loading,
    rowKey: STAFF_DEPARTMENT_FEATURE.config.idField,
    actions: {
      view: actions.modal.openView,
      update: actions.modal.openUpdate,
      delete: actions.crud.remove,
      cancel: actions.modal.cancel,
    },

    queryState: staffDepaetmentQuery,
  });

  const formView = useFeatureFormView({
    modal,
    form,
    schema: runtimeFeature,
  });

  const crudModal = {
    actions: useActions(STAFF_DEPARTMENT_FEATURE.config.form.footerActions, {
      submit: actions.submit,
      cancel: actions.modal.cancel,
    }),
  };

  return {
    staffDepaetmentQuery,
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
