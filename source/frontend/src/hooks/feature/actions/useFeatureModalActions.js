export function useFeatureModalActions({ modal, form }) {
  const openCreate = () => {
    form.reset();
    modal.open({
      mode: "create",
    });
  };

  const openUpdate = (record) => {
    form.setValues(record);
    modal.open({
      mode: "update",
      record,
    });
  };

  const openView = (record) => {
    modal.open({
      mode: "view",
      record,
    });
  };

  const cancel = () => {
    modal.close();
    form.reset();
  };

  return {
    openCreate,
    openUpdate,
    openView,
    cancel,
  };
}
