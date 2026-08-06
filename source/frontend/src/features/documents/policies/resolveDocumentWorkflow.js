export const DOCUMENT_WORKFLOW = {
  STUDENT_CREATE: ["document", "student"],

  STAFF_CREATE: ["document", "role", "staff"],

  UPDATE: ["document", "student"],
};

export function resolveDocumentWorkflow({ documentType = "STAFF", mode }) {
  if (mode !== "create") {
    return {
      steps: DOCUMENT_WORKFLOW.STUDENT_CREATE,
    };
  }

  switch (documentType) {
    case "STUDENT":
      return {
        steps: DOCUMENT_WORKFLOW.STUDENT_CREATE,
      };

    case "STAFF":
      return {
        steps: DOCUMENT_WORKFLOW.STAFF_CREATE,
      };

    default:
      return {
        steps: ["document"],
      };
  }
}
