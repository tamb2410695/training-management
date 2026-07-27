const GROUPED_SUCCESSES = {
  // 1. SYSTEM & GLOBAL SUCCESS
  SYSTEM: {
    FETCH_SUCCESS: {
      code: "SYSTEM_FETCH_SUCCESS",
      message: "Resource retrieved successfully",
      messageVi: "Lấy dữ liệu thành công",
    },
    CREATE_SUCCESS: {
      code: "SYSTEM_CREATE_SUCCESS",
      message: "Resource created successfully",
      messageVi: "Tạo mới thành công",
    },
    UPDATE_SUCCESS: {
      code: "SYSTEM_UPDATE_SUCCESS",
      message: "Resource updated successfully",
      messageVi: "Cập nhật thành công",
    },
    DELETE_SUCCESS: {
      code: "SYSTEM_DELETE_SUCCESS",
      message: "Resource deleted successfully",
      messageVi: "Xóa thành công",
    },
    OPERATION_SUCCESS: {
      code: "SYSTEM_OPERATION_SUCCESS",
      message: "Operation completed successfully",
      messageVi: "Thao tác thực hiện thành công",
    },
  },

  // 2. AUTHENTICATION & TOKEN SUCCESS
  AUTH: {
    LOGIN_SUCCESS: {
      code: "AUTH_LOGIN_SUCCESS",
      message: "Login successfully",
      messageVi: "Đăng nhập thành công",
    },
    LOGOUT_SUCCESS: {
      code: "AUTH_LOGOUT_SUCCESS",
      message: "Logout successfully",
      messageVi: "Đăng xuất thành công",
    },
    REGISTER_SUCCESS: {
      code: "AUTH_REGISTER_SUCCESS",
      message: "Account registered successfully",
      messageVi: "Đăng ký tài khoản thành công",
    },
    TOKEN_REFRESHED: {
      code: "AUTH_TOKEN_REFRESHED",
      message: "Token refreshed successfully",
      messageVi: "Làm mới phiên đăng nhập thành công",
    },
    PASSWORD_CHANGED: {
      code: "AUTH_PASSWORD_CHANGED",
      message: "Password changed successfully",
      messageVi: "Đổi mật khẩu thành công",
    },
    PASSWORD_RESET_EMAIL_SENT: {
      code: "AUTH_PASSWORD_RESET_EMAIL_SENT",
      message: "Password reset instructions have been sent to your email",
      messageVi: "Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn",
    },
    PASSWORD_RESET_SUCCESS: {
      code: "AUTH_PASSWORD_RESET_SUCCESS",
      message: "Password has been reset successfully",
      messageVi: "Đặt lại mật khẩu thành công",
    },
  },

  // 3. ACCOUNT & ROLE SUCCESS
  ACCOUNT: {
    ACCOUNT_UPDATED: {
      code: "ACCOUNT_PROFILE_UPDATED",
      message: "Account profile updated successfully",
      messageVi: "Cập nhật thông tin tài khoản thành công",
    },
    STATUS_UPDATED: {
      code: "ACCOUNT_STATUS_UPDATED",
      message: "Account status updated successfully",
      messageVi: "Cập nhật trạng thái tài khoản thành công",
    },
    ROLE_ASSIGNED: {
      code: "ACCOUNT_ROLE_ASSIGNED",
      message: "Role assigned to account successfully",
      messageVi: "Gán vai trò cho tài khoản thành công",
    },
    ROLE_REVOKED: {
      code: "ACCOUNT_ROLE_REVOKED",
      message: "Role removed from account successfully",
      messageVi: "Thu hồi vai trò khỏi tài khoản thành công",
    },
    AVATAR_UPLOADED: {
      code: "ACCOUNT_AVATAR_UPLOADED",
      message: "Avatar updated successfully",
      messageVi: "Cập nhật ảnh đại diện thành công",
    },
  },

  // 4. STAFF & DEPARTMENT SUCCESS
  STAFF: {
    PROFILE_CREATED: {
      code: "STAFF_PROFILE_CREATED",
      message: "Staff profile created successfully",
      messageVi: "Tạo hồ sơ nhân viên thành công",
    },
    PROFILE_UPDATED: {
      code: "STAFF_PROFILE_UPDATED",
      message: "Staff profile updated successfully",
      messageVi: "Cập nhật hồ sơ nhân viên thành công",
    },
    STATUS_UPDATED: {
      code: "STAFF_STATUS_UPDATED",
      message: "Staff status updated successfully",
      messageVi: "Cập nhật trạng thái nhân viên thành công",
    },
    DEPARTMENT_ASSIGNED: {
      code: "STAFF_DEPARTMENT_ASSIGNED",
      message: "Staff assigned to department successfully",
      messageVi: "Phân công nhân viên vào phòng ban thành công",
    },
    DEPARTMENT_UPDATED: {
      code: "STAFF_DEPARTMENT_UPDATED",
      message: "Department assignment details updated successfully",
      messageVi: "Cập nhật thông tin phân công phòng ban thành công",
    },
    CAPABILITY_ADDED: {
      code: "STAFF_INSTRUCTOR_CAPABILITY_ADDED",
      message: "Instructor course capability added successfully",
      messageVi: "Thêm năng lực giảng dạy cho giảng viên thành công",
    },
    CAPABILITY_REMOVED: {
      code: "STAFF_INSTRUCTOR_CAPABILITY_REMOVED",
      message: "Instructor course capability removed successfully",
      messageVi: "Xóa năng lực giảng dạy của giảng viên thành công",
    },
  },
  // 5. COURSE & DOCUMENT SUCCESS
  COURSE: {
    COURSE_CREATED: {
      code: "COURSE_CREATED",
      message: "Course created successfully",
      messageVi: "Tạo khóa học thành công",
    },
    COURSE_UPDATED: {
      code: "COURSE_DETAILS_UPDATED",
      message: "Course details updated successfully",
      messageVi: "Cập nhật thông tin khóa học thành công",
    },
    COURSE_DELETED: {
      code: "COURSE_DELETED",
      message: "Course deleted successfully",
      messageVi: "Xóa khóa học thành công",
    },
    DOCUMENT_UPLOADED: {
      code: "COURSE_DOCUMENT_UPLOADED",
      message: "Course document uploaded successfully",
      messageVi: "Tải lên tài liệu khóa học thành công",
    },
    DOCUMENT_UPDATED: {
      code: "COURSE_DOCUMENT_UPDATED",
      message: "Document details updated successfully",
      messageVi: "Cập nhật thông tin tài liệu thành công",
    },
    DOCUMENT_DELETED: {
      code: "COURSE_DOCUMENT_REMOVED",
      message: "Document removed successfully",
      messageVi: "Xóa tài liệu thành công",
    },
  },

  // 6. CLASS, ROOM & SCHEDULE SUCCESS
  CLASS: {
    CLASS_CREATED: {
      code: "CLASS_CREATED",
      message: "Class created successfully",
      messageVi: "Tạo lớp học thành công",
    },
    CLASS_UPDATED: {
      code: "CLASS_DETAILS_UPDATED",
      message: "Class details updated successfully",
      messageVi: "Cập nhật thông tin lớp học thành công",
    },
    CLASS_STATUS_CHANGED: {
      code: "CLASS_STATUS_CHANGED",
      message: "Class status changed successfully",
      messageVi: "Cập nhật trạng thái lớp học thành công",
    },
    ROOM_CREATED: {
      code: "CLASS_ROOM_ADDED",
      message: "Room added successfully",
      messageVi: "Thêm phòng học thành công",
    },
    ROOM_UPDATED: {
      code: "CLASS_ROOM_DETAILS_UPDATED",
      message: "Room details updated successfully",
      messageVi: "Cập nhật thông tin phòng học thành công",
    },
    SCHEDULE_CREATED: {
      code: "CLASS_SESSION_SCHEDULED",
      message: "Class session scheduled successfully",
      messageVi: "Tạo lịch học thành công",
    },
    SCHEDULE_UPDATED: {
      code: "CLASS_SCHEDULE_SESSION_UPDATED",
      message: "Schedule session updated successfully",
      messageVi: "Cập nhật buổi học thành công",
    },
    SCHEDULE_DELETED: {
      code: "CLASS_SCHEDULE_SESSION_REMOVED",
      message: "Schedule session cancelled and removed successfully",
      messageVi: "Hủy và xóa buổi học thành công",
    },
  },

  // 7. REGISTRATION & STUDENT SUCCESS
  STUDENT: {
    REGISTRATION_SUBMITTED: {
      code: "STUDENT_REGISTRATION_SUBMITTED",
      message: "Online registration submitted successfully",
      messageVi: "Gửi đăng ký trực tuyến thành công",
    },
    REGISTRATION_APPROVED: {
      code: "STUDENT_REGISTRATION_APPROVED",
      message: "Registration approved and student profile created",
      messageVi: "Phê duyệt đăng ký và tạo hồ sơ học viên thành công",
    },
    REGISTRATION_REJECTED: {
      code: "STUDENT_REGISTRATION_REJECTED",
      message: "Registration rejected successfully",
      messageVi: "Từ chối đăng ký thành công",
    },
    PROFILE_UPDATED: {
      code: "STUDENT_PROFILE_UPDATED",
      message: "Student profile updated successfully",
      messageVi: "Cập nhật hồ sơ học viên thành công",
    },
    STATUS_UPDATED: {
      code: "STUDENT_STATUS_UPDATED",
      message: "Student status updated successfully",
      messageVi: "Cập nhật trạng thái học viên thành công",
    },
  },

  // 8. ENROLLMENT & FINANCE SUCCESS
  FINANCE: {
    ENROLLMENT_SUCCESS: {
      code: "FINANCE_STUDENT_ENROLLED",
      message: "Student enrolled in class successfully",
      messageVi: "Ghi danh học viên vào lớp thành công",
    },
    ENROLLMENT_STATUS_UPDATED: {
      code: "FINANCE_ENROLLMENT_STATUS_UPDATED",
      message: "Enrollment status updated successfully",
      messageVi: "Cập nhật trạng thái ghi danh thành công",
    },
    PAYMENT_RECORDED: {
      code: "FINANCE_PAYMENT_RECORDED",
      message: "Payment transaction processed and recorded successfully",
      messageVi: "Ghi nhận giao dịch thanh toán thành công",
    },
    PAYMENT_STATUS_UPDATED: {
      code: "FINANCE_PAYMENT_STATUS_UPDATED",
      message: "Payment status updated successfully",
      messageVi: "Cập nhật trạng thái thanh toán thành công",
    },
    REFUND_PROCESSED: {
      code: "FINANCE_REFUND_PROCESSED",
      message: "Refund processed successfully",
      messageVi: "Hoàn tiền thành công",
    },
  },

  // 9. ACADEMIC SUCCESS (ATTENDANCE, GRADE & CERTIFICATE)
  ACADEMIC: {
    ATTENDANCE_RECORDED: {
      code: "ACADEMIC_ATTENDANCE_RECORDED",
      message: "Attendance for the session recorded successfully",
      messageVi: "Điểm danh buổi học thành công",
    },
    ATTENDANCE_UPDATED: {
      code: "ACADEMIC_ATTENDANCE_UPDATED",
      message: "Attendance record updated successfully",
      messageVi: "Cập nhật điểm danh thành công",
    },
    GRADE_SAVED: {
      code: "ACADEMIC_GRADE_DRAFT_SAVED",
      message: "Grades saved as draft successfully",
      messageVi: "Lưu bảng điểm nháp thành công",
    },
    GRADE_PUBLISHED: {
      code: "ACADEMIC_GRADE_PUBLISHED",
      message: "Grades published to students successfully",
      messageVi: "Công bố bảng điểm thành công",
    },
    GRADE_UPDATED: {
      code: "ACADEMIC_STUDENT_SCORES_UPDATED",
      message: "Student scores updated successfully",
      messageVi: "Cập nhật điểm học viên thành công",
    },
    CERTIFICATE_ISSUED: {
      code: "ACADEMIC_CERTIFICATE_ISSUED",
      message: "Certificate generated and issued successfully",
      messageVi: "Cấp chứng chỉ thành công",
    },
    CERTIFICATE_REVOKED: {
      code: "ACADEMIC_CERTIFICATE_REVOKED",
      message: "Certificate revoked successfully",
      messageVi: "Thu hồi chứng chỉ thành công",
    },
  },
};

const SUCCESS_CODES = {};
const SUCCESS_MESSAGES = {};
const SUCCESS_MESSAGES_VI = {};

for (const group in GROUPED_SUCCESSES) {
  for (const key in GROUPED_SUCCESSES[group]) {
    const successObj = GROUPED_SUCCESSES[group][key];

    SUCCESS_CODES[successObj.code] = successObj.code;

    SUCCESS_MESSAGES[successObj.code] = successObj.message;

    SUCCESS_MESSAGES_VI[successObj.code] = successObj.messageVi;
  }
}

export {
  SUCCESS_CODES,
  SUCCESS_MESSAGES,
  GROUPED_SUCCESSES,
  SUCCESS_MESSAGES_VI,
};
