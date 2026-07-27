import { resolveFields } from "./resolveFields";
import { resolveForms } from "./resolveForms";
import { resolveWizard } from "./resolveWizard";

export function resolveFeature({ feature, context }) {
  const fields = resolveFields({
    fields: feature.fields,
    context,
  });

  return {
    ...feature,

    fields,

    forms: resolveForms({
      fields,
      context: context.policies.overides,
    }),

    validation: resolveValidation({
      fields,
      context,
    }),

    table: resolveTable({
      table: feature.table,
      fields,
      policies,
      context,
    }),

    query: resolveQuery({
      query: feature.query,
      policies,
      context,
    }),

    wizard: resolveWizard({
      wizard: feature.wizard,
      policies,
      context,
    }),

    actions: resolveActions({
      policies,
      context,
    }),
  };
}
