const GROUPED_ERRORS = {
  // 1. SYSTEM & GLOBAL ERRORS
  SYSTEM: {
    INTERNAL_SERVER_ERROR: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
      messageVi: "Đã xảy ra lỗi hệ thống",
    },
    RESOURCE_NOT_FOUND: {
      code: "RESOURCE_NOT_FOUND",
      message: "The requested resource could not be found",
      messageVi: "Không tìm thấy tài nguyên được yêu cầu",
    },
    NO_CHANGES: {
      code: "NO_CHANGES",
      message: "No changes were detected to update",
      messageVi: "Không phát hiện thay đổi nào để cập nhật",
    },
    NO_VALID_FIELDS: {
      code: "NO_VALID_FIELDS",
      message: "No valid fields were provided for processing",
      messageVi: "Không có trường dữ liệu hợp lệ để xử lý",
    },
    VALIDATION_FAILED: {
      code: "VALIDATION_FAILED",
      message: "The provided data is invalid",
      messageVi: "Dữ liệu cung cấp không hợp lệ",
    },
    MISSING_REQUIRED_FIELDS: {
      code: "MISSING_REQUIRED_FIELDS",
      message: "Missing required fields",
      messageVi: "Thiếu các trường dữ liệu bắt buộc",
    },
    INVALID_FIELDS: {
      code: "INVALID_FIELDS",
      message: "Invalid fields",
      messageVi: "Có trường dữ liệu không hợp lệ",
    },
    MANUAL_STATUS_CHANGE_FORBIDDEN: {
      code: "MANUAL_STATUS_CHANGE_FORBIDDEN",
      message: "This status cannot be updated manually",
      messageVi: "Không được phép cập nhật trạng thái này thủ công",
    },
    FILE_TOO_LARGE: {
      code: "FILE_TOO_LARGE",
      message: "Uploaded file exceeds the maximum allowed size limit",
      messageVi: "Tệp tải lên vượt quá dung lượng cho phép",
    },
    UNSUPPORTED_FILE_TYPE: {
      code: "UNSUPPORTED_FILE_TYPE",
      message: "The uploaded file format/extension is not supported",
      messageVi: "Định dạng tệp tải lên không được hỗ trợ",
    },
    FILE_MISSING: {
      code: "FILE_MISSING",
      message: "No file was uploaded or file is missing in request",
      messageVi: "Không tìm thấy tệp trong yêu cầu",
    },
    FILE_NOT_FOUND: {
      code: "FILE_NOT_FOUND",
      message: "The requested system file or path could not be found",
      messageVi: "Không tìm thấy tệp hoặc đường dẫn được yêu cầu",
    },
  },

  // 2. AUTHENTICATION & TOKEN ERRORS
  AUTH: {
    UNAUTHORIZED: {
      code: "UNAUTHORIZED",
      message: "Unauthorized access. Please log in.",
      messageVi: "Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục",
    },
    INVALID_CREDENTIALS: {
      code: "INVALID_CREDENTIALS",
      message: "Invalid username, email, or password",
      messageVi: "Tên đăng nhập, email hoặc mật khẩu không chính xác",
    },
    WRONG_PASSWORD: {
      code: "WRONG_PASSWORD",
      message: "Incorrect password",
      messageVi: "Mật khẩu không chính xác",
    },
    TOKEN_MISSING: {
      code: "TOKEN_MISSING",
      message: "Access token is required",
      messageVi: "Thiếu Access Token",
    },
    TOKEN_INVALID: {
      code: "TOKEN_INVALID",
      message: "Invalid token",
      messageVi: "Token không hợp lệ",
    },
    TOKEN_EXPIRED: {
      code: "TOKEN_EXPIRED",
      message: "Token has expired. Please log in again.",
      messageVi: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại",
    },
    INVALID_REFRESH_TOKEN: {
      code: "INVALID_REFRESH_TOKEN",
      message: "Invalid refresh token",
      messageVi: "Refresh Token không hợp lệ",
    },
    TOKEN_REVOKED: {
      code: "TOKEN_REVOKED",
      message: "This token is no longer valid (logged out or security reset)",
      messageVi: "Token không còn hiệu lực",
    },
    SESSION_EXPIRED: {
      code: "SESSION_EXPIRED",
      message: "User session has expired. Please re-authenticate.",
      messageVi: "Phiên đăng nhập đã hết hạn. Vui lòng xác thực lại",
    },
    ACCESS_DENIED: {
      code: "ACCESS_DENIED",
      message: "Access denied",
      messageVi: "Truy cập bị từ chối",
    },
  },

  // 3. AUTHORIZATION & PERMISSION ERRORS
  PERMISSIONS: {
    FORBIDDEN: {
      code: "FORBIDDEN",
      message: "You do not have permission to perform this action",
      messageVi: "Bạn không có quyền thực hiện thao tác này",
    },
  },

  // 4. ACCOUNT & ROLE ERRORS
  ACCOUNT: {
    INVALID_ROLE: {
      code: "INVALID_ROLE",
      message: "Invalid role label",
      messageVi: "Vai trò không hợp lệ",
    },
    ROLE_CODE_EXISTED: {
      code: "ROLE_CODE_EXISTED",
      message: "Role code already exists",
      messageVi: "Mã vai trò đã tồn tại",
    },
    ACCOUNT_NOT_FOUND: {
      code: "ACCOUNT_NOT_FOUND",
      message: "Account not found",
      messageVi: "Không tìm thấy tài khoản",
    },
    ACCOUNT_EXISTED: {
      code: "ACCOUNT_EXISTED",
      message: "Username or email already exists",
      messageVi: "Tên đăng nhập hoặc email đã tồn tại",
    },
    ACCOUNT_BANNED: {
      code: "ACCOUNT_BANNED",
      message: "This account has been banned",
      messageVi: "Tài khoản đã bị cấm",
    },
    ACCOUNT_DELETED: {
      code: "ACCOUNT_DELETED",
      message: "This account has been deleted",
      messageVi: "Tài khoản đã bị xóa",
    },
    ACCOUNT_LOCKED: {
      code: "ACCOUNT_LOCKED",
      message: "This account has been temporarily locked",
      messageVi: "Tài khoản đang bị khóa tạm thời",
    },
    ACCOUNT_DISABLED: {
      code: "ACCOUNT_DISABLED",
      message: "This account has been disabled",
      messageVi: "Tài khoản đã bị vô hiệu hóa",
    },
    ACCOUNT_PENDING: {
      code: "ACCOUNT_PENDING",
      message: "This account is pending approval and cannot log in yet",
      messageVi: "Tài khoản đang chờ phê duyệt",
    },
    INVALID_ACCOUNT_ID: {
      code: "INVALID_ACCOUNT_ID",
      message: "Account ID not found",
      messageVi: "Không tìm thấy ID tài khoản",
    },
    INVALID_ACCOUNT_STATUS: {
      code: "INVALID_ACCOUNT_STATUS",
      message: "Invalid account status",
      messageVi: "Trạng thái tài khoản không hợp lệ",
    },
    ROLE_NOT_FOUND: {
      code: "ROLE_NOT_FOUND",
      message: "The requested role configuration does not exist in the system",
      messageVi: "Không tìm thấy vai trò trong hệ thống",
    },
    ROLE_CODE_DUPLICATED: {
      code: "ROLE_CODE_DUPLICATED",
      message: "This role code already exists; please use a unique identifier",
      messageVi: "Mã vai trò đã tồn tại, vui lòng sử dụng mã khác",
    },
    ROLE_HAS_ASSIGNED_USERS: {
      code: "ROLE_HAS_ASSIGNED_USERS",
      message:
        "Cannot delete this role because it is currently assigned to one or more active accounts",
      messageVi:
        "Không thể xóa vai trò vì đang được gán cho một hoặc nhiều tài khoản",
    },
    ROLE_ALREADY_ASSIGNED: {
      code: "ROLE_ALREADY_ASSIGNED",
      message: "This account already holds the specified role",
      messageVi: "Tài khoản đã được gán vai trò này",
    },
    ROLE_ASSIGNMENT_FAILED: {
      code: "ROLE_ASSIGNMENT_FAILED",
      message:
        "Failed to assign or update the role for this account due to a system restriction",
      messageVi: "Không thể gán hoặc cập nhật vai trò cho tài khoản",
    },
    ROLE_UNASSIGNMENT_FAILED: {
      code: "ROLE_UNASSIGNMENT_FAILED",
      message:
        "Unable to revoke the role from this account; operation could not be completed",
      messageVi: "Không thể thu hồi vai trò khỏi tài khoản",
    },
  },

  // 5. STAFF & DEPARTMENT ERRORS
  STAFF: {
    STAFF_NOT_FOUND: {
      code: "STAFF_NOT_FOUND",
      message: "Staff profile not found",
      messageVi: "Không tìm thấy hồ sơ nhân viên",
    },
    STAFF_CODE_EXISTED: {
      code: "STAFF_CODE_EXISTED",
      message: "Staff code already exists",
      messageVi: "Mã nhân viên đã tồn tại",
    },
    STAFF_PHONE_EXISTED: {
      code: "STAFF_PHONE_EXISTED",
      message: "Phone number is already used by another staff member",
      messageVi: "Số điện thoại đã được nhân viên khác sử dụng",
    },
    STAFF_SUSPENDED: {
      code: "STAFF_SUSPENDED",
      message: "Staff member is currently suspended",
      messageVi: "Nhân viên hiện đang bị đình chỉ",
    },
    STAFF_ON_LEAVE: {
      code: "STAFF_ON_LEAVE",
      message: "Staff member is currently on leave",
      messageVi: "Nhân viên hiện đang nghỉ phép",
    },
    STAFF_TERMINATED: {
      code: "STAFF_TERMINATED",
      message: "Staff member has been terminated from employment",
      messageVi: "Nhân viên đã nghỉ việc",
    },
    INVALID_STAFF_GENDER: {
      code: "INVALID_STAFF_GENDER",
      message: "Staff gender must be MALE, FEMALE, or OTHER",
      messageVi: "Giới tính nhân viên phải là MALE, FEMALE hoặc OTHER",
    },
    INVALID_STAFF_CONTRACT: {
      code: "INVALID_STAFF_CONTRACT",
      message: "Contract type must be PROBATION, FULL_TIME, or PART_TIME",
      messageVi: "Loại hợp đồng phải là PROBATION, FULL_TIME hoặc PART_TIME",
    },
    INVALID_STAFF_STATUS: {
      code: "INVALID_STAFF_STATUS",
      message: "Invalid staff status",
      messageVi: "Trạng thái nhân viên không hợp lệ",
    },
    DEPARTMENT_NOT_FOUND: {
      code: "DEPARTMENT_NOT_FOUND",
      message: "Department not found",
      messageVi: "Không tìm thấy phòng ban",
    },
    DEPARTMENT_CODE_EXISTED: {
      code: "DEPARTMENT_CODE_EXISTED",
      message: "Department code already exists",
      messageVi: "Mã phòng ban đã tồn tại",
    },
    STAFF_ALREADY_IN_DEPARTMENT: {
      code: "STAFF_ALREADY_IN_DEPARTMENT",
      message: "Staff is already assigned to this department",
      messageVi: "Nhân viên đã thuộc phòng ban này",
    },
    INVALID_APPOINTMENT_TYPE: {
      code: "INVALID_APPOINTMENT_TYPE",
      message: "Appointment type must be PRIMARY or PART_TIME",
      messageVi: "Loại bổ nhiệm phải là PRIMARY hoặc PART_TIME",
    },
    STAFF_NOT_CAPABLE_FOR_COURSE: {
      code: "STAFF_NOT_CAPABLE_FOR_COURSE",
      message: "Staff does not have the capability to teach this course",
      messageVi: "Nhân viên không đủ năng lực để giảng dạy khóa học này",
    },
  },

  // 6. COURSE & DOCUMENT ERRORS
  COURSE: {
    COURSE_NOT_FOUND: {
      code: "COURSE_NOT_FOUND",
      message: "Course not found",
      messageVi: "Không tìm thấy khóa học",
    },
    COURSE_CODE_EXISTED: {
      code: "COURSE_CODE_EXISTED",
      message: "Course code already exists",
      messageVi: "Mã khóa học đã tồn tại",
    },
    COURSE_DELETED: {
      code: "COURSE_DELETED",
      message: "This course has been deleted",
      messageVi: "Khóa học đã bị xóa",
    },
    INVALID_COURSE_LEVEL: {
      code: "INVALID_COURSE_LEVEL",
      message: "Course level must be BEGINNER, INTERMEDIATE, or ADVANCED",
      messageVi: "Cấp độ khóa học phải là BEGINNER, INTERMEDIATE hoặc ADVANCED",
    },
    INVALID_COURSE_SESSIONS: {
      code: "INVALID_COURSE_SESSIONS",
      message: "Total sessions cannot be less than zero",
      messageVi: "Tổng số buổi học không được nhỏ hơn 0",
    },
    INVALID_COURSE_STATUS: {
      code: "INVALID_COURSE_STATUS",
      message: "Invalid course status value",
      messageVi: "Trạng thái khóa học không hợp lệ",
    },
    DOCUMENT_NOT_FOUND: {
      code: "DOCUMENT_NOT_FOUND",
      message: "Document not found",
      messageVi: "Không tìm thấy tài liệu",
    },
    DOCUMENT_CODE_EXISTED: {
      code: "DOCUMENT_CODE_EXISTED",
      message: "Document code already exists",
      messageVi: "Mã tài liệu đã tồn tại",
    },
    DOCUMENT_HIDDEN: {
      code: "DOCUMENT_HIDDEN",
      message: "This document is not visible to students",
      messageVi: "Tài liệu này đang bị ẩn đối với học viên",
    },
    INVALID_DOCUMENT_STATUS: {
      code: "INVALID_DOCUMENT_STATUS",
      message: "Document status must be AVAILABLE, ARCHIVED, or DELETED",
      messageVi: "Trạng thái tài liệu phải là AVAILABLE, ARCHIVED hoặc DELETED",
    },
    DOCUMENT_COURSE_MISMATCH: {
      code: "DOCUMENT_COURSE_MISMATCH",
      message: "The requested document does not belong to this course",
      messageVi: "Tài liệu không thuộc khóa học này",
    },
  },

  // 7. CLASS, ROOM & SCHEDULE ERRORS
  CLASS: {
    CLASS_NOT_FOUND: {
      code: "CLASS_NOT_FOUND",
      message: "Class not found",
      messageVi: "Không tìm thấy lớp học",
    },
    CLASS_CODE_EXISTED: {
      code: "CLASS_CODE_EXISTED",
      message: "Class code already exists",
      messageVi: "Mã lớp học đã tồn tại",
    },
    CLASS_FULL: {
      code: "CLASS_FULL",
      message: "The class has reached its maximum student capacity",
      messageVi: "Lớp học đã đủ số lượng học viên",
    },
    CLASS_CLOSED: {
      code: "CLASS_CLOSED",
      message: "This class is already closed",
      messageVi: "Lớp học đã đóng",
    },
    INVALID_CLASS_DATES: {
      code: "INVALID_CLASS_DATES",
      message: "End date must be greater than or equal to start date",
      messageVi: "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu",
    },
    INVALID_MAX_STUDENTS: {
      code: "INVALID_MAX_STUDENTS",
      message: "Maximum students limit cannot be negative",
      messageVi: "Số lượng học viên tối đa không được nhỏ hơn 0",
    },
    INVALID_CLASS_STATUS: {
      code: "INVALID_CLASS_STATUS",
      message: "Invalid class status value",
      messageVi: "Trạng thái lớp học không hợp lệ",
    },
    ROOM_NOT_FOUND: {
      code: "ROOM_NOT_FOUND",
      message: "Room not found",
      messageVi: "Không tìm thấy phòng học",
    },
    ROOM_CODE_EXISTED: {
      code: "ROOM_CODE_EXISTED",
      message: "Room code already exists",
      messageVi: "Mã phòng học đã tồn tại",
    },
    ROOM_NOT_AVAILABLE: {
      code: "ROOM_NOT_AVAILABLE",
      message: "The room is currently under maintenance or unavailable",
      messageVi: "Phòng học hiện không khả dụng hoặc đang bảo trì",
    },
    ROOM_OVER_CAPACITY: {
      code: "ROOM_OVER_CAPACITY",
      message: "The number of students exceeds the room capacity",
      messageVi: "Số lượng học viên vượt quá sức chứa của phòng",
    },
    INVALID_ROOM_STATUS: {
      code: "INVALID_ROOM_STATUS",
      message: "Room status must be AVAILABLE or MAINTENANCE",
      messageVi: "Trạng thái phòng học phải là AVAILABLE hoặc MAINTENANCE",
    },
    SCHEDULE_NOT_FOUND: {
      code: "SCHEDULE_NOT_FOUND",
      message: "Schedule session not found",
      messageVi: "Không tìm thấy buổi học trong lịch",
    },
    SCHEDULE_SESSION_EXISTED: {
      code: "SCHEDULE_SESSION_EXISTED",
      message: "This session number already exists for this class",
      messageVi: "Số buổi học này đã tồn tại trong lớp",
    },
    SCHEDULE_CONFLICT_ROOM: {
      code: "SCHEDULE_CONFLICT_ROOM",
      message: "Room schedule conflict detected at this time",
      messageVi: "Phòng học bị trùng lịch vào thời điểm này",
    },
    SCHEDULE_CONFLICT_INSTRUCTOR: {
      code: "SCHEDULE_CONFLICT_INSTRUCTOR",
      message: "Instructor schedule conflict detected at this time",
      messageVi: "Giảng viên bị trùng lịch vào thời điểm này",
    },
    INVALID_SCHEDULE_TIME: {
      code: "INVALID_SCHEDULE_TIME",
      message: "End time must be greater than or equal to start time",
      messageVi: "Thời gian kết thúc phải lớn hơn hoặc bằng thời gian bắt đầu",
    },
    INVALID_SCHEDULE_SESSION: {
      code: "INVALID_SCHEDULE_SESSION",
      message: "Session number cannot be negative",
      messageVi: "Số buổi học không được nhỏ hơn 0",
    },
    INVALID_SCHEDULE_STATUS: {
      code: "INVALID_SCHEDULE_STATUS",
      message:
        "Schedule status must be ONGOING, COMPLETED, CANCELLED, or DELETED",
      messageVi:
        "Trạng thái lịch học phải là ONGOING, COMPLETED, CANCELLED hoặc DELETED",
    },
    SCHEDULE_OVERLAPPING_TIME: {
      code: "SCHEDULE_OVERLAPPING_TIME",
      message:
        "The session time overlaps with an existing schedule in the system",
      messageVi: "Thời gian buổi học bị trùng với lịch hiện có trong hệ thống",
    },
    CLASS_NOT_STARTED: {
      code: "CLASS_NOT_STARTED",
      message: "Cannot perform action because this class has not started yet",
      messageVi: "Không thể thực hiện thao tác vì lớp học chưa bắt đầu",
    },
    CLASS_ALREADY_COMPLETED: {
      code: "CLASS_ALREADY_COMPLETED",
      message: "Cannot modify data because this class has already ended",
      messageVi: "Không thể chỉnh sửa vì lớp học đã kết thúc",
    },
  },

  // 8. REGISTRATION & STUDENT ERRORS
  STUDENT: {
    REGISTRATION_NOT_FOUND: {
      code: "REGISTRATION_NOT_FOUND",
      message: "Registration record not found",
      messageVi: "Không tìm thấy hồ sơ đăng ký",
    },
    REGISTRATION_CODE_EXISTED: {
      code: "REGISTRATION_CODE_EXISTED",
      message: "Registration code already exists",
      messageVi: "Mã đăng ký đã tồn tại",
    },
    REGISTRATION_PHONE_EXISTED: {
      code: "REGISTRATION_PHONE_EXISTED",
      message: "Phone number is already used in another registration",
      messageVi: "Số điện thoại đã được sử dụng trong hồ sơ đăng ký khác",
    },
    REGISTRATION_ALREADY_PROCESSED: {
      code: "REGISTRATION_ALREADY_PROCESSED",
      message: "This registration has already been linked to a student profile",
      messageVi: "Hồ sơ đăng ký này đã được liên kết với hồ sơ học viên",
    },
    INVALID_REGISTRATION_GENDER: {
      code: "INVALID_REGISTRATION_GENDER",
      message: "Registration gender must be MALE, FEMALE, or OTHER",
      messageVi: "Giới tính đăng ký phải là MALE, FEMALE hoặc OTHER",
    },
    INVALID_REGISTRATION_STATUS: {
      code: "INVALID_REGISTRATION_STATUS",
      message: "Registration status must be PENDING, REJECTED, or COMPLETED",
      messageVi: "Trạng thái đăng ký phải là PENDING, REJECTED hoặc COMPLETED",
    },
    STUDENT_NOT_FOUND: {
      code: "STUDENT_NOT_FOUND",
      message: "Student not found",
      messageVi: "Không tìm thấy học viên",
    },
    STUDENT_CODE_EXISTED: {
      code: "STUDENT_CODE_EXISTED",
      message: "Student code already exists",
      messageVi: "Mã học viên đã tồn tại",
    },
    STUDENT_EMAIL_EXISTED: {
      code: "STUDENT_EMAIL_EXISTED",
      message: "Personal email is already registered by another student",
      messageVi: "Email cá nhân đã được học viên khác sử dụng",
    },
    STUDENT_PHONE_EXISTED: {
      code: "STUDENT_PHONE_EXISTED",
      message: "Phone number is already used by another student",
      messageVi: "Số điện thoại đã được học viên khác sử dụng",
    },
    STUDENT_INCOMPLETE: {
      code: "STUDENT_INCOMPLETE",
      message: "Student profile is incomplete",
      messageVi: "Thông tin học viên chưa đầy đủ",
    },
    STUDENT_SUSPENDED: {
      code: "STUDENT_SUSPENDED",
      message: "Student is currently suspended",
      messageVi: "Học viên hiện đang bị đình chỉ",
    },
    STUDENT_ALREADY_GRADUATED: {
      code: "STUDENT_ALREADY_GRADUATED",
      message: "Action invalid: Student has already graduated",
      messageVi: "Không thể thực hiện vì học viên đã tốt nghiệp",
    },
    STUDENT_WITHDRAWN: {
      code: "STUDENT_WITHDRAWN",
      message: "Action invalid: Student has withdrawn from training",
      messageVi: "Không thể thực hiện vì học viên đã thôi học",
    },
    INVALID_STUDENT_GENDER: {
      code: "INVALID_STUDENT_GENDER",
      message: "Student gender must be MALE, FEMALE, or OTHER",
      messageVi: "Giới tính học viên phải là MALE, FEMALE hoặc OTHER",
    },
    INVALID_STUDENT_STATUS: {
      code: "INVALID_STUDENT_STATUS",
      message: "Invalid student status value",
      messageVi: "Trạng thái học viên không hợp lệ",
    },
  },

  // 9. ENROLLMENT & PAYMENT ERRORS
  FINANCE: {
    ENROLLMENT_NOT_FOUND: {
      code: "ENROLLMENT_NOT_FOUND",
      message: "Enrollment record not found",
      messageVi: "Không tìm thấy bản ghi ghi danh",
    },
    ENROLLMENT_CODE_EXISTED: {
      code: "ENROLLMENT_CODE_EXISTED",
      message: "Enrollment code already exists",
      messageVi: "Mã ghi danh đã tồn tại",
    },
    ALREADY_ENROLLED: {
      code: "ALREADY_ENROLLED",
      message: "Student is already enrolled in this class",
      messageVi: "Học viên đã ghi danh vào lớp học này",
    },
    ENROLLMENT_CANCELLED: {
      code: "ENROLLMENT_CANCELLED",
      message: "This enrollment has been cancelled",
      messageVi: "Ghi danh đã bị hủy",
    },
    ENROLLMENT_REFUNDED: {
      code: "ENROLLMENT_REFUNDED",
      message: "This enrollment has been refunded",
      messageVi: "Ghi danh đã được hoàn tiền",
    },
    INVALID_ENROLLMENT_STATUS: {
      code: "INVALID_ENROLLMENT_STATUS",
      message: "Invalid enrollment status value",
      messageVi: "Trạng thái ghi danh không hợp lệ",
    },
    PAYMENT_NOT_FOUND: {
      code: "PAYMENT_NOT_FOUND",
      message: "Payment record not found",
      messageVi: "Không tìm thấy bản ghi thanh toán",
    },
    PAYMENT_CODE_EXISTED: {
      code: "PAYMENT_CODE_EXISTED",
      message: "Payment code already exists",
      messageVi: "Mã thanh toán đã tồn tại",
    },
    PAYMENT_ALREADY_PAID: {
      code: "PAYMENT_ALREADY_PAID",
      message: "This invoice has already been fully paid",
      messageVi: "Hóa đơn này đã được thanh toán đầy đủ",
    },
    PAYMENT_TRANSACTION_EXISTED: {
      code: "PAYMENT_TRANSACTION_EXISTED",
      message: "Bank transaction code has already been processed",
      messageVi: "Mã giao dịch ngân hàng đã được xử lý",
    },
    INVALID_PAYMENT_AMOUNT: {
      code: "INVALID_PAYMENT_AMOUNT",
      message: "Payment amount must be greater than zero",
      messageVi: "Số tiền thanh toán phải lớn hơn 0",
    },
    INVALID_PAYMENT_STATUS: {
      code: "INVALID_PAYMENT_STATUS",
      message: "Payment status must be UNPAID, FULLY_PAID, FAILED, or REFUNDED",
      messageVi:
        "Trạng thái thanh toán phải là UNPAID, FULLY_PAID, FAILED hoặc REFUNDED",
    },
  },
  // 10. ATTENDANCE, GRADE & CERTIFICATE ERRORS
  ACADEMIC: {
    ATTENDANCE_NOT_FOUND: {
      code: "ATTENDANCE_NOT_FOUND",
      message: "Attendance record not found",
      messageVi: "Không tìm thấy bản ghi điểm danh",
    },
    ATTENDANCE_ALREADY_TAKEN: {
      code: "ATTENDANCE_ALREADY_TAKEN",
      message:
        "Attendance has already been recorded for this student in this session",
      messageVi: "Học viên đã được điểm danh cho buổi học này",
    },
    INVALID_ATTENDANCE_STATUS: {
      code: "INVALID_ATTENDANCE_STATUS",
      message: "Attendance status must be PRESENT, ABSENT, LATE, or EXCUSED",
      messageVi:
        "Trạng thái điểm danh phải là PRESENT, ABSENT, LATE hoặc EXCUSED",
    },
    GRADE_NOT_FOUND: {
      code: "GRADE_NOT_FOUND",
      message: "Grade record not found",
      messageVi: "Không tìm thấy bảng điểm",
    },
    GRADE_ALREADY_EXISTS: {
      code: "GRADE_ALREADY_EXISTS",
      message: "Grade record for this student in this class already exists",
      messageVi: "Điểm của học viên trong lớp học này đã tồn tại",
    },
    GRADE_LOCKED: {
      code: "GRADE_LOCKED",
      message: "This grade sheet has been locked and cannot be modified",
      messageVi: "Bảng điểm đã bị khóa và không thể chỉnh sửa",
    },
    INVALID_SCORE: {
      code: "INVALID_SCORE",
      message: "Score cannot be a negative value",
      messageVi: "Điểm không được nhỏ hơn 0",
    },
    INVALID_GRADE_STATUS: {
      code: "INVALID_GRADE_STATUS",
      message: "Grade status must be DRAFT, PUBLISHED, or LOCKED",
      messageVi: "Trạng thái điểm phải là DRAFT, PUBLISHED hoặc LOCKED",
    },
    CERTIFICATE_NOT_FOUND: {
      code: "CERTIFICATE_NOT_FOUND",
      message: "Certificate not found",
      messageVi: "Không tìm thấy chứng chỉ",
    },
    CERTIFICATE_CODE_EXISTED: {
      code: "CERTIFICATE_CODE_EXISTED",
      message: "Certificate code already exists",
      messageVi: "Mã chứng chỉ đã tồn tại",
    },
    CERTIFICATE_ALREADY_ISSUED: {
      code: "CERTIFICATE_ALREADY_ISSUED",
      message: "A certificate has already been issued for this enrollment",
      messageVi: "Chứng chỉ đã được cấp cho lần ghi danh này",
    },
    CERTIFICATE_NOT_ELIGIBLE: {
      code: "CERTIFICATE_NOT_ELIGIBLE",
      message:
        "Student is not eligible for a certificate (e.g., Course does not offer it or student failed)",
      messageVi: "Học viên không đủ điều kiện để được cấp chứng chỉ",
    },
    CERTIFICATE_REVOKED: {
      code: "CERTIFICATE_REVOKED",
      message: "This certificate has been revoked and is no longer valid",
      messageVi: "Chứng chỉ đã bị thu hồi và không còn hiệu lực",
    },
    INVALID_CERTIFICATE_STATUS: {
      code: "INVALID_CERTIFICATE_STATUS",
      message: "Certificate status must be ISSUED or REVOKED",
      messageVi: "Trạng thái chứng chỉ phải là ISSUED hoặc REVOKED",
    },
    SCORE_EXCEEDS_MAX_LIMIT: {
      code: "SCORE_EXCEEDS_MAX_LIMIT",
      message:
        "The provided score exceeds the maximum allowed limit (e.g., 10.0)",
      messageVi: "Điểm nhập vượt quá giới hạn cho phép",
    },
    ATTENDANCE_DATE_MISMATCH: {
      code: "ATTENDANCE_DATE_MISMATCH",
      message:
        "Cannot record attendance for a session schedule that is not happening today",
      messageVi: "Chỉ có thể điểm danh cho buổi học diễn ra trong ngày hôm nay",
    },
  },
  // 11. FORMAT & VALIDATION INPUT ERRORS
  VALIDATION: {
    INVALID_ID: {
      code: "INVALID_ID",
      message: "Invalid ID format",
      messageVi: "Định dạng ID không hợp lệ",
    },
    INVALID_USERNAME: {
      code: "INVALID_USERNAME",
      message: "Invalid username format",
      messageVi: "Định dạng tên đăng nhập không hợp lệ",
    },
    INVALID_EMAIL: {
      code: "INVALID_EMAIL",
      message: "Invalid email format",
      messageVi: "Định dạng email không hợp lệ",
    },
    INVALID_PHONE: {
      code: "INVALID_PHONE",
      message: "Invalid phone number format",
      messageVi: "Định dạng số điện thoại không hợp lệ",
    },
    INVALID_PASSWORD: {
      code: "INVALID_PASSWORD",
      message: "Invalid password format",
      messageVi: "Định dạng mật khẩu không hợp lệ",
    },
    INVALID_DATE: {
      code: "INVALID_DATE",
      message: "Invalid date format",
      messageVi: "Định dạng ngày tháng không hợp lệ",
    },
    INVALID_TIME: {
      code: "INVALID_TIME",
      message: "Invalid time format",
      messageVi: "Định dạng thời gian không hợp lệ",
    },
    PASSWORD_TOO_SHORT: {
      code: "PASSWORD_TOO_SHORT",
      message: "Password is too short",
      messageVi: "Mật khẩu quá ngắn",
    },
    PASSWORD_TOO_LONG: {
      code: "PASSWORD_TOO_LONG",
      message: "Password is too long",
      messageVi: "Mật khẩu quá dài",
    },
    INVALID_PAGE: {
      code: "INVALID_PAGE",
      message: "Invalid page number",
      messageVi: "Số trang không hợp lệ",
    },
    INVALID_LIMIT: {
      code: "INVALID_LIMIT",
      message: "Invalid limit number",
      messageVi: "Giới hạn số lượng bản ghi không hợp lệ",
    },
  },

  // 12. REGISTRATION & PRE-ENROLLMENT ERRORS
  REGISTRATION_FLOW: {
    REGISTRATION_NOT_FOUND: {
      code: "REGISTRATION_NOT_FOUND",
      message: "Registration record not found",
      messageVi: "Không tìm thấy hồ sơ đăng ký",
    },
    REGISTRATION_CODE_EXISTED: {
      code: "REGISTRATION_CODE_EXISTED",
      message: "Registration code already exists",
      messageVi: "Mã đăng ký đã tồn tại",
    },
    REGISTRATION_PHONE_EXISTED: {
      code: "REGISTRATION_PHONE_EXISTED",
      message: "This phone number is already used in an active registration",
      messageVi:
        "Số điện thoại đã được sử dụng trong một hồ sơ đăng ký đang hoạt động",
    },
    REGISTRATION_EMAIL_EXISTED: {
      code: "REGISTRATION_EMAIL_EXISTED",
      message: "This email is already used in another registration",
      messageVi: "Email đã được sử dụng trong một hồ sơ đăng ký khác",
    },
    REGISTRATION_ALREADY_PROCESSED: {
      code: "REGISTRATION_ALREADY_PROCESSED",
      message:
        "This registration has already been processed and linked to a student profile",
      messageVi: "Hồ sơ đăng ký đã được xử lý và liên kết với hồ sơ học viên",
    },
    REGISTRATION_ALREADY_REJECTED: {
      code: "REGISTRATION_ALREADY_REJECTED",
      message: "Action invalid: This registration has already been rejected",
      messageVi: "Không thể thực hiện vì hồ sơ đăng ký đã bị từ chối",
    },
    REGISTRATION_NOT_APPROVED: {
      code: "REGISTRATION_NOT_APPROVED",
      message:
        "Cannot convert to student profile because this registration is not approved yet",
      messageVi:
        "Không thể chuyển thành hồ sơ học viên vì đăng ký chưa được phê duyệt",
    },
    INVALID_REGISTRATION_GENDER: {
      code: "INVALID_REGISTRATION_GENDER",
      message: "Registration gender must be MALE, FEMALE, or OTHER",
      messageVi: "Giới tính đăng ký phải là MALE, FEMALE hoặc OTHER",
    },
    INVALID_REGISTRATION_STATUS: {
      code: "INVALID_REGISTRATION_STATUS",
      message: "Registration status must be PENDING, REJECTED, or COMPLETED",
      messageVi: "Trạng thái đăng ký phải là PENDING, REJECTED hoặc COMPLETED",
    },
    REGISTRATION_MISSING_COURSE: {
      code: "REGISTRATION_MISSING_COURSE",
      message: "Registration must be associated with a valid course ID",
      messageVi: "Hồ sơ đăng ký phải được gắn với một khóa học hợp lệ",
    },
    REGISTRATION_STUDENT_MISMATCH: {
      code: "REGISTRATION_STUDENT_MISMATCH",
      message:
        "The linked student ID does not match the information provided in this registration",
      messageVi:
        "Học viên được liên kết không khớp với thông tin trong hồ sơ đăng ký",
    },
    REGISTRATION_CLOSED: {
      code: "REGISTRATION_CLOSED",
      message: "The registration period for this course has closed",
      messageVi: "Thời gian đăng ký của khóa học đã kết thúc",
    },
  },
  PROFILE_FLOW: {
    PROFILE_INVALID_TYPE: {
      code: "PROFILE_INVALID_TYPE",
      message: "The provided profile type is invalid for this operation",
      messageVi: "Loại hồ sơ không hợp lệ cho thao tác này",
    },
    PROFILE_ALREADY_LINKED: {
      code: "PROFILE_ALREADY_LINKED",
      message: "This account is already linked to an existing profile",
      messageVi: "Tài khoản này đã được liên kết với một hồ sơ",
    },
    PROFILE_NOT_FOUND: {
      code: "PROFILE_NOT_FOUND",
      message: "The requested staff or student profile could not be found",
      messageVi: "Không tìm thấy hồ sơ nhân viên hoặc học viên",
    },
    PROFILE_CREATION_FAILED: {
      code: "PROFILE_CREATION_FAILED",
      message: "Failed to create the profile record in the system",
      messageVi: "Không thể tạo hồ sơ trong hệ thống",
    },
  },
};

const ERROR_CODES = {};
const ERROR_MESSAGES = {};
const ERROR_MESSAGES_VI = {};

for (const group in GROUPED_ERRORS) {
  for (const key in GROUPED_ERRORS[group]) {
    const errorObj = GROUPED_ERRORS[group][key];

    ERROR_CODES[errorObj.code] = errorObj.code;

    ERROR_MESSAGES[errorObj.code] = errorObj.message;
    
    ERROR_MESSAGES_VI[errorObj.code] = errorObj.messageVi;
  }
}

export { ERROR_CODES, ERROR_MESSAGES, GROUPED_ERRORS, ERROR_MESSAGES_VI };
