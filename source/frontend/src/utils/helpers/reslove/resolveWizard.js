export function resolveWizard({ wizard, context }) {
  const steps = context.policy?.workflow?.steps ?? Object.keys(wizard.steps);

  return {
    steps: steps.map((key) => ({
      key,
      ...wizard.steps[key],
    })),
  };
}
