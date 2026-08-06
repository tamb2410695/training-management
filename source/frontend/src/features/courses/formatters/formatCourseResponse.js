export function formatCourseResponse(course) {
  return {
    id: course.courseId,
    email: course.email,
    role: course.roleName,
  };
}
