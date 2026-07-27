import { buildForm } from "@/utils/builders";

export function resolveForms({ fields, context }) {
  return {
    create: buildForm({
      fields,
      mode: "create",
      overrides: context
    }),

    update: buildForm({
      fields,
      mode: "update",
      overrides: context
    }),

    view: buildForm({
      fields,
      mode: "view",
      overrides: context
    }),
  };
}
