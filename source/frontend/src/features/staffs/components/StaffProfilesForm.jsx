import DynamicForm from "@/components/form/DynamicForm";
import WizardForm from "@/components/form/WizardForm";
import DynamicView from "@/components/view/DynamicView";

export function StaffProfilesForm({ modal, formSchema, form, onSubmit, loading }) {

  if (modal.mode === "view") {
    return <DynamicView schema={formSchema.formSchema} record={modal.record} />;
  }

  if (formSchema.isWizard) {
    return (
      <WizardForm
        schema={formSchema.wizardSchema}
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
      schema={formSchema.formSchema}
      values={form.values}
      errors={form.errors}
      onChange={form.setValue}
    />
  );
}
