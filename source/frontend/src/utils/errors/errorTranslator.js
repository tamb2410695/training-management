import { ERROR_CODES } from "./errorCodes";

const VI_ERROR_DICTIONARY = {
  // 1. SYSTEM & GLOBAL ERRORS
  [ERROR_CODES.INTERNAL_SERVER_ERROR]:
    "Lỗi hệ thống nội bộ, vui lòng thử lại sau.",
  [ERROR_CODES.RESOURCE_NOT_FOUND]: "Không tìm thấy dữ liệu yêu cầu.",
  [ERROR_CODES.NO_CHANGES]: "Không phát hiện thay đổi nào để cập nhật.",
  [ERROR_CODES.NO_VALID_FIELDS]:
    "Không có dữ liệu hợp lệ được cung cấp để xử lý.",
  [ERROR_CODES.VALIDATION_FAILED]: "Dữ liệu cung cấp không hợp lệ.",
  [ERROR_CODES.MISSING_REQUIRED_FIELDS]:
    "Vui lòng điền đầy đủ các thông tin bắt buộc.",
  [ERROR_CODES.INVALID_FIELDS]: "Trường dữ liệu không hợp lệ.",
  [ERROR_CODES.MANUAL_STATUS_CHANGE_FORBIDDEN]:
    "Trạng thái này không thể cập nhật thủ công.",

  // 2. AUTHENTICATION & TOKEN ERRORS
  [ERROR_CODES.UNAUTHORIZED]: "Truy cập trái phép. Vui lòng đăng nhập lại.",
  [ERROR_CODES.INVALID_CREDENTIALS]:
    "Tên đăng nhập, email hoặc mật khẩu không chính xác.",
  [ERROR_CODES.WRONG_PASSWORD]: "Mật khẩu không chính xác.",
  [ERROR_CODES.TOKEN_MISSING]: "Yêu cầu mã xác thực (Access token).",
  [ERROR_CODES.TOKEN_INVALID]: "Mã xác thực không hợp lệ.",
  [ERROR_CODES.TOKEN_EXPIRED]:
    "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.",
  [ERROR_CODES.INVALID_REFRESH_TOKEN]:
    "Mã làm mới (Refresh token) không hợp lệ.",
  [ERROR_CODES.ACCESS_DENIED]: "Truy cập bị từ chối.",

  // 3. AUTHORIZATION & PERMISSION ERRORS
  [ERROR_CODES.FORBIDDEN]: "Bạn không có quyền thực hiện hành động này.",

  // 4. ACCOUNT & ROLE ERRORS
  [ERROR_CODES.ROLE_NOT_FOUND]: "Không tìm thấy vai trò (Role).",
  [ERROR_CODES.INVALID_ROLE]: "Tên vai trò không hợp lệ.",
  [ERROR_CODES.ROLE_CODE_EXISTED]: "Mã vai trò này đã tồn tại.",
  [ERROR_CODES.ACCOUNT_NOT_FOUND]: "Tài khoản không tồn tại trên hệ thống.",
  [ERROR_CODES.ACCOUNT_EXISTED]:
    "Tên đăng nhập hoặc địa chỉ email này đã được sử dụng.",
  [ERROR_CODES.ACCOUNT_BANNED]: "Tài khoản của bạn hiện đang bị khóa.",
  [ERROR_CODES.ACCOUNT_DELETED]: "Tài khoản này đã bị xóa.",
  [ERROR_CODES.ACCOUNT_LOCKED]: "Tài khoản này đã bị tạm khóa.",
  [ERROR_CODES.ACCOUNT_DISABLED]: "Tài khoản này đã bị vô hiệu hóa.",
  [ERROR_CODES.ACCOUNT_PENDING]:
    "Tài khoản đang chờ duyệt và chưa thể đăng nhập.",
  [ERROR_CODES.INVALID_ACCOUNT_ID]: "Mã tài khoản không tồn tại.",
  [ERROR_CODES.INVALID_ACCOUNT_STATUS]: "Trạng thái tài khoản không hợp lệ.",
  [ERROR_CODES.ROLE_ALREADY_ASSIGNED]:
    "Vai trò này đã được gán cho tài khoản trước đó.",

  // 5. STAFF & DEPARTMENT ERRORS
  [ERROR_CODES.STAFF_NOT_FOUND]: "Không tìm thấy hồ sơ nhân viên.",
  [ERROR_CODES.STAFF_CODE_EXISTED]: "Mã nhân viên đã tồn tại.",
  [ERROR_CODES.STAFF_PHONE_EXISTED]:
    "Số điện thoại đã được sử dụng bởi một nhân viên khác.",
  [ERROR_CODES.STAFF_SUSPENDED]: "Nhân viên hiện đang bị đình chỉ công tác.",
  [ERROR_CODES.STAFF_ON_LEAVE]: "Nhân viên hiện đang nghỉ phép.",
  [ERROR_CODES.STAFF_TERMINATED]: "Nhân viên đã thôi việc.",
  [ERROR_CODES.INVALID_STAFF_GENDER]:
    "Giới tính nhân viên phải là MALE, FEMALE hoặc OTHER.",
  [ERROR_CODES.INVALID_STAFF_CONTRACT]:
    "Loại hợp đồng phải là PROBATION, FULL_TIME hoặc PART_TIME.",
  [ERROR_CODES.INVALID_STAFF_STATUS]: "Trạng thái nhân viên không hợp lệ.",
  [ERROR_CODES.DEPARTMENT_NOT_FOUND]: "Không tìm thấy phòng ban.",
  [ERROR_CODES.DEPARTMENT_CODE_EXISTED]: "Mã phòng ban đã tồn tại.",
  [ERROR_CODES.STAFF_ALREADY_IN_DEPARTMENT]:
    "Nhân viên đã được xếp vào phòng ban này rồi.",
  [ERROR_CODES.INVALID_APPOINTMENT_TYPE]:
    "Loại bổ nhiệm phải là PRIMARY hoặc PART_TIME.",
  [ERROR_CODES.STAFF_NOT_CAPABLE_FOR_COURSE]:
    "Nhân viên chưa có đủ chứng chỉ hoặc năng lực để dạy khóa học này.",

  // 6. COURSE & DOCUMENT ERRORS
  [ERROR_CODES.COURSE_NOT_FOUND]: "Không tìm thấy khóa học.",
  [ERROR_CODES.COURSE_CODE_EXISTED]: "Mã khóa học đã tồn tại.",
  [ERROR_CODES.COURSE_DELETED]: "Khóa học này đã bị xóa.",
  [ERROR_CODES.INVALID_COURSE_LEVEL]:
    "Cấp độ khóa học phải là BEGINNER, INTERMEDIATE hoặc ADVANCED.",
  [ERROR_CODES.INVALID_COURSE_SESSIONS]:
    "Tổng số buổi học không được nhỏ hơn 0.",
  [ERROR_CODES.INVALID_COURSE_STATUS]: "Trạng thái khóa học không hợp lệ.",
  [ERROR_CODES.DOCUMENT_NOT_FOUND]: "Không tìm thấy tài liệu.",
  [ERROR_CODES.DOCUMENT_CODE_EXISTED]: "Mã tài liệu đã tồn tại.",
  [ERROR_CODES.DOCUMENT_HIDDEN]: "Tài liệu này hiện đang bị ẩn với học viên.",
  [ERROR_CODES.INVALID_DOCUMENT_STATUS]:
    "Trạng thái tài liệu phải là AVAILABLE, ARCHIVED hoặc DELETED.",

  // 7. CLASS, ROOM & SCHEDULE ERRORS
  [ERROR_CODES.CLASS_NOT_FOUND]: "Không tìm thấy lớp học.",
  [ERROR_CODES.CLASS_CODE_EXISTED]: "Mã lớp học đã tồn tại.",
  [ERROR_CODES.CLASS_FULL]: "Lớp học đã đạt số lượng học viên tối đa.",
  [ERROR_CODES.CLASS_CLOSED]: "Lớp học này đã đóng.",
  [ERROR_CODES.INVALID_CLASS_DATES]:
    "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu.",
  [ERROR_CODES.INVALID_MAX_STUDENTS]:
    "Giới hạn học viên tối đa không được là số âm.",
  [ERROR_CODES.INVALID_CLASS_STATUS]: "Trạng thái lớp học không hợp lệ.",
  [ERROR_CODES.ROOM_NOT_FOUND]: "Không tìm thấy phòng học.",
  [ERROR_CODES.ROOM_CODE_EXISTED]: "Mã phòng học đã tồn tại.",
  [ERROR_CODES.ROOM_NOT_AVAILABLE]:
    "Phòng học hiện đang bảo trì hoặc không sẵn sàng.",
  [ERROR_CODES.ROOM_OVER_CAPACITY]:
    "Số lượng học viên vượt quá sức chứa của phòng học.",
  [ERROR_CODES.INVALID_ROOM_STATUS]:
    "Trạng thái phòng phải là AVAILABLE hoặc MAINTENANCE.",
  [ERROR_CODES.SCHEDULE_NOT_FOUND]: "Không tìm thấy lịch học của buổi này.",
  [ERROR_CODES.SCHEDULE_SESSION_EXISTED]:
    "Số thứ tự buổi học này đã tồn tại trong lớp.",
  [ERROR_CODES.SCHEDULE_CONFLICT_ROOM]:
    "Trùng lịch phòng học tại thời điểm này.",
  [ERROR_CODES.SCHEDULE_CONFLICT_INSTRUCTOR]:
    "Trùng lịch giảng viên tại thời điểm này.",
  [ERROR_CODES.INVALID_SCHEDULE_TIME]: "Giờ kết thúc phải lớn hơn giờ bắt đầu.",
  [ERROR_CODES.INVALID_SCHEDULE_SESSION]:
    "Số thứ tự buổi học không được là số âm.",
  [ERROR_CODES.INVALID_SCHEDULE_STATUS]:
    "Trạng thái lịch học phải là ONGOING, COMPLETED, CANCELLED hoặc DELETED.",

  // 8. REGISTRATION & STUDENT ERRORS
  [ERROR_CODES.REGISTRATION_NOT_FOUND]: "Không tìm thấy đơn đăng ký.",
  [ERROR_CODES.REGISTRATION_CODE_EXISTED]: "Mã đơn đăng ký đã tồn tại.",
  [ERROR_CODES.REGISTRATION_PHONE_EXISTED]:
    "Số điện thoại đã được dùng trong một đơn đăng ký khác.",
  [ERROR_CODES.REGISTRATION_ALREADY_PROCESSED]:
    "Đơn đăng ký này đã được liên kết với một hồ sơ học viên.",
  [ERROR_CODES.INVALID_REGISTRATION_GENDER]:
    "Giới tính đơn đăng ký phải là MALE, FEMALE hoặc OTHER.",
  [ERROR_CODES.INVALID_REGISTRATION_STATUS]:
    "Trạng thái đơn đăng ký phải là PENDING, REJECTED hoặc COMPLETED.",
  [ERROR_CODES.STUDENT_NOT_FOUND]: "Không tìm thấy học viên.",
  [ERROR_CODES.STUDENT_CODE_EXISTED]: "Mã học viên đã tồn tại.",
  [ERROR_CODES.STUDENT_EMAIL_EXISTED]:
    "Email cá nhân đã được đăng ký bởi một học viên khác.",
  [ERROR_CODES.STUDENT_PHONE_EXISTED]:
    "Số điện thoại đã được sử dụng bởi một học viên khác.",
  [ERROR_CODES.STUDENT_INCOMPLETE]:
    "Hồ sơ học viên chưa hoàn thiện thông tin bắt buộc.",
  [ERROR_CODES.STUDENT_SUSPENDED]: "Học viên hiện đang bị đình chỉ học tập.",
  [ERROR_CODES.STUDENT_ALREADY_GRADUATED]:
    "Hành động không hợp lệ: Học viên đã tốt nghiệp.",
  [ERROR_CODES.STUDENT_WITHDRAWN]:
    "Hành động không hợp lệ: Học viên đã bảo lưu hoặc rút hồ sơ.",
  [ERROR_CODES.INVALID_STUDENT_GENDER]:
    "Giới tính học viên phải là MALE, FEMALE hoặc OTHER.",
  [ERROR_CODES.INVALID_STUDENT_STATUS]: "Trạng thái học viên không hợp lệ.",

  // 9. ENROLLMENT & PAYMENT ERRORS
  [ERROR_CODES.ENROLLMENT_NOT_FOUND]: "Không tìm thấy bản ghi nhập học.",
  [ERROR_CODES.ENROLLMENT_CODE_EXISTED]: "Mã nhập học đã tồn tại.",
  [ERROR_CODES.ALREADY_ENROLLED]: "Học viên đã đăng ký vào lớp học này rồi.",
  [ERROR_CODES.ENROLLMENT_CANCELLED]: "Hồ sơ nhập học này đã bị hủy.",
  [ERROR_CODES.ENROLLMENT_REFUNDED]: "Hồ sơ nhập học này đã được hoàn tiền.",
  [ERROR_CODES.INVALID_ENROLLMENT_STATUS]: "Trạng thái nhập học không hợp lệ.",
  [ERROR_CODES.PAYMENT_NOT_FOUND]: "Không tìm thấy hóa đơn thanh toán.",
  [ERROR_CODES.PAYMENT_CODE_EXISTED]: "Mã hóa đơn thanh toán đã tồn tại.",
  [ERROR_CODES.PAYMENT_ALREADY_PAID]: "Hóa đơn này đã được thanh toán đầy đủ.",
  [ERROR_CODES.PAYMENT_TRANSACTION_EXISTED]:
    "Mã giao dịch ngân hàng này đã được xử lý trước đó.",
  [ERROR_CODES.INVALID_PAYMENT_AMOUNT]: "Số tiền thanh toán phải lớn hơn 0.",
  [ERROR_CODES.INVALID_PAYMENT_STATUS]:
    "Trạng thái thanh toán phải là UNPAID, FULLY_PAID, FAILED hoặc REFUNDED.",

  // 10. ATTENDANCE, GRADE & CERTIFICATE ERRORS
  [ERROR_CODES.ATTENDANCE_NOT_FOUND]: "Không tìm thấy dữ liệu điểm danh.",
  [ERROR_CODES.ATTENDANCE_ALREADY_TAKEN]:
    "Học viên đã được điểm danh trong buổi học này rồi.",
  [ERROR_CODES.INVALID_ATTENDANCE_STATUS]:
    "Trạng thái điểm danh phải là PRESENT, ABSENT, LATE hoặc EXCUSED.",
  [ERROR_CODES.GRADE_NOT_FOUND]: "Không tìm thấy bảng điểm.",
  [ERROR_CODES.GRADE_ALREADY_EXISTS]:
    "Điểm số của học viên trong lớp này đã được nhập trước đó.",
  [ERROR_CODES.GRADE_LOCKED]:
    "Bảng điểm này đã bị khóa và không thể chỉnh sửa.",
  [ERROR_CODES.INVALID_SCORE]: "Điểm số không được là giá trị âm.",
  [ERROR_CODES.INVALID_GRADE_STATUS]:
    "Trạng thái bảng điểm phải là DRAFT, PUBLISHED hoặc LOCKED.",
  [ERROR_CODES.CERTIFICATE_NOT_FOUND]: "Không tìm thấy chứng chỉ.",
  [ERROR_CODES.CERTIFICATE_CODE_EXISTED]: "Mã chứng chỉ đã tồn tại.",
  [ERROR_CODES.CERTIFICATE_ALREADY_ISSUED]:
    "Chứng chỉ đã được cấp cho lượt nhập học này rồi.",
  [ERROR_CODES.CERTIFICATE_NOT_ELIGIBLE]:
    "Học viên không đủ điều kiện cấp chứng chỉ.",
  [ERROR_CODES.CERTIFICATE_REVOKED]:
    "Chứng chỉ này đã bị thu hồi và không còn giá trị.",
  [ERROR_CODES.INVALID_CERTIFICATE_STATUS]:
    "Trạng thái chứng chỉ phải là ISSUED hoặc REVOKED.",

  // 11. FORMAT & VALIDATION INPUT ERRORS
  [ERROR_CODES.INVALID_ID]: "Định dạng ID không hợp lệ.",
  [ERROR_CODES.INVALID_USERNAME]: "Định dạng tên đăng nhập không hợp lệ.",
  [ERROR_CODES.INVALID_EMAIL]: "Định dạng địa chỉ email không hợp lệ.",
  [ERROR_CODES.INVALID_PHONE]: "Định dạng số điện thoại không hợp lệ.",
  [ERROR_CODES.INVALID_PASSWORD]: "Định dạng mật khẩu không hợp lệ.",
  [ERROR_CODES.INVALID_DATE]: "Định dạng ngày không hợp lệ.",
  [ERROR_CODES.INVALID_TIME]: "Định dạng giờ không hợp lệ.",
  [ERROR_CODES.PASSWORD_TOO_SHORT]: "Mật khẩu quá ngắn.",
  [ERROR_CODES.PASSWORD_TOO_LONG]: "Mật khẩu quá dài.",
  [ERROR_CODES.INVALID_PAGE]: "Số trang không hợp lệ.",
  [ERROR_CODES.INVALID_LIMIT]: "Giới hạn số lượng hiển thị không hợp lệ.",
};

export const translateError = (errorCode, fallbackMessage) => {
  if (!errorCode)
    return fallbackMessage || "Đã xảy ra lỗi hệ thống không rõ nguyên nhân.";
  return (
    VI_ERROR_DICTIONARY[errorCode] ||
    fallbackMessage ||
    `Lỗi hệ thống (${errorCode})`
  );
};
