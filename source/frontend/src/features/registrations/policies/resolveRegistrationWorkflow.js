export const REGISTRATION_WORKFLOW = {
  STUDENT_CREATE: ["registration", "student"],

  STAFF_CREATE: ["registration", "role", "staff"],

  UPDATE: ["registration", "student"],
};

export function resolveRegistrationWorkflow({ registrationType = "STAFF", mode }) {
  if (mode !== "create") {
    return {
      steps: REGISTRATION_WORKFLOW.STUDENT_CREATE,
    };
  }

  switch (registrationType) {
    case "STUDENT":
      return {
        steps: REGISTRATION_WORKFLOW.STUDENT_CREATE,
      };

    case "STAFF":
      return {
        steps: REGISTRATION_WORKFLOW.STAFF_CREATE,
      };

    default:
      return {
        steps: ["registration"],
      };
  }
}
