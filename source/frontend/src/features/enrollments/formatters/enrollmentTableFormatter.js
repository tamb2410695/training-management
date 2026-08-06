export function formatEnrollmentTableData(enrollments, pagination) {
  return enrollments.map((enrollment, index) => ({
    ...enrollment,
    __index: (pagination.page - 1) * pagination.limit + index + 1,
  }));
}
