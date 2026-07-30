/* eslint-disable react-hooks/exhaustive-deps */
import { COURSE_FEATURE } from "../constants";

import { useCoursesCrud } from "./useCoursesCrud";
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
import { useProfileActions } from "./useCoursesActions";
import { useEffect } from "react";
import { useFeatureToolbar } from "@/hooks/feature/useFeatureToolbar";
import { useActions } from "@/hooks/state/useActions";
import { useRuntimeFeature } from "@/hooks/feature/useRuntimeFeature";

export function useCoursesFeature() {
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
  
  const feedback = useFeatureFeedback({form});
  const courseQuery = useFeatureQuery(runtimeFeature.query);
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


  const actions = useProfileActions({
    crud,
    query: courseQuery,
    form,
    modal,
    featureFeedback: feedback,
    fields: runtimeFeature.feature.fields,
  });

  const toolbar = useFeatureToolbar({
    query: courseQuery,
    config: COURSE_FEATURE.config.table.toolbar,
    actions: {
      create: actions.modal.openCreate,
      refresh: actions.crud.refresh,
      reset: actions.crud.reset,
      cancel: actions.modal.cancel,
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
      view: actions.modal.openView,
      update: actions.modal.openUpdate,
      delete: actions.crud.remove,
      cancel: actions.modal.cancel,
    },

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
      cancel: actions.modal.cancel,
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
