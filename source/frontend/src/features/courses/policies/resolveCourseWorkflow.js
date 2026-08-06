export const COURSE_WORKFLOW = {
  STUDENT_CREATE: ["course", "student"],

  STAFF_CREATE: ["course", "role", "staff"],

  UPDATE: ["course", "student"],
};

export function resolveCourseWorkflow({ courseType = "STAFF", mode }) {
  if (mode !== "create") {
    return {
      steps: COURSE_WORKFLOW.STUDENT_CREATE,
    };
  }

  switch (courseType) {
    case "STUDENT":
      return {
        steps: COURSE_WORKFLOW.STUDENT_CREATE,
      };

    case "STAFF":
      return {
        steps: COURSE_WORKFLOW.STAFF_CREATE,
      };

    default:
      return {
        steps: ["course"],
      };
  }
}
