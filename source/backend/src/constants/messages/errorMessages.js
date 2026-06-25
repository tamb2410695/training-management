const ERROR_MESSAGES = {
  // 1. SYSTEM & GLOBAL ERRORS
  INTERNAL_SERVER_ERROR: "Internal server error",
  RESOURCE_NOT_FOUND: "The requested resource could not be found",
  NO_CHANGES: "No changes were detected to update",
  NO_VALID_FIELDS: "No valid fields were provided for processing",

  // 2. AUTHENTICATION & TOKEN ERRORS
  UNAUTHORIZED: "Unauthorized access. Please log in.",
  INVALID_CREDENTIALS: "Invalid username, email, or password",
  WRONG_PASSWORD: "Incorrect password",
  TOKEN_MISSING: "Access token is required",
  TOKEN_INVALID: "Invalid token",
  TOKEN_EXPIRED: "Token has expired. Please log in again.",

  // 3. AUTHORIZATION & PERMISSION ERRORS
  FORBIDDEN: "You do not have permission to perform this action",

  // 4. ACCOUNT & USER DOMAIN ERRORS
  ROLE_NOT_FOUND: "Role not found",
  ACCOUNT_NOT_FOUND: "Account not found",
  ACCOUNT_EXISTED: "Username or email already exists",
  ACCOUNT_BANNED: "This account has been banned",
  ACCOUNT_DELETED: "This account has been deleted",
  ACCOUNT_LOCKED: "This account has been temporarily locked",
  ACCOUNT_DISABLED: "This account has been disabled",
  INVALID_ACCOUNT_ID: "Account ID not found",
  INVALID_ACCOUNT_STATUS: "Invalid account status",
  INVALID_ROLE: "Invalid role name",

  // 5. STUDENT & INSTRUCTOR ERRORS
  STUDENT_NOT_FOUND: "Student not found",
  STUDENT_ALREADY_GRADUATED: "Action invalid: Student has already graduated",
  STUDENT_WITHDRAWN: "Action invalid: Student has withdrawn from training",
  INSTRUCTOR_NOT_FOUND: "Instructor not found",
  INSTRUCTOR_SUSPENDED: "Instructor is currently suspended",
  INSTRUCTOR_TERMINATED: "Instructor has been terminated from employment",

  // 6. COURSE & CLASS ERRORS
  COURSE_NOT_FOUND: "Course not found",
  COURSE_ALREADY_EXISTS: "Course name already exists",
  COURSE_DELETED: "This course has been deleted",

  CLASS_NOT_FOUND: "Class not found",
  CLASS_CODE_EXISTED: "Class code already exists",
  CLASS_FULL: "The class has reached its maximum student capacity",
  CLASS_CLOSED: "This class is already closed",
  INVALID_CLASS_DATES: "End date must be greater than or equal to start date",

  // 7. ENROLLMENT & PAYMENT ERRORS
  ENROLLMENT_NOT_FOUND: "Enrollment record not found",
  ALREADY_ENROLLED: "Student is already enrolled in this class",
  ENROLLMENT_CANCELLED: "This enrollment has been cancelled",

  PAYMENT_NOT_FOUND: "Payment record not found",
  PAYMENT_ALREADY_PAID: "This invoice has already been fully paid",
  INVALID_PAYMENT_AMOUNT: "Payment amount must be greater than zero",

  // 8. SCHEDULE, ROOM & ATTENDANCE ERRORS
  SCHEDULE_NOT_FOUND: "Schedule session not found",
  ROOM_NOT_FOUND: "Room not found",
  ROOM_NOT_AVAILABLE: "The room is currently under maintenance or unavailable",
  ROOM_OVER_CAPACITY: "The number of students exceeds the room capacity",
  SCHEDULE_CONFLICT_ROOM: "Room schedule conflict detected at this time",
  SCHEDULE_CONFLICT_INSTRUCTOR:
    "Instructor schedule conflict detected at this time",
  INVALID_SCHEDULE_TIME: "End time must be greater than start time",

  ATTENDANCE_ALREADY_TAKEN:
    "Attendance has already been recorded for this session",
  ATTENDANCE_NOT_FOUND: "Attendance record not found",

  // 9. GRADE, DOCUMENT & CERTIFICATE ERRORS
  GRADE_NOT_FOUND: "Grade record not found",
  INVALID_SCORE:
    "Score must be a decimal value between 0.00 and 100.00 (or 10.00 depending on your scale)",

  DOCUMENT_NOT_FOUND: "Document not found",
  DOCUMENT_HIDDEN: "This document is not visible to students",

  CERTIFICATE_NOT_FOUND: "Certificate not found",
  CERTIFICATE_CODE_EXISTED: "Certificate code already exists",
  CERTIFICATE_NOT_ELIGIBLE:
    "Student is not eligible for a certificate (e.g., Course does not offer it or student failed)",
  CERTIFICATE_REVOKED: "This certificate has been revoked",

  // 10. VALIDATION & REQUEST INPUT ERRORS
  VALIDATION_FAILED: "The provided data is invalid",
  MISSING_REQUIRED_FIELDS: "Missing required fields",
  INVALID_FIELDS: "Invalid fields",
  MANUAL_STATUS_CHANGE_FORBIDDEN: "This status cannot be updated manually",

  // Format & Type Validations
  INVALID_ID: "Invalid ID format",
  INVALID_USERNAME: "Invalid username format",
  INVALID_EMAIL: "Invalid email format",
  INVALID_PHONE: "Invalid phone number format",
  INVALID_PASSWORD: "Invalid password format",
  INVALID_DATE: "Invalid date format",

  // Password specific policies
  PASSWORD_TOO_SHORT: "Password is too short",
  PASSWORD_TOO_LONG: "Password is too long",

  // Pagination Validations
  INVALID_PAGE: "Invalid page number",
  INVALID_LIMIT: "Invalid limit number",
};

module.exports = {
  ERROR_MESSAGES,
};