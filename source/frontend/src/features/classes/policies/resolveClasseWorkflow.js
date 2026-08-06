export const CLASS_WORKFLOW = {
  STUDENT_CREATE: ["classe", "student"],

  STAFF_CREATE: ["classe", "role", "staff"],

  UPDATE: ["classe", "student"],
};

export function resolveClasseWorkflow({ classeType = "STAFF", mode }) {
  if (mode !== "create") {
    return {
      steps: CLASS_WORKFLOW.STUDENT_CREATE,
    };
  }

  switch (classeType) {
    case "STUDENT":
      return {
        steps: CLASS_WORKFLOW.STUDENT_CREATE,
      };

    case "STAFF":
      return {
        steps: CLASS_WORKFLOW.STAFF_CREATE,
      };

    default:
      return {
        steps: ["classe"],
      };
  }
}
