export const STUDENT_WORKFLOW = {
  STUDENT_CREATE: ["account", "student"],

  STAFF_CREATE: ["account", "role", "staff"],

  UPDATE: ["account", "student"],
};

export function resolveStudentWorkflow({ accountType = "STAFF", mode }) {
  if (mode !== "create") {
    return {
      steps: STUDENT_WORKFLOW.STUDENT_CREATE,
    };
  }

  switch (accountType) {
    case "STUDENT":
      return {
        steps: STUDENT_WORKFLOW.STUDENT_CREATE,
      };

    case "STAFF":
      return {
        steps: STUDENT_WORKFLOW.STAFF_CREATE,
      };

    default:
      return {
        steps: ["account"],
      };
  }
}
