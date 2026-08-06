export function formatCourseTableData(courses, pagination) {
  return courses.map((course, index) => ({
    ...course,
    __index: (pagination.page - 1) * pagination.limit + index + 1,
  }));
}
