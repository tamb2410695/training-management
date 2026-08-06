import { resolveForms } from "./resolveForms";
import { resolveQuery } from "./resolveQuery";
import { resolveWizard } from "./resolveWizard";

export function resolveFeature({ feature, context }) {
  const policy = feature.resolvePolicy(context);

  const result = {
    feature,
    form: resolveForms({
      feature,
      policy,
    }),
    query: resolveQuery({
      feature,
      policy,
    }),
  };

  if (feature.wizard) {
    result.wizard = resolveWizard({
      feature,
      policy,
      context,
    });
  }

  return result;
}