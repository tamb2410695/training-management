export const ACCOUNT_WORKFLOW = {
  STUDENT_CREATE: ["account", "student"],

  STAFF_CREATE: ["account", "role", "staff"],

  UPDATE: ["account", "student"],
};

export function resolveAccountWorkflow({ accountType = "STAFF", mode }) {
  if (mode !== "create") {
    return {
      steps: ACCOUNT_WORKFLOW.STUDENT_CREATE,
    };
  }

  switch (accountType) {
    case "STUDENT":
      return {
        steps: ACCOUNT_WORKFLOW.STUDENT_CREATE,
      };

    case "STAFF":
      return {
        steps: ACCOUNT_WORKFLOW.STAFF_CREATE,
      };

    default:
      return {
        steps: ["account"],
      };
  }
}
