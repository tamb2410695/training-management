import { buildWizard } from "@/utils/builders";

export function resolveWizard({ feature, policy, context }) {
  const order = policy?.wizard?.steps ?? Object.keys(feature.wizard.steps);

  const steps = order
    .map((key) => ({
      key,
      ...feature.wizard.steps[key],
    }))
    .filter(Boolean);

  return buildWizard({
    fields: feature.fields,
    config: {
      mode: policy?.wizard?.mode ?? feature.wizard.mode,
      steps,
    },
    overrides: policy,
  });
}
