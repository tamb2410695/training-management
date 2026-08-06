const db = require("@/config/database");

const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("@/utils/errors");

const { ERROR_CODES, CODE_PREFIX } = require("@/constants");

const {
  throwIf,
  pickFields,
  hasField,
  generateCode,
} = require("@/utils/helpers");

const { withTransaction } = require("@/utils/database");

const { COURSE_STATUS } = require("./courses.constants");

const coursesRepository = require("./courses.repository");

const courseCategoriesRepository = require("../courseCategories/courseCategories.repository");

const { COURSE_FIELDS } = require("./courses.constants");

// ===============================
// Query
// ===============================

const getList = async (query, connection = db) => {
  const result = await coursesRepository.list(query, connection);

  return {
    courses: result.data,
    pagination: result.pagination,
  };
};

const getById = async (courseId, connection = db) => {
  const course = await coursesRepository.findById(courseId, connection);

  throwIf(!course, NotFoundError, ERROR_CODES.COURSE_NOT_FOUND);

  return course;
};

// ===============================
// Internal helpers
// ===============================

const getCourseOrThrow = async (courseId, connection = db) => {
  const course = await coursesRepository.findById(courseId, connection);

  throwIf(!course, NotFoundError, ERROR_CODES.COURSE_NOT_FOUND);

  return course;
};

const validateCategory = async (categoryId, connection = db) => {
  const category = await courseCategoriesRepository.findById(
    categoryId,
    connection,
  );

  throwIf(!category, NotFoundError, ERROR_CODES.COURSE_CATEGORY_NOT_FOUND);

  return category;
};

const buildUpdatePayload = (courseData) => {
  const payload = {};

  COURSE_FIELDS.BODY.UPDATE.forEach((field) => {
    if (hasField(courseData, field)) {
      payload[field] = courseData[field];
    }
  });

  throwIf(
    Object.keys(payload).length === 0,
    BadRequestError,
    ERROR_CODES.NO_VALID_FIELDS,
  );

  return payload;
};

// ===============================
// CRUD
// ===============================

const create = async (courseData, connection = db) => {
  return withTransaction(async (tx) => {
    await validateCategory(courseData.categoryId, tx);

    const payload = {
      ...courseData,

      // lifecycle mặc định
      courseStatus: COURSE_STATUS.DRAFT,
    };

    const course = await coursesRepository.create(payload, tx);

    throwIf(!course, ConflictError, ERROR_CODES.NO_CHANGES);

    if (!course.courseCode) {
      const courseCode = generateCode(CODE_PREFIX.COURSE, course.courseId);

      await coursesRepository.update(
        course.courseId,
        {
          courseCode,
        },
        tx,
      );
    }

    return coursesRepository.findById(course.courseId, tx);
  }, connection);
};

const update = async (courseId, courseData, connection = db) => {
  const course = await getCourseOrThrow(courseId, connection);

  throwIf(
    course.courseStatus === COURSE_STATUS.ARCHIVED,

    ConflictError,

    ERROR_CODES.COURSE_ARCHIVED,
  );

  const payload = buildUpdatePayload(courseData);

  if (payload.categoryId) {
    await validateCategory(payload.categoryId, connection);
  }

  const updated = await coursesRepository.update(courseId, payload, connection);

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};

const remove = async (courseId, connection = db) => {
  const course = await getCourseOrThrow(courseId, connection);

  throwIf(
    course.courseStatus === COURSE_STATUS.PUBLISHED,

    ConflictError,

    ERROR_CODES.COURSE_CANNOT_DELETE,
  );

  return coursesRepository.remove(courseId, connection);
};

// ===============================
// Business Actions
// ===============================

const publish = async (courseId, connection = db) => {
  const course = await getCourseOrThrow(courseId, connection);

  throwIf(
    course.courseStatus !== COURSE_STATUS.DRAFT,

    ConflictError,

    ERROR_CODES.COURSE_ALREADY_PROCESSED,
  );

  const updated = await coursesRepository.updateStatus(
    courseId,
    COURSE_STATUS.PUBLISHED,
    connection,
  );
throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};

const archive = async (courseId, connection = db) => {
  const course = await getCourseOrThrow(courseId, connection);

  throwIf(
    course.courseStatus !== COURSE_STATUS.PUBLISHED,
    ConflictError,
    ERROR_CODES.COURSE_ALREADY_PROCESSED,
  );

  const updated = await  coursesRepository.updateStatus(
    courseId,
    COURSE_STATUS.ARCHIVED,
    connection,
  );

throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

return updated;
};

const restore = async (courseId, connection = db) => {
  const course = await getCourseOrThrow(courseId, connection);

  throwIf(
    course.courseStatus !== COURSE_STATUS.ARCHIVED,
    ConflictError,
    ERROR_CODES.COURSE_ALREADY_PROCESSED,
  );

  const updated = await coursesRepository.updateStatus(
    courseId,
    COURSE_STATUS.PUBLISHED,
    connection,
  );

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};

module.exports = {
  getList,
  getById,

  create,
  update,
  remove,

  publish,
  archive,
  restore,
};