export function formatEnrollmentResponse(enrollment) {
  return {
    id: enrollment.enrollmentId,
    email: enrollment.email,
    role: enrollment.roleName,
  };
}
