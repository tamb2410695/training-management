const GROUPED_SUCCESSES = {
  // 1. SYSTEM & GLOBAL SUCCESS
  SYSTEM: {
    FETCH_SUCCESS: {
      code: "SYSTEM_FETCH_SUCCESS",
      message: "Resource retrieved successfully",
    },
    CREATE_SUCCESS: {
      code: "SYSTEM_CREATE_SUCCESS",
      message: "Resource created successfully",
    },
    UPDATE_SUCCESS: {
      code: "SYSTEM_UPDATE_SUCCESS",
      message: "Resource updated successfully",
    },
    DELETE_SUCCESS: {
      code: "SYSTEM_DELETE_SUCCESS",
      message: "Resource deleted successfully",
    },
    OPERATION_SUCCESS: {
      code: "SYSTEM_OPERATION_SUCCESS",
      message: "Operation completed successfully",
    },
  },

  // 2. AUTHENTICATION & TOKEN SUCCESS
  AUTH: {
    LOGIN_SUCCESS: {
      code: "AUTH_LOGIN_SUCCESS",
      message: "Login successfully",
    },
    LOGOUT_SUCCESS: {
      code: "AUTH_LOGOUT_SUCCESS",
      message: "Logout successfully",
    },
    REGISTER_SUCCESS: {
      code: "AUTH_REGISTER_SUCCESS",
      message: "Account registered successfully",
    },
    TOKEN_REFRESHED: {
      code: "AUTH_TOKEN_REFRESHED",
      message: "Token refreshed successfully",
    },
    PASSWORD_CHANGED: {
      code: "AUTH_PASSWORD_CHANGED",
      message: "Password changed successfully",
    },
    PASSWORD_RESET_EMAIL_SENT: {
      code: "AUTH_PASSWORD_RESET_EMAIL_SENT",
      message: "Password reset instructions have been sent to your email",
    },
    PASSWORD_RESET_SUCCESS: {
      code: "AUTH_PASSWORD_RESET_SUCCESS",
      message: "Password has been reset successfully",
    },
  },

  // 3. ACCOUNT & ROLE SUCCESS
  ACCOUNT: {
    ACCOUNT_UPDATED: {
      code: "ACCOUNT_PROFILE_UPDATED",
      message: "Account profile updated successfully",
    },
    STATUS_UPDATED: {
      code: "ACCOUNT_STATUS_UPDATED",
      message: "Account status updated successfully",
    },
    ROLE_ASSIGNED: {
      code: "ACCOUNT_ROLE_ASSIGNED",
      message: "Role assigned to account successfully",
    },
    ROLE_REVOKED: {
      code: "ACCOUNT_ROLE_REVOKED",
      message: "Role removed from account successfully",
    },
    AVATAR_UPLOADED: {
      code: "ACCOUNT_AVATAR_UPLOADED",
      message: "Avatar updated successfully",
    },
  },

  // 4. STAFF & DEPARTMENT SUCCESS
  STAFF: {
    PROFILE_CREATED: {
      code: "STAFF_PROFILE_CREATED",
      message: "Staff profile created successfully",
    },
    PROFILE_UPDATED: {
      code: "STAFF_PROFILE_UPDATED",
      message: "Staff profile updated successfully",
    },
    STATUS_UPDATED: {
      code: "STAFF_STATUS_UPDATED",
      message: "Staff status updated successfully",
    },
    DEPARTMENT_ASSIGNED: {
      code: "STAFF_DEPARTMENT_ASSIGNED",
      message: "Staff assigned to department successfully",
    },
    DEPARTMENT_UPDATED: {
      code: "STAFF_DEPARTMENT_UPDATED",
      message: "Department assignment details updated successfully",
    },
    CAPABILITY_ADDED: {
      code: "STAFF_INSTRUCTOR_CAPABILITY_ADDED",
      message: "Instructor course capability added successfully",
    },
    CAPABILITY_REMOVED: {
      code: "STAFF_INSTRUCTOR_CAPABILITY_REMOVED",
      message: "Instructor course capability removed successfully",
    },
  },

  // 5. COURSE & DOCUMENT SUCCESS
  COURSE: {
    COURSE_CREATED: {
      code: "COURSE_CREATED",
      message: "Course created successfully",
    },
    COURSE_UPDATED: {
      code: "COURSE_DETAILS_UPDATED",
      message: "Course details updated successfully",
    },
    COURSE_DELETED: {
      code: "COURSE_DELETED",
      message: "Course deleted successfully",
    },
    DOCUMENT_UPLOADED: {
      code: "COURSE_DOCUMENT_UPLOADED",
      message: "Course document uploaded successfully",
    },
    DOCUMENT_UPDATED: {
      code: "COURSE_DOCUMENT_UPDATED",
      message: "Document details updated successfully",
    },
    DOCUMENT_DELETED: {
      code: "COURSE_DOCUMENT_REMOVED",
      message: "Document removed successfully",
    },
  },

  // 6. CLASS, ROOM & SCHEDULE SUCCESS
  CLASS: {
    CLASS_CREATED: {
      code: "CLASS_CREATED",
      message: "Class created successfully",
    },
    CLASS_UPDATED: {
      code: "CLASS_DETAILS_UPDATED",
      message: "Class details updated successfully",
    },
    CLASS_STATUS_CHANGED: {
      code: "CLASS_STATUS_CHANGED",
      message: "Class status changed successfully",
    },
    ROOM_CREATED: {
      code: "CLASS_ROOM_ADDED",
      message: "Room added successfully",
    },
    ROOM_UPDATED: {
      code: "CLASS_ROOM_DETAILS_UPDATED",
      message: "Room details updated successfully",
    },
    SCHEDULE_CREATED: {
      code: "CLASS_SESSION_SCHEDULED",
      message: "Class session scheduled successfully",
    },
    SCHEDULE_UPDATED: {
      code: "CLASS_SCHEDULE_SESSION_UPDATED",
      message: "Schedule session updated successfully",
    },
    SCHEDULE_DELETED: {
      code: "CLASS_SCHEDULE_SESSION_REMOVED",
      message: "Schedule session cancelled and removed successfully",
    },
  },

  // 7. REGISTRATION & STUDENT SUCCESS
  STUDENT: {
    REGISTRATION_SUBMITTED: {
      code: "STUDENT_REGISTRATION_SUBMITTED",
      message: "Online registration submitted successfully",
    },
    REGISTRATION_APPROVED: {
      code: "STUDENT_REGISTRATION_APPROVED",
      message: "Registration approved and student profile created",
    },
    REGISTRATION_REJECTED: {
      code: "STUDENT_REGISTRATION_REJECTED",
      message: "Registration rejected successfully",
    },
    PROFILE_UPDATED: {
      code: "STUDENT_PROFILE_UPDATED",
      message: "Student profile updated successfully",
    },
    STATUS_UPDATED: {
      code: "STUDENT_STATUS_UPDATED",
      message: "Student status updated successfully",
    },
  },

  // 8. ENROLLMENT & FINANCE SUCCESS
  FINANCE: {
    ENROLLMENT_SUCCESS: {
      code: "FINANCE_STUDENT_ENROLLED",
      message: "Student enrolled in class successfully",
    },
    ENROLLMENT_STATUS_UPDATED: {
      code: "FINANCE_ENROLLMENT_STATUS_UPDATED",
      message: "Enrollment status updated successfully",
    },
    PAYMENT_RECORDED: {
      code: "FINANCE_PAYMENT_RECORDED",
      message: "Payment transaction processed and recorded successfully",
    },
    PAYMENT_STATUS_UPDATED: {
      code: "FINANCE_PAYMENT_STATUS_UPDATED",
      message: "Payment status updated successfully",
    },
    REFUND_PROCESSED: {
      code: "FINANCE_REFUND_PROCESSED",
      message: "Refund processed successfully",
    },
  },

  // 9. ACADEMIC SUCCESS (ATTENDANCE, GRADE & CERTIFICATE)
  ACADEMIC: {
    ATTENDANCE_RECORDED: {
      code: "ACADEMIC_ATTENDANCE_RECORDED",
      message: "Attendance for the session recorded successfully",
    },
    ATTENDANCE_UPDATED: {
      code: "ACADEMIC_ATTENDANCE_UPDATED",
      message: "Attendance record updated successfully",
    },
    GRADE_SAVED: {
      code: "ACADEMIC_GRADE_DRAFT_SAVED",
      message: "Grades saved as draft successfully",
    },
    GRADE_PUBLISHED: {
      code: "ACADEMIC_GRADE_PUBLISHED",
      message: "Grades published to students successfully",
    },
    GRADE_UPDATED: {
      code: "ACADEMIC_STUDENT_SCORES_UPDATED",
      message: "Student scores updated successfully",
    },
    CERTIFICATE_ISSUED: {
      code: "ACADEMIC_CERTIFICATE_ISSUED",
      message: "Certificate generated and issued successfully",
    },
    CERTIFICATE_REVOKED: {
      code: "ACADEMIC_CERTIFICATE_REVOKED",
      message: "Certificate revoked successfully",
    },
  }
};

const SUCCESS_CODES = {};
const SUCCESS_MESSAGES = {};

for (const group in GROUPED_SUCCESSES) {
  for (const key in GROUPED_SUCCESSES[group]) {
    const successObj = GROUPED_SUCCESSES[group][key];

    SUCCESS_CODES[successObj.code] = successObj.code;

    SUCCESS_MESSAGES[successObj.code] = successObj.message;
  }
}

module.exports = {
  SUCCESS_CODES,
  SUCCESS_MESSAGES,
  GROUPED_SUCCESSES
};