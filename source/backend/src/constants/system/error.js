const GROUPED_ERRORS = {
  // 1. SYSTEM & GLOBAL ERRORS
  SYSTEM: {
    INTERNAL_SERVER_ERROR: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    },
    RESOURCE_NOT_FOUND: {
      code: "RESOURCE_NOT_FOUND",
      message: "The requested resource could not be found",
    },
    NO_CHANGES: {
      code: "NO_CHANGES",
      message: "No changes were detected to update",
    },
    NO_VALID_FIELDS: {
      code: "NO_VALID_FIELDS",
      message: "No valid fields were provided for processing",
    },
    VALIDATION_FAILED: {
      code: "VALIDATION_FAILED",
      message: "The provided data is invalid",
    },
    MISSING_REQUIRED_FIELDS: {
      code: "MISSING_REQUIRED_FIELDS",
      message: "Missing required fields",
    },
    INVALID_FIELDS: { code: "INVALID_FIELDS", message: "Invalid fields" },
    MANUAL_STATUS_CHANGE_FORBIDDEN: {
      code: "MANUAL_STATUS_CHANGE_FORBIDDEN",
      message: "This status cannot be updated manually",
    },
    FILE_TOO_LARGE: {
      code: "FILE_TOO_LARGE",
      message: "Uploaded file exceeds the maximum allowed size limit",
    },
    UNSUPPORTED_FILE_TYPE: {
      code: "UNSUPPORTED_FILE_TYPE",
      message: "The uploaded file format/extension is not supported",
    },
    FILE_MISSING: {
      code: "FILE_MISSING",
      message: "No file was uploaded or file is missing in request",
    },
    FILE_NOT_FOUND: {
      code: "FILE_NOT_FOUND",
      message: "The requested system file or path could not be found",
    },
    SEEDER_FAILED: {
      code: "SEEDER_FAILED",
      message: "An error occurred while executing the database data seeder",
    },
    SEEDER_DUPLICATE_ENTRY: {
      code: "SEEDER_DUPLICATE_ENTRY",
      message: "Seeder terminated to prevent duplicating unique system data",
    },
    SEEDER_DEPENDENCY_MISSING: {
      code: "SEEDER_DEPENDENCY_MISSING",
      message:
        "Cannot seed data because parent relation tables or required master data are missing",
    },
    SCHEMA_INITIALIZATION_FAILED: {
      code: "SCHEMA_INITIALIZATION_FAILED",
      message: "Failed to initialize or structural setup database tables",
    },
    SCHEMA_RESET_FAILED: {
      code: "SCHEMA_RESET_FAILED",
      message:
        "Database environment reset failed: Unable to clean old data or re-establish schemas",
    },
    FOREIGN_KEY_VIOLATION: {
      code: "FOREIGN_KEY_VIOLATION",
      message:
        "Cannot delete or update because this resource is being linked to other data",
    },
  },

  // 2. AUTHENTICATION & TOKEN ERRORS
  AUTH: {
    UNAUTHORIZED: {
      code: "UNAUTHORIZED",
      message: "Unauthorized access. Please log in.",
    },
    INVALID_CREDENTIALS: {
      code: "INVALID_CREDENTIALS",
      message: "Invalid username, email, or password",
    },
    WRONG_PASSWORD: { code: "WRONG_PASSWORD", message: "Incorrect password" },
    TOKEN_MISSING: {
      code: "TOKEN_MISSING",
      message: "Access token is required",
    },
    TOKEN_INVALID: { code: "TOKEN_INVALID", message: "Invalid token" },
    TOKEN_EXPIRED: {
      code: "TOKEN_EXPIRED",
      message: "Token has expired. Please log in again.",
    },
    INVALID_REFRESH_TOKEN: {
      code: "INVALID_REFRESH_TOKEN",
      message: "Invalid refresh token",
    },
    TOKEN_REVOKED: {
      code: "TOKEN_REVOKED",
      message: "This token is no longer valid (logged out or security reset)",
    },
    SESSION_EXPIRED: {
      code: "SESSION_EXPIRED",
      message: "User session has expired. Please re-authenticate.",
    },
    ACCESS_DENIED: { code: "ACCESS_DENIED", message: "Access denied" },
  },

  // 3. AUTHORIZATION & PERMISSION ERRORS
  PERMISSIONS: {
    FORBIDDEN: {
      code: "FORBIDDEN",
      message: "You do not have permission to perform this action",
    },
  },

  // 4. ACCOUNT & ROLE ERRORS
  ACCOUNT: {
    INVALID_ROLE: { code: "INVALID_ROLE", message: "Invalid role label" },
    ROLE_CODE_EXISTED: {
      code: "ROLE_CODE_EXISTED",
      message: "Role code already exists",
    },
    ACCOUNT_NOT_FOUND: {
      code: "ACCOUNT_NOT_FOUND",
      message: "Account not found",
    },
    ACCOUNT_EXISTED: {
      code: "ACCOUNT_EXISTED",
      message: "Username or email already exists",
    },
    ACCOUNT_BANNED: {
      code: "ACCOUNT_BANNED",
      message: "This account has been banned",
    },
    ACCOUNT_DELETED: {
      code: "ACCOUNT_DELETED",
      message: "This account has been deleted",
    },
    ACCOUNT_LOCKED: {
      code: "ACCOUNT_LOCKED",
      message: "This account has been temporarily locked",
    },
    ACCOUNT_DISABLED: {
      code: "ACCOUNT_DISABLED",
      message: "This account has been disabled",
    },
    ACCOUNT_PENDING: {
      code: "ACCOUNT_PENDING",
      message: "This account is pending approval and cannot log in yet",
    },
    INVALID_ACCOUNT_ID: {
      code: "INVALID_ACCOUNT_ID",
      message: "Account ID not found",
    },
    INVALID_ACCOUNT_STATUS: {
      code: "INVALID_ACCOUNT_STATUS",
      message: "Invalid account status",
    },
    ROLE_NOT_FOUND: {
      code: "ROLE_NOT_FOUND",
      message: "The requested role configuration does not exist in the system",
    },

    ROLE_CODE_DUPLICATED: {
      code: "ROLE_CODE_DUPLICATED",
      message: "This role code already exists; please use a unique identifier",
    },

    ROLE_HAS_ASSIGNED_USERS: {
      code: "ROLE_HAS_ASSIGNED_USERS",
      message:
        "Cannot delete this role because it is currently assigned to one or more active accounts",
    },

    ROLE_ALREADY_ASSIGNED: {
      code: "ROLE_ALREADY_ASSIGNED",
      message: "This account already holds the specified role",
    },

    ROLE_ASSIGNMENT_FAILED: {
      code: "ROLE_ASSIGNMENT_FAILED",
      message:
        "Failed to assign or update the role for this account due to a system restriction",
    },

    ROLE_UNASSIGNMENT_FAILED: {
      code: "ROLE_UNASSIGNMENT_FAILED",
      message:
        "Unable to revoke the role from this account; operation could not be completed",
    },
  },

  // 5. STAFF & DEPARTMENT ERRORS
  STAFF: {
    STAFF_NOT_FOUND: {
      code: "STAFF_NOT_FOUND",
      message: "Staff profile not found",
    },
    STAFF_CODE_EXISTED: {
      code: "STAFF_CODE_EXISTED",
      message: "Staff code already exists",
    },
    STAFF_PHONE_EXISTED: {
      code: "STAFF_PHONE_EXISTED",
      message: "Phone number is already used by another staff member",
    },
    STAFF_SUSPENDED: {
      code: "STAFF_SUSPENDED",
      message: "Staff member is currently suspended",
    },
    STAFF_ON_LEAVE: {
      code: "STAFF_ON_LEAVE",
      message: "Staff member is currently on leave",
    },
    STAFF_TERMINATED: {
      code: "STAFF_TERMINATED",
      message: "Staff member has been terminated from employment",
    },
    INVALID_STAFF_GENDER: {
      code: "INVALID_STAFF_GENDER",
      message: "Staff gender must be MALE, FEMALE, or OTHER",
    },
    INVALID_STAFF_CONTRACT: {
      code: "INVALID_STAFF_CONTRACT",
      message: "Contract type must be PROBATION, FULL_TIME, or PART_TIME",
    },
    INVALID_STAFF_STATUS: {
      code: "INVALID_STAFF_STATUS",
      message: "Invalid staff status",
    },
    DEPARTMENT_NOT_FOUND: {
      code: "DEPARTMENT_NOT_FOUND",
      message: "Department not found",
    },
    DEPARTMENT_CODE_EXISTED: {
      code: "DEPARTMENT_CODE_EXISTED",
      message: "Department code already exists",
    },
    STAFF_ALREADY_IN_DEPARTMENT: {
      code: "STAFF_ALREADY_IN_DEPARTMENT",
      message: "Staff is already assigned to this department",
    },
    INVALID_APPOINTMENT_TYPE: {
      code: "INVALID_APPOINTMENT_TYPE",
      message: "Appointment type must be PRIMARY or PART_TIME",
    },
    STAFF_NOT_CAPABLE_FOR_COURSE: {
      code: "STAFF_NOT_CAPABLE_FOR_COURSE",
      message: "Staff does not have the capability to teach this course",
    },
  },

  // 6. COURSE & DOCUMENT ERRORS
  COURSE: {
    COURSE_NOT_FOUND: { code: "COURSE_NOT_FOUND", message: "Course not found" },
    COURSE_CODE_EXISTED: {
      code: "COURSE_CODE_EXISTED",
      message: "Course code already exists",
    },
    COURSE_DELETED: {
      code: "COURSE_DELETED",
      message: "This course has been deleted",
    },
    INVALID_COURSE_LEVEL: {
      code: "INVALID_COURSE_LEVEL",
      message: "Course level must be BEGINNER, INTERMEDIATE, or ADVANCED",
    },
    INVALID_COURSE_SESSIONS: {
      code: "INVALID_COURSE_SESSIONS",
      message: "Total sessions cannot be less than zero",
    },
    INVALID_COURSE_STATUS: {
      code: "INVALID_COURSE_STATUS",
      message: "Invalid course status value",
    },
    DOCUMENT_NOT_FOUND: {
      code: "DOCUMENT_NOT_FOUND",
      message: "Document not found",
    },
    DOCUMENT_CODE_EXISTED: {
      code: "DOCUMENT_CODE_EXISTED",
      message: "Document code already exists",
    },
    DOCUMENT_HIDDEN: {
      code: "DOCUMENT_HIDDEN",
      message: "This document is not visible to students",
    },
    INVALID_DOCUMENT_STATUS: {
      code: "INVALID_DOCUMENT_STATUS",
      message: "Document status must be AVAILABLE, ARCHIVED, or DELETED",
    },
    DOCUMENT_COURSE_MISMATCH: {
      code: "DOCUMENT_COURSE_MISMATCH",
      message: "The requested document does not belong to this course",
    },
  },

  // 7. CLASS, ROOM & SCHEDULE ERRORS
  CLASS: {
    CLASS_NOT_FOUND: { code: "CLASS_NOT_FOUND", message: "Class not found" },
    CLASS_CODE_EXISTED: {
      code: "CLASS_CODE_EXISTED",
      message: "Class code already exists",
    },
    CLASS_FULL: {
      code: "CLASS_FULL",
      message: "The class has reached its maximum student capacity",
    },
    CLASS_CLOSED: {
      code: "CLASS_CLOSED",
      message: "This class is already closed",
    },
    INVALID_CLASS_DATES: {
      code: "INVALID_CLASS_DATES",
      message: "End date must be greater than or equal to start date",
    },
    INVALID_MAX_STUDENTS: {
      code: "INVALID_MAX_STUDENTS",
      message: "Maximum students limit cannot be negative",
    },
    INVALID_CLASS_STATUS: {
      code: "INVALID_CLASS_STATUS",
      message: "Invalid class status value",
    },
    ROOM_NOT_FOUND: { code: "ROOM_NOT_FOUND", message: "Room not found" },
    ROOM_CODE_EXISTED: {
      code: "ROOM_CODE_EXISTED",
      message: "Room code already exists",
    },
    ROOM_NOT_AVAILABLE: {
      code: "ROOM_NOT_AVAILABLE",
      message: "The room is currently under maintenance or unavailable",
    },
    ROOM_OVER_CAPACITY: {
      code: "ROOM_OVER_CAPACITY",
      message: "The number of students exceeds the room capacity",
    },
    INVALID_ROOM_STATUS: {
      code: "INVALID_ROOM_STATUS",
      message: "Room status must be AVAILABLE or MAINTENANCE",
    },
    SCHEDULE_NOT_FOUND: {
      code: "SCHEDULE_NOT_FOUND",
      message: "Schedule session not found",
    },
    SCHEDULE_SESSION_EXISTED: {
      code: "SCHEDULE_SESSION_EXISTED",
      message: "This session number already exists for this class",
    },
    SCHEDULE_CONFLICT_ROOM: {
      code: "SCHEDULE_CONFLICT_ROOM",
      message: "Room schedule conflict detected at this time",
    },
    SCHEDULE_CONFLICT_INSTRUCTOR: {
      code: "SCHEDULE_CONFLICT_INSTRUCTOR",
      message: "Instructor schedule conflict detected at this time",
    },
    INVALID_SCHEDULE_TIME: {
      code: "INVALID_SCHEDULE_TIME",
      message: "End time must be greater than or equal to start time",
    },
    INVALID_SCHEDULE_SESSION: {
      code: "INVALID_SCHEDULE_SESSION",
      message: "Session number cannot be negative",
    },
    INVALID_SCHEDULE_STATUS: {
      code: "INVALID_SCHEDULE_STATUS",
      message:
        "Schedule status must be ONGOING, COMPLETED, CANCELLED, or DELETED",
    },
    SCHEDULE_OVERLAPPING_TIME: {
      code: "SCHEDULE_OVERLAPPING_TIME",
      message:
        "The session time overlaps with an existing schedule in the system",
    },
    CLASS_NOT_STARTED: {
      code: "CLASS_NOT_STARTED",
      message: "Cannot perform action because this class has not started yet",
    },
    CLASS_ALREADY_COMPLETED: {
      code: "CLASS_ALREADY_COMPLETED",
      message: "Cannot modify data because this class has already ended",
    },
  },

  // 8. REGISTRATION & STUDENT ERRORS
  STUDENT: {
    REGISTRATION_NOT_FOUND: {
      code: "REGISTRATION_NOT_FOUND",
      message: "Registration record not found",
    },
    REGISTRATION_CODE_EXISTED: {
      code: "REGISTRATION_CODE_EXISTED",
      message: "Registration code already exists",
    },
    REGISTRATION_PHONE_EXISTED: {
      code: "REGISTRATION_PHONE_EXISTED",
      message: "Phone number is already used in another registration",
    },
    REGISTRATION_ALREADY_PROCESSED: {
      code: "REGISTRATION_ALREADY_PROCESSED",
      message: "This registration has already been linked to a student profile",
    },
    INVALID_REGISTRATION_GENDER: {
      code: "INVALID_REGISTRATION_GENDER",
      message: "Registration gender must be MALE, FEMALE, or OTHER",
    },
    INVALID_REGISTRATION_STATUS: {
      code: "INVALID_REGISTRATION_STATUS",
      message: "Registration status must be PENDING, REJECTED, or COMPLETED",
    },
    STUDENT_NOT_FOUND: {
      code: "STUDENT_NOT_FOUND",
      message: "Student not found",
    },
    STUDENT_CODE_EXISTED: {
      code: "STUDENT_CODE_EXISTED",
      message: "Student code already exists",
    },
    STUDENT_EMAIL_EXISTED: {
      code: "STUDENT_EMAIL_EXISTED",
      message: "Personal email is already registered by another student",
    },
    STUDENT_PHONE_EXISTED: {
      code: "STUDENT_PHONE_EXISTED",
      message: "Phone number is already used by another student",
    },
    STUDENT_INCOMPLETE: {
      code: "STUDENT_INCOMPLETE",
      message: "Student profile is incomplete",
    },
    STUDENT_SUSPENDED: {
      code: "STUDENT_SUSPENDED",
      message: "Student is currently suspended",
    },
    STUDENT_ALREADY_GRADUATED: {
      code: "STUDENT_ALREADY_GRADUATED",
      message: "Action invalid: Student has already graduated",
    },
    STUDENT_WITHDRAWN: {
      code: "STUDENT_WITHDRAWN",
      message: "Action invalid: Student has withdrawn from training",
    },
    INVALID_STUDENT_GENDER: {
      code: "INVALID_STUDENT_GENDER",
      message: "Student gender must be MALE, FEMALE, or OTHER",
    },
    INVALID_STUDENT_STATUS: {
      code: "INVALID_STUDENT_STATUS",
      message: "Invalid student status value",
    },
  },

  // 9. ENROLLMENT & PAYMENT ERRORS
  FINANCE: {
    ENROLLMENT_NOT_FOUND: {
      code: "ENROLLMENT_NOT_FOUND",
      message: "Enrollment record not found",
    },
    ENROLLMENT_CODE_EXISTED: {
      code: "ENROLLMENT_CODE_EXISTED",
      message: "Enrollment code already exists",
    },
    ALREADY_ENROLLED: {
      code: "ALREADY_ENROLLED",
      message: "Student is already enrolled in this class",
    },
    ENROLLMENT_CANCELLED: {
      code: "ENROLLMENT_CANCELLED",
      message: "This enrollment has been cancelled",
    },
    ENROLLMENT_REFUNDED: {
      code: "ENROLLMENT_REFUNDED",
      message: "This enrollment has been refunded",
    },
    INVALID_ENROLLMENT_STATUS: {
      code: "INVALID_ENROLLMENT_STATUS",
      message: "Invalid enrollment status value",
    },
    PAYMENT_NOT_FOUND: {
      code: "PAYMENT_NOT_FOUND",
      message: "Payment record not found",
    },
    PAYMENT_CODE_EXISTED: {
      code: "PAYMENT_CODE_EXISTED",
      message: "Payment code already exists",
    },
    PAYMENT_ALREADY_PAID: {
      code: "PAYMENT_ALREADY_PAID",
      message: "This invoice has already been fully paid",
    },
    PAYMENT_TRANSACTION_EXISTED: {
      code: "PAYMENT_TRANSACTION_EXISTED",
      message: "Bank transaction code has already been processed",
    },
    INVALID_PAYMENT_AMOUNT: {
      code: "INVALID_PAYMENT_AMOUNT",
      message: "Payment amount must be greater than zero",
    },
    INVALID_PAYMENT_STATUS: {
      code: "INVALID_PAYMENT_STATUS",
      message: "Payment status must be UNPAID, FULLY_PAID, FAILED, or REFUNDED",
    },
  },

  // 10. ATTENDANCE, GRADE & CERTIFICATE ERRORS
  ACADEMIC: {
    ATTENDANCE_NOT_FOUND: {
      code: "ATTENDANCE_NOT_FOUND",
      message: "Attendance record not found",
    },
    ATTENDANCE_ALREADY_TAKEN: {
      code: "ATTENDANCE_ALREADY_TAKEN",
      message:
        "Attendance has already been recorded for this student in this session",
    },
    INVALID_ATTENDANCE_STATUS: {
      code: "INVALID_ATTENDANCE_STATUS",
      message: "Attendance status must be PRESENT, ABSENT, LATE, or EXCUSED",
    },
    GRADE_NOT_FOUND: {
      code: "GRADE_NOT_FOUND",
      message: "Grade record not found",
    },
    GRADE_ALREADY_EXISTS: {
      code: "GRADE_ALREADY_EXISTS",
      message: "Grade record for this student in this class already exists",
    },
    GRADE_LOCKED: {
      code: "GRADE_LOCKED",
      message: "This grade sheet has been locked and cannot be modified",
    },
    INVALID_SCORE: {
      code: "INVALID_SCORE",
      message: "Score cannot be a negative value",
    },
    INVALID_GRADE_STATUS: {
      code: "INVALID_GRADE_STATUS",
      message: "Grade status must be DRAFT, PUBLISHED, or LOCKED",
    },
    CERTIFICATE_NOT_FOUND: {
      code: "CERTIFICATE_NOT_FOUND",
      message: "Certificate not found",
    },
    CERTIFICATE_CODE_EXISTED: {
      code: "CERTIFICATE_CODE_EXISTED",
      message: "Certificate code already exists",
    },
    CERTIFICATE_ALREADY_ISSUED: {
      code: "CERTIFICATE_ALREADY_ISSUED",
      message: "A certificate has already been issued for this enrollment",
    },
    CERTIFICATE_NOT_ELIGIBLE: {
      code: "CERTIFICATE_NOT_ELIGIBLE",
      message:
        "Student is not eligible for a certificate (e.g., Course does not offer it or student failed)",
    },
    CERTIFICATE_REVOKED: {
      code: "CERTIFICATE_REVOKED",
      message: "This certificate has been revoked and is no longer valid",
    },
    INVALID_CERTIFICATE_STATUS: {
      code: "INVALID_CERTIFICATE_STATUS",
      message: "Certificate status must be ISSUED or REVOKED",
    },
    SCORE_EXCEEDS_MAX_LIMIT: {
      code: "SCORE_EXCEEDS_MAX_LIMIT",
      message:
        "The provided score exceeds the maximum allowed limit (e.g., 10.0)",
    },
    ATTENDANCE_DATE_MISMATCH: {
      code: "ATTENDANCE_DATE_MISMATCH",
      message:
        "Cannot record attendance for a session schedule that is not happening today",
    },
  },

  // 11. FORMAT & VALIDATION INPUT ERRORS
  VALIDATION: {
    INVALID_ID: { code: "INVALID_ID", message: "Invalid ID format" },
    INVALID_USERNAME: {
      code: "INVALID_USERNAME",
      message: "Invalid username format",
    },
    INVALID_EMAIL: { code: "INVALID_EMAIL", message: "Invalid email format" },
    INVALID_PHONE: {
      code: "INVALID_PHONE",
      message: "Invalid phone number format",
    },
    INVALID_PASSWORD: {
      code: "INVALID_PASSWORD",
      message: "Invalid password format",
    },
    INVALID_DATE: { code: "INVALID_DATE", message: "Invalid date format" },
    INVALID_TIME: { code: "INVALID_TIME", message: "Invalid time format" },
    PASSWORD_TOO_SHORT: {
      code: "PASSWORD_TOO_SHORT",
      message: "Password is too short",
    },
    PASSWORD_TOO_LONG: {
      code: "PASSWORD_TOO_LONG",
      message: "Password is too long",
    },
    INVALID_PAGE: { code: "INVALID_PAGE", message: "Invalid page number" },
    INVALID_LIMIT: { code: "INVALID_LIMIT", message: "Invalid limit number" },
  },

  // 12. REGISTRATION & PRE-ENROLLMENT ERRORS
  REGISTRATION_FLOW: {
    REGISTRATION_NOT_FOUND: {
      code: "REGISTRATION_NOT_FOUND",
      message: "Registration record not found",
    },
    REGISTRATION_CODE_EXISTED: {
      code: "REGISTRATION_CODE_EXISTED",
      message: "Registration code already exists",
    },
    REGISTRATION_PHONE_EXISTED: {
      code: "REGISTRATION_PHONE_EXISTED",
      message: "This phone number is already used in an active registration",
    },
    REGISTRATION_EMAIL_EXISTED: {
      code: "REGISTRATION_EMAIL_EXISTED",
      message: "This email is already used in another registration",
    },
    REGISTRATION_ALREADY_PROCESSED: {
      code: "REGISTRATION_ALREADY_PROCESSED",
      message:
        "This registration has already been processed and linked to a student profile",
    },
    REGISTRATION_ALREADY_REJECTED: {
      code: "REGISTRATION_ALREADY_REJECTED",
      message: "Action invalid: This registration has already been rejected",
    },
    REGISTRATION_NOT_APPROVED: {
      code: "REGISTRATION_NOT_APPROVED",
      message:
        "Cannot convert to student profile because this registration is not approved yet",
    },
    INVALID_REGISTRATION_GENDER: {
      code: "INVALID_REGISTRATION_GENDER",
      message: "Registration gender must be MALE, FEMALE, or OTHER",
    },
    INVALID_REGISTRATION_STATUS: {
      code: "INVALID_REGISTRATION_STATUS",
      message: "Registration status must be PENDING, REJECTED, or COMPLETED",
    },
    REGISTRATION_MISSING_COURSE: {
      code: "REGISTRATION_MISSING_COURSE",
      message: "Registration must be associated with a valid course ID",
    },
    REGISTRATION_STUDENT_MISMATCH: {
      code: "REGISTRATION_STUDENT_MISMATCH",
      message:
        "The linked student ID does not match the information provided in this registration",
    },
    REGISTRATION_CLOSED: {
      code: "REGISTRATION_CLOSED",
      message: "The registration period for this course has closed",
    },
  },
  PROFILE_FLOW: {
    PROFILE_INVALID_TYPE: {
      code: "PROFILE_INVALID_TYPE",
      message: "The provided profile type is invalid for this operation",
    },
    PROFILE_ALREADY_LINKED: {
      code: "PROFILE_ALREADY_LINKED",
      message: "This account is already linked to an existing profile",
    },
    PROFILE_NOT_FOUND: {
      code: "PROFILE_NOT_FOUND",
      message: "The requested staff or student profile could not be found",
    },
    PROFILE_CREATION_FAILED: {
      code: "PROFILE_CREATION_FAILED",
      message: "Failed to create the profile record in the system",
    },
  },
};

const ERROR_CODES = {};
const ERROR_MESSAGES = {};

for (const group in GROUPED_ERRORS) {
  for (const key in GROUPED_ERRORS[group]) {
    const errorObj = GROUPED_ERRORS[group][key];

    ERROR_CODES[errorObj.code] = errorObj.code;

    ERROR_MESSAGES[errorObj.code] = errorObj.message;
  }
}

module.exports = {
  ERROR_CODES,
  ERROR_MESSAGES,
  GROUPED_ERRORS,
};
