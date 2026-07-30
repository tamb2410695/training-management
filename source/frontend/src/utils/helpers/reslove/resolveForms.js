import { buildForm } from "@/utils/builders";

export function resolveForms({ feature, policy }) {
  return {
    create: buildForm({
      fields: feature.fields,
      mode: "create",
      overrides: policy.form ?? {}
    }),

    update: buildForm({
      fields: feature.fields,
      mode: "update",
      overrides: policy.form ?? {}
    }),

    view: buildForm({
      fields: feature.fields,
      mode: "view",
      overrides: policy.form ?? {}
    }),
  };
}
