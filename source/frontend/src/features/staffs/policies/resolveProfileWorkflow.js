export const STAFF_WORKFLOW = {
  STAFF_CREATE: ["account", "role", "staff"],

  UPDATE: ["account", "student"],
};

export function resolveStudentWorkflow({ accountType = "STAFF", mode }) {
  if (mode !== "create") {
    return {
      steps: STAFF_WORKFLOW.STAFF_CREATE,
    };
  }

  switch (accountType) {
    case "STAFF":
      return {
        steps: STAFF_WORKFLOW.STAFF_CREATE,
      };

    default:
      return {
        steps: ["account"],
      };
  }
}
