const db = require("@/config/database");

const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("@/utils/errors");

const { ERROR_CODES } = require("@/constants");

const { throwIf, pickFields } = require("@/utils/helpers");

const { withTransaction } = require("@/utils/database");

const { CLASS_STATUS, CLASS_FIELDS } = require("./classes.constants");

const classesRepository = require("./classes.repository");

const getClassOrThrow = async (classId, connection = db) => {
  const classData = await classesRepository.findById(classId, connection);

  throwIf(!classData, NotFoundError, ERROR_CODES.CLASS_NOT_FOUND);

  return classData;
};

const getList = async (query, connection = db) => {
  const result = await classesRepository.list(query, connection);

  return {
    classes: result.data,
    pagination: result.pagination,
  };
};

const getById = async (classId, connection = db) =>
  getClassOrThrow(classId, connection);

const create = async (classData, connection = db) => {
  return withTransaction(async (tx) => {
    const courseExists = await classesRepository.existsCourse(
      classData.courseId,
      tx,
    );

    throwIf(!courseExists, NotFoundError, ERROR_CODES.COURSE_NOT_FOUND);

    const instructorExists = await classesRepository.existsInstructor(
      classData.teacherId,
      tx,
    );

    throwIf(!instructorExists, NotFoundError, ERROR_CODES.INSTRUCTOR_NOT_FOUND);

    const payload = {
      ...classData,
      classStatus: CLASS_STATUS.DRAFT,
    };

    const created = await classesRepository.create(payload, tx);

    throwIf(!created, ConflictError, ERROR_CODES.NO_CHANGES);

    return created;
  }, connection);
};

const update = async (classId, classData, connection = db) => {
  await getClassOrThrow(classId, connection);

  const payload = pickFields(classData, CLASS_FIELDS.BODY.UPDATE);

  delete payload.classStatus;

  throwIf(
    Object.keys(payload).length === 0,
    BadRequestError,
    ERROR_CODES.NO_VALID_FIELDS,
  );

  if (payload.courseId) {
    const courseExists = await classesRepository.existsCourse(
      payload.courseId,
      connection,
    );

    throwIf(!courseExists, NotFoundError, ERROR_CODES.COURSE_NOT_FOUND);
  }

  if (payload.teacherId) {
    const instructorExists = await classesRepository.existsInstructor(
      payload.teacherId,
      connection,
    );

    throwIf(!instructorExists, NotFoundError, ERROR_CODES.INSTRUCTOR_NOT_FOUND);
  }

  const updated = await classesRepository.update(classId, payload, connection);

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};

const remove = async (classId, connection = db) => {
  await getClassOrThrow(classId, connection);

  return classesRepository.remove(classId, connection);
};

const assignInstructor = async (classId, teacherId, connection = db) => {
  const classData = await getClassOrThrow(classId, connection);

  throwIf(
    classData.classStatus === CLASS_STATUS.COMPLETED,
    ConflictError,
    ERROR_CODES.CLASS_CANNOT_UPDATE,
  );

  const instructorExists = await classesRepository.existsInstructor(
    teacherId,
    connection,
  );

  throwIf(!instructorExists, NotFoundError, ERROR_CODES.INSTRUCTOR_NOT_FOUND);

  return classesRepository.update(
    classId,
    {
      teacherId,
    },
    connection,
  );
};

const open = async (classId, connection = db) => {
  const classData = await getClassOrThrow(classId, connection);

  throwIf(
    classData.classStatus !== CLASS_STATUS.DRAFT,
    ConflictError,
    ERROR_CODES.INVALID_CLASS_STATUS,
  );

  return classesRepository.updateStatus(classId, CLASS_STATUS.OPEN, connection);
};

const start = async (classId, connection = db) => {
  const classData = await getClassOrThrow(classId, connection);

  throwIf(
    classData.classStatus !== CLASS_STATUS.OPEN,
    ConflictError,
    ERROR_CODES.INVALID_CLASS_STATUS,
  );

  return classesRepository.updateStatus(
    classId,
    CLASS_STATUS.ONGOING,
    connection,
  );
};

const complete = async (classId, connection = db) => {
  const classData = await getClassOrThrow(classId, connection);

  throwIf(
    classData.classStatus !== CLASS_STATUS.ONGOING,
    ConflictError,
    ERROR_CODES.INVALID_CLASS_STATUS,
  );

  return classesRepository.updateStatus(
    classId,
    CLASS_STATUS.COMPLETED,
    connection,
  );
};

const cancel = async (classId, connection = db) => {
  const classData = await getClassOrThrow(classId, connection);

  const cancellableStatuses = [CLASS_STATUS.DRAFT, CLASS_STATUS.OPEN];

  throwIf(
    !cancellableStatuses.includes(classData.classStatus),
    ConflictError,
    ERROR_CODES.INVALID_CLASS_STATUS,
  );

  return classesRepository.updateStatus(
    classId,
    CLASS_STATUS.CANCELLED,
    connection,
  );
};

const getCapacity = async (classId, connection = db) => {
  const classData = await getClassOrThrow(classId, connection);

  const capacity = await classesRepository.findCapacity(classId, connection);

  if (!capacity) {
    return {
      classId,
      maxStudents: classData.maxStudents,
      approvedStudents: 0,
      isFull: false,
      remainingSlots: classData.maxStudents,
    };
  }

  const isFull = capacity.approvedStudents >= capacity.maxStudents;

  return {
    classId: capacity.classId,
    maxStudents: Number(capacity.maxStudents),
    approvedStudents: Number(capacity.approvedStudents),
    isFull,
    remainingSlots: Math.max(
      capacity.maxStudents - capacity.approvedStudents,
      0,
    ),
  };
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
  assignInstructor,
  open,
  start,
  complete,
  cancel,
  getCapacity,
};
