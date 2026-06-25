const AppError = require("../../utils/errors");
const { CLASS_STATUS, ERROR_MESSAGES } = require("../../constants");
const { throwIf, hasField, generateCode } = require("../../utils/helpers");

const classesRepository = require("./classes.repository");
const coursesRepository = require("../courses/courses.repository");
const instructorsRepository = require("../instructors/instructors.repository");

const db = require("../../config/database");
const { CLASS_CODE } = require("./classes.constants");
const { withTransaction } = require("../../utils/database");

const getList = async (query, connection = db) => {
  const { data: classes, pagination } = await classesRepository.find(query, connection);
  return { classes, pagination };
};

const getById = async (classId, connection = db) => {
  const targetClass = await classesRepository.findById(classId, connection);
  throwIf(!targetClass, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);
  return targetClass;
};

const create = async (classData, connection = db) => {
  return withTransaction(async (txConnection) => {
    const [course, instructor] = await Promise.all([
      coursesRepository.findById(classData.courseId, txConnection),
      instructorsRepository.findById(classData.instructorId, txConnection)
    ]);
    throwIf(!course, AppError.NotFoundError, "Linked Course not found");
    throwIf(!instructor, AppError.NotFoundError, "Linked Instructor not found");

        if (new Date(classData.endDate) < new Date(classData.startDate)) {
      throw new AppError.BadRequestError("End date must be greater than or equal to start date");
    }
    
    if (!hasField(classData, "classStatus")) {
      classData.classStatus = CLASS_STATUS.PENDING;
    }
    if (!hasField(classData, "maxStudents")) {
      classData.maxStudents = 30;
    }

    const createdClass = await classesRepository.create(classData, txConnection);
    throwIf(!createdClass, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

    const classCode = generateCode(
      CLASS_CODE.PREFIX,
      createdClass.classId,
      CLASS_CODE.LENGTH
    );

    const finalClass = await classesRepository.update(
      createdClass.classId,
      { classCode },
      txConnection
    );

    return finalClass;
  });
};

const update = async (classId, classData, connection = db) => {
  return withTransaction(async (txConnection) => {
    const targetClass = await classesRepository.findById(classId, txConnection);
    throwIf(!targetClass, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

    const updateClassPayload = {};
    const allowedFields = [
      "courseId",
      "instructorId",
      "className",
      "startDate",
      "endDate",
      "maxStudents",
      "classStatus"
    ];

    allowedFields.forEach((field) => {
      if (hasField(classData, field)) {
        updateClassPayload[field] = classData[field];
      }
    });

    const finalStartDate = updateClassPayload.startDate || targetClass.startDate;
    const finalEndDate = updateClassPayload.endDate || targetClass.endDate;
    if (new Date(finalEndDate) < new Date(finalStartDate)) {
      throw new AppError.BadRequestError("End date must be greater than or equal to start date");
    }

    if (hasField(updateClassPayload, "courseId")) {
      const course = await coursesRepository.findById(updateClassPayload.courseId, txConnection);
      throwIf(!course, AppError.NotFoundError, "Linked Course not found");
    }

    if (hasField(updateClassPayload, "instructorId")) {
      const instructor = await instructorsRepository.findById(updateClassPayload.instructorId, txConnection);
      throwIf(!instructor, AppError.NotFoundError, "Linked Instructor not found");
    }

    let updatedClass = null;
    if (Object.keys(updateClassPayload).length > 0) {
      updatedClass = await classesRepository.update(
        classId,
        updateClassPayload,
        txConnection
      );
    }

    throwIf(!updatedClass, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);
    return updatedClass;
  });
};

const remove = async (classId, connection = db) => {
  return withTransaction(async (txConnection) => {
    const targetClass = await classesRepository.findById(classId, txConnection);
    throwIf(!targetClass, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

    throwIf(
      targetClass.classStatus === CLASS_STATUS.DELETED,
      AppError.ConflictError,
      "Class has already been deleted"
    );

    const result = await classesRepository.remove(classId, txConnection);
    throwIf(!result, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

    return result;
  });
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};