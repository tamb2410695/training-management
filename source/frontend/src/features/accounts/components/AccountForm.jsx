import DynamicForm from "@/components/form/DynamicForm";
import WizardForm from "@/components/form/WizardForm";
import DynamicView from "@/components/view/DynamicView";

export function AccountForm({
  modal,
  formSchema,
  viewSchema,
  wizardSchema,
  form,
  onSubmit,
  runtime,
  loading,
}) {

  console.log()
  if (modal.mode === "view") {
    return <DynamicView schema={viewSchema} record={modal.record} />;
  }

  if (wizardSchema) {
    return (
      <WizardForm
        schema={wizardSchema}
        values={form.values}
        errors={form.errors}
        onChange={form.setValue}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <DynamicForm
      schema={runtime.fields}
      values={form.values}
      errors={form.errors}
      onChange={form.setValue}
    />
  );
}
