export const SUCCESS_MESSAGES = {
  // 1. SYSTEM & GLOBAL SUCCESS
  SYSTEM: {
    FETCH_SUCCESS: "Resource retrieved successfully",
    CREATE_SUCCESS: "Resource created successfully",
    UPDATE_SUCCESS: "Resource updated successfully",
    DELETE_SUCCESS: "Resource deleted successfully",
    OPERATION_SUCCESS: "Operation completed successfully",
  },

  // 2. AUTHENTICATION & TOKEN SUCCESS
  AUTH: {
    LOGIN_SUCCESS: "Login successfully",
    LOGOUT_SUCCESS: "Logout successfully",
    REGISTER_SUCCESS: "Account registered successfully",
    TOKEN_REFRESHED: "Token refreshed successfully",
    PASSWORD_CHANGED: "Password changed successfully",
    PASSWORD_RESET_EMAIL_SENT: "Password reset instructions have been sent to your email",
    PASSWORD_RESET_SUCCESS: "Password has been reset successfully",
  },

  // 3. ACCOUNT & ROLE SUCCESS
  ACCOUNT: {
    ACCOUNT_UPDATED: "Account profile updated successfully",
    STATUS_UPDATED: "Account status updated successfully",
    ROLE_ASSIGNED: "Role assigned to account successfully",
    ROLE_REVOKED: "Role removed from account successfully",
    AVATAR_UPLOADED: "Avatar updated successfully",
  },

  // 4. STAFF & DEPARTMENT SUCCESS
  STAFF: {
    PROFILE_CREATED: "Staff profile created successfully",
    PROFILE_UPDATED: "Staff profile updated successfully",
    STATUS_UPDATED: "Staff status updated successfully",
    DEPARTMENT_ASSIGNED: "Staff assigned to department successfully",
    DEPARTMENT_UPDATED: "Department assignment details updated successfully",
    CAPABILITY_ADDED: "Instructor course capability added successfully",
    CAPABILITY_REMOVED: "Instructor course capability removed successfully",
  },

  // 5. COURSE & DOCUMENT SUCCESS
  COURSE: {
    COURSE_CREATED: "Course created successfully",
    COURSE_UPDATED: "Course details updated successfully",
    COURSE_DELETED: "Course deleted successfully",
    DOCUMENT_UPLOADED: "Course document uploaded successfully",
    DOCUMENT_UPDATED: "Document details updated successfully",
    DOCUMENT_DELETED: "Document removed successfully",
  },

  // 6. CLASS, ROOM & SCHEDULE SUCCESS
  CLASS: {
    CLASS_CREATED: "Class created successfully",
    CLASS_UPDATED: "Class details updated successfully",
    CLASS_STATUS_CHANGED: "Class status changed successfully",
    ROOM_CREATED: "Room added successfully",
    ROOM_UPDATED: "Room details updated successfully",
    SCHEDULE_CREATED: "Class session scheduled successfully",
    SCHEDULE_UPDATED: "Schedule session updated successfully",
    SCHEDULE_DELETED: "Schedule session cancelled and removed successfully",
  },

  // 7. REGISTRATION & STUDENT SUCCESS
  STUDENT: {
    REGISTRATION_SUBMITTED: "Online registration submitted successfully",
    REGISTRATION_APPROVED: "Registration approved and student profile created",
    REGISTRATION_REJECTED: "Registration rejected successfully",
    PROFILE_UPDATED: "Student profile updated successfully",
    STATUS_UPDATED: "Student status updated successfully",
  },

  // 8. ENROLLMENT & FINANCE SUCCESS
  FINANCE: {
    ENROLLMENT_SUCCESS: "Student enrolled in class successfully",
    ENROLLMENT_STATUS_UPDATED: "Enrollment status updated successfully",
    PAYMENT_RECORDED: "Payment transaction processed and recorded successfully",
    PAYMENT_STATUS_UPDATED: "Payment status updated successfully",
    REFUND_PROCESSED: "Refund processed successfully",
  },

  // 9. ACADEMIC SUCCESS (ATTENDANCE, GRADE & CERTIFICATE)
  ACADEMIC: {
    ATTENDANCE_RECORDED: "Attendance for the session recorded successfully",
    ATTENDANCE_UPDATED: "Attendance record updated successfully",
    GRADE_SAVED: "Grades saved as draft successfully",
    GRADE_PUBLISHED: "Grades published to students successfully",
    GRADE_UPDATED: "Student scores updated successfully",
    CERTIFICATE_ISSUED: "Certificate generated and issued successfully",
    CERTIFICATE_REVOKED: "Certificate revoked successfully",
  }
};
