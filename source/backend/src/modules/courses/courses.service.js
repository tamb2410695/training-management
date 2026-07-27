const db = require("../../config/database");
const AppError = require("../../utils/errors");
const {
  COURSE_LEVEL,
  COURSE_STATUS,
  ERROR_MESSAGES,
} = require("../../constants");

const { throwIf, hasField } = require("../../utils/helpers");
const coursesRepository = require("./courses.repository");

const getList = async (query, connection = db) => {
  const { data: courses, pagination } = await coursesRepository.find(
    query,
    connection,
  );

  return {
    courses,
    pagination,
  };
};

const getById = async (courseId, connection = db) => {
  const course = await coursesRepository.findById(courseId, connection);

  throwIf(!course, AppError.NotFoundError, "Course not found");
  return course;
};

const create = async (courseData, connection = db) => {
  const { courseCode, courseName, durationHours, totalSessions, tuitionFee } =
    courseData;
    
  if (courseCode) {
    const existedCourse = await coursesRepository.findByCode(
      courseCode,
      connection,
    );
    throwIf(
      existedCourse,
      AppError.ConflictError,
      "Course code already exists",
    );
  }

  throwIf(
    durationHours <= 0,
    AppError.BadRequestError,
    "Duration hours must be greater than 0",
  );
  throwIf(
    totalSessions < 0,
    AppError.BadRequestError,
    "Total sessions cannot be negative",
  );

  if (tuitionFee !== undefined && tuitionFee !== null) {
    throwIf(
      tuitionFee < 0,
      AppError.BadRequestError,
      "Tuition fee cannot be negative",
    );
  }

  const createdCourse = await coursesRepository.create(courseData, connection);
  throwIf(!createdCourse, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

  return createdCourse;
};

const getCourseOrThrow = async (courseId, connection = db) => {
  const course = await coursesRepository.findById(courseId, connection);
  throwIf(!course, AppError.NotFoundError, "Course not found");
  return course;
};

const resolveCourseCodeUpdate = async (
  course,
  courseData,
  updateCourseData,
  connection = db,
) => {
  if (!hasField(courseData, "courseCode")) return;

  const existed = await coursesRepository.findByCode(
    courseData.courseCode,
    connection,
  );
  throwIf(
    existed && existed.courseId !== course.courseId,
    AppError.ConflictError,
    "Course code already exists",
  );

  updateCourseData.courseCode = courseData.courseCode;
};

const resolveNumericFieldsUpdate = (courseData, updateCourseData) => {
  // Kiểm tra nghiệp vụ số giờ học
  if (hasField(courseData, "durationHours")) {
    throwIf(
      courseData.durationHours <= 0,
      AppError.BadRequestError,
      "Duration hours must be greater than 0",
    );
    updateCourseData.durationHours = courseData.durationHours;
  }

  // Kiểm tra nghiệp vụ tổng số buổi (CHECK total_sessions >= 0)
  if (hasField(courseData, "totalSessions")) {
    throwIf(
      courseData.totalSessions < 0,
      AppError.BadRequestError,
      "Total sessions cannot be negative",
    );
    updateCourseData.totalSessions = courseData.totalSessions;
  }

  // Kiểm tra nghiệp vụ học phí
  if (hasField(courseData, "tuitionFee") && courseData.tuitionFee !== null) {
    throwIf(
      courseData.tuitionFee < 0,
      AppError.BadRequestError,
      "Tuition fee cannot be negative",
    );
    updateCourseData.tuitionFee = courseData.tuitionFee;
  }
};

const resolveStatusUpdate = (course, courseData, updateCourseData) => {
  if (!hasField(courseData, "courseStatus")) return;

  // Ngăn chặn việc đẩy trạng thái DELETED thủ công thông qua API update thông thường
  throwIf(
    courseData.courseStatus === COURSE_STATUS.DELETED,
    AppError.BadRequestError,
    ERROR_MESSAGES.MANUAL_STATUS_CHANGE_FORBIDDEN,
  );

  updateCourseData.courseStatus = courseData.courseStatus;
};

const buildUpdateCourseData = async (course, courseData, connection = db) => {
  const updateCourseData = {};

  await resolveCourseCodeUpdate(
    course,
    courseData,
    updateCourseData,
    connection,
  );
  resolveNumericFieldsUpdate(courseData, updateCourseData);
  resolveStatusUpdate(course, courseData, updateCourseData);

  // Map các trường phổ thông khác nếu có trong request body công khai
  const generalFields = [
    "courseName",
    "courseDescription",
    "coverImage",
    "courseLevel",
    "certificateAvailable",
  ];
  generalFields.forEach((field) => {
    if (hasField(courseData, field)) {
      updateCourseData[field] = courseData[field];
    }
  });

  throwIf(
    Object.keys(updateCourseData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  return updateCourseData;
};

const update = async (courseId, courseData, connection = db) => {
  const course = await getCourseOrThrow(courseId, connection);

  const updateCourseData = await buildUpdateCourseData(
    course,
    courseData,
    connection,
  );

  const updatedCourse = await coursesRepository.update(
    courseId,
    updateCourseData,
    connection,
  );
  throwIf(!updatedCourse, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

  return updatedCourse;
};

const partialUpdate = async (courseId, courseData, connection = db) => {
  // Kế thừa hoàn toàn từ build logic của hàm update vì bản chất xử lý động
  return update(courseId, courseData, connection);
};

const updateStatus = async (courseId, newStatus, connection = db) => {
  const course = await coursesRepository.findById(courseId, connection);
  throwIf(!course, AppError.NotFoundError, "Course not found");

  throwIf(
    course.courseStatus === "DELETED",
    AppError.BadRequestError,
    "Cannot change status of a deleted course",
  );

  if (course.courseStatus === newStatus) {
    return course;
  }

  const updatedCourse = await coursesRepository.update(
    courseId,
    { courseStatus: newStatus },
    connection,
  );

  throwIf(!updatedCourse, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);
  return updatedCourse;
};

const remove = async (courseId, connection = db) => {
  const course = await coursesRepository.findById(courseId, connection);
  throwIf(!course, AppError.NotFoundError, "Course not found");

  throwIf(
    course.courseStatus === COURSE_STATUS.DELETED,
    AppError.NotFoundError,
    "Course has already been deleted",
  );

  const deletedCourse = await coursesRepository.remove(courseId, connection);
  return deletedCourse;
};

const getDocumentsByCourseId = async (courseId, connection = db) => {
  // Xác thực khóa học có tồn tại trước khi truy vấn tài liệu
  await getCourseOrThrow(courseId, connection);

  // Gọi sang repository của tài liệu hoặc truy vấn liên kết
  return await coursesRepository.findDocumentsByCourseId(courseId, connection);
};

module.exports = {
  getList,
  getById,
  create,
  update,
  partialUpdate,
  remove,
  updateStatus,
  getDocumentsByCourseId,
};
