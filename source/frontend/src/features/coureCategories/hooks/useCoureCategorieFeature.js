/* eslint-disable react-hooks/exhaustive-deps */
import { COURECATEGORIE_FEATURE } from "../constants";
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
import { useCoureCategorieActions } from "./useCoureCategorieActions";
import { useCoureCategoriesCrud } from "./useCoureCategorieCrud";
import { useRuntimeFeature } from "@/hooks/feature/useRuntimeFeature";
import { resolveCoureCategorieRowRuntime } from "../policies/resolveCoureCategorieRowRuntime";

export function useCoureCategorieFeature() {
  const crud = useCoureCategoriesCrud();
  const modal = useFeatureModal(COURECATEGORIE_FEATURE.config.form);
  const { user } = useAuth();
  const context = {
    record: modal.record ?? {},
    mode: modal.mode ?? "create",
    user,
  };

  const runtimeFeature = useRuntimeFeature({
    feature: COURECATEGORIE_FEATURE,
    context,
  });

  const form = useFeatureForm({
    validationSchema: COURECATEGORIE_FEATURE.validation,
    initialData: COURECATEGORIE_FEATURE.forms.defaultValues,
    mode: modal.mode,
  });
  const coureCategorieQuery = useFeatureQuery(runtimeFeature.query);
  const feedback = useFeatureFeedback(form);

  const debouncedSearch = useDebounce(coureCategorieQuery.query.search, 1000);

  useEffect(() => {
    async function loadCoureCategories() {
      try {
        await crud.getList({
          ...coureCategorieQuery.query,
          search: debouncedSearch,
        });
      } catch (error) {
        feedback.handleError(error);
      }
    }

    loadCoureCategories();
  }, [
    crud.getList,
    coureCategorieQuery.query,
    debouncedSearch,
    coureCategorieQuery.refreshKey,
  ]);

  const actions = useCoureCategorieActions({
    crud,
    query: coureCategorieQuery,
    form,
    modal,
    featureFeedback: feedback,
    fields: COURECATEGORIE_FEATURE.fields,
  });

  const toolbar = useFeatureToolbar({
    schema: COURECATEGORIE_FEATURE,
    query: coureCategorieQuery,
    config: COURECATEGORIE_FEATURE.config.table.toolbar,
    actions: {
      create: actions.openCreate,
      refresh: actions.refresh,
      reset: actions.reset,
      cancel: actions.cancel,
    },
  });

  const table = useFeatureTable({
    config: COURECATEGORIE_FEATURE.config.table.rowActions,
    columns: COURECATEGORIE_FEATURE.table.columns,
    items: crud.items,
    pagination: crud.pagination,
    loading: crud.loading,
    rowKey: COURECATEGORIE_FEATURE.config.idField,
    actions: {
      create: actions.openCreate,
      update: actions.openUpdate,
      view: actions.openView,
      remove: actions.remove,
      cancel: actions.cancel,
    },
    context,
    resolveRowRuntime: resolveCoureCategorieRowRuntime,
    queryState: coureCategorieQuery,
  });

  const formView = useFeatureFormView({
    modal,
    form,
    schema: runtimeFeature,
  });

  const crudModal = {
    actions: useActions(COURECATEGORIE_FEATURE.config.form.footerActions, {
      submit: actions.submit,
      cancel: actions.cancel,
    }),
  };

  return {
    coureCategorieQuery,
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
