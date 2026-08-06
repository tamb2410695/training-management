/* eslint-disable react-hooks/exhaustive-deps */
import { COURSE_FEATURE } from "../constants";
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
import { useCourseActions } from "./useCourseActions";
import { useCoursesCrud } from "./useCourseCrud";
import { useRuntimeFeature } from "@/hooks/feature/useRuntimeFeature";
import { resolveCourseRowRuntime } from "../policies/resolveCourseRowRuntime";

export function useCourseFeature() {
  const crud = useCoursesCrud();
  const modal = useFeatureModal(COURSE_FEATURE.config.form);
  const { user } = useAuth();
  const context = {
    record: modal.record ?? {},
    mode: modal.mode ?? "create",
    user,
  };

  const runtimeFeature = useRuntimeFeature({
    feature: COURSE_FEATURE,
    context,
  });

  const form = useFeatureForm({
    validationSchema: COURSE_FEATURE.validation,
    initialData: COURSE_FEATURE.forms.defaultValues,
    mode: modal.mode,
  });
  const courseQuery = useFeatureQuery(runtimeFeature.query);
  const feedback = useFeatureFeedback(form);

  const debouncedSearch = useDebounce(courseQuery.query.search, 1000);

  useEffect(() => {
    async function loadCourses() {
      try {
        await crud.getList({
          ...courseQuery.query,
          search: debouncedSearch,
        });
      } catch (error) {
        feedback.handleError(error);
      }
    }

    loadCourses();
  }, [
    crud.getList,
    courseQuery.query,
    debouncedSearch,
    courseQuery.refreshKey,
  ]);

  const actions = useCourseActions({
    crud,
    query: courseQuery,
    form,
    modal,
    featureFeedback: feedback,
    fields: COURSE_FEATURE.fields,
  });

  const toolbar = useFeatureToolbar({
    schema: COURSE_FEATURE,
    query: courseQuery,
    config: COURSE_FEATURE.config.table.toolbar,
    actions: {
      create: actions.openCreate,
      refresh: actions.refresh,
      reset: actions.reset,
      cancel: actions.cancel,
    },
  });

  const table = useFeatureTable({
    config: COURSE_FEATURE.config.table.rowActions,
    columns: COURSE_FEATURE.table.columns,
    items: crud.items,
    pagination: crud.pagination,
    loading: crud.loading,
    rowKey: COURSE_FEATURE.config.idField,
    actions: {
      create: actions.openCreate,
      update: actions.openUpdate,
      view: actions.openView,
      remove: actions.remove,
      cancel: actions.cancel,
    },
    context,
    resolveRowRuntime: resolveCourseRowRuntime,
    queryState: courseQuery,
  });

  const formView = useFeatureFormView({
    modal,
    form,
    schema: runtimeFeature,
  });

  const crudModal = {
    actions: useActions(COURSE_FEATURE.config.form.footerActions, {
      submit: actions.submit,
      cancel: actions.cancel,
    }),
  };

  return {
    courseQuery,
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
