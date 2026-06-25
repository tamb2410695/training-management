const AppError = require("../../utils/errors");
const {
  COURSE_STATUS,
  ERROR_MESSAGES,
} = require("../../constants");

const { throwIf, hasField, generateCode } = require("../../utils/helpers");

const coursesRepository = require("./courses.repository");
const db = require("../../config/database");
const { COURSE_CODE } = require("./courses.constants");
const { withTransaction } = require("../../utils/database");

const getList = async (query, connection = db) => {
  const { data: courses, pagination } = await coursesRepository.find(
    query,
    connection,
  );
  return { courses, pagination };
};

const getById = async (courseId, connection = db) => {
  const course = await coursesRepository.findById(courseId, connection);
  throwIf(!course, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);
  return course;
};

const create = async (courseData, connection = db) => {
  return withTransaction(async (txConnection) => {
    if (!hasField(courseData, "courseStatus")) {
      courseData.courseStatus = COURSE_STATUS.PENDING;
    }
    if (!hasField(courseData, "courseDescription")) {
      courseData.courseDescription = "";
    }
    if (!hasField(courseData, "certificateAvailable")) {
      courseData.certificateAvailable = true;
    }

    const createdCourse = await coursesRepository.create(
      courseData,
      txConnection,
    );
    throwIf(!createdCourse, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

    const courseCode = generateCode(
      COURSE_CODE.PREFIX,
      createdCourse.courseId,
      COURSE_CODE.LENGTH,
    );

    const finalCourse = await coursesRepository.update(
      createdCourse.courseId,
      { courseCode },
      txConnection,
    );

    return finalCourse;
  }, connection);
};

const update = async (courseId, courseData, connection = db) => {
  return withTransaction(async (txConnection) => {
    const course = await coursesRepository.findById(courseId, txConnection);
    throwIf(!course, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

    const updateCoursePayload = {};
    const allowedFields = [
      "courseName",
      "courseDescription",
      "durationHours",
      "totalSessions",
      "tuitionFee",
      "certificateAvailable",
      "courseStatus",
      "level"
    ];

    allowedFields.forEach((field) => {
      if (hasField(courseData, field)) {
        updateCoursePayload[field] = courseData[field];
      }
    });

    let updatedCourse = null;
    if (Object.keys(updateCoursePayload).length > 0) {
      updatedCourse = await coursesRepository.update(
        courseId,
        updateCoursePayload,
        txConnection,
      );
    }

    throwIf(!updatedCourse, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);
    return updatedCourse;
  }, connection);
};

const remove = async (courseId, connection = db) => {
  return withTransaction(async (txConnection) => {
    const course = await coursesRepository.findById(courseId, txConnection);
    throwIf(!course, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

    throwIf(
      course.courseStatus === COURSE_STATUS.DELETED,
      AppError.ConflictError,
      "Course has already been deleted"
    );

    const result = await coursesRepository.remove(courseId, txConnection);
    throwIf(!result, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

    return result;
  }, connection);
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};