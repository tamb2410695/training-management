import { resolveForms } from "./resolveForms";
import { resolveQuery } from "./resolveQuery";
import { resolveWizard } from "./resolveWizard";

export function resolveFeature({ feature, context }) {
  const policy = feature.resolvePolicy(context);
  
  const form = resolveForms({ feature, policy });
  const wizard = resolveWizard({
    feature,
    policy,
    context,
  });
  const query = resolveQuery({ feature, policy });

  return {
    feature,
    form,
    query,
    wizard,
  };
}
