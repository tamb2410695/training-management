export function resolveAccountWorkflow({ accountType, mode }) {
  if (mode !== "create") {
    return {
      steps: ["account", "student"],
    };
  }

  switch (accountType) {
    case "STUDENT":
      return {
        steps: ["account", "student"],
      };

    case "STAFF":
      return {
        steps: ["account", "permission", "staff"],
      };

    default:
      return {
        steps: ["account"],
      };
  }
}
