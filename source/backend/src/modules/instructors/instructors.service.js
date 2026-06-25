const AppError = require("../../utils/errors");
const {
  ROLES,
  ACCOUNT_STATUS,
  GENDER,
  ERROR_MESSAGES,
} = require("../../constants");

const { throwIf, hasField, generateCode } = require("../../utils/helpers");

const accountsService = require("../accounts/accounts.service");
const accountsRepository = require("../accounts/accounts.repository");
const instructorsRepository = require("./instructors.repository");
const db = require("../../config/database");
const { withTransaction } = require("../../utils/database");
const { INSTRUCTOR_CODE } = require("./instructors.constants");

const getList = async (query, connection = db) => {
  const { data: instructors, pagination } = await instructorsRepository.find(
    query,
    connection,
  );

  return {
    instructors,
    pagination,
  };
};

const getById = async (instructorId, connection = db) => {
  const instructor = await instructorsRepository.findById(instructorId, connection);
  throwIf(!instructor, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

  return instructor;
};

const create = async (accountData, instructorData, connection = db) => {
  return withTransaction(async (txConnection) => {
    const createdAccount = await accountsService.create(
      { ...accountData, roleName: ROLES.INSTRUCTOR },
      txConnection,
    );

    if (!hasField(instructorData, "gender")) instructorData.gender = GENDER.OTHER;
    if (!hasField(instructorData, "address")) instructorData.address = "";

    const createdInstructor = await instructorsRepository.create(
      {
        accountId: createdAccount.accountId,
        ...instructorData,
        instructorCode: "TEMP_CODE"
      },
      txConnection,
    );

    throwIf(!createdInstructor, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

    const instructorCode = generateCode(
      INSTRUCTOR_CODE.PREFIX,
      createdInstructor.instructorId,
      INSTRUCTOR_CODE.LENGTH,
    );

    const finalInstructor = await instructorsRepository.update(
      createdInstructor.instructorId,
      { instructorCode },
      txConnection,
    );

    return {
      account: createdAccount,
      instructor: finalInstructor,
    };
  });
};

const update = async (instructorId, accountData, instructorData, connection = db) => {
  return withTransaction(async (txConnection) => {
    const instructor = await instructorsRepository.findById(instructorId, txConnection);
    throwIf(!instructor, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

    let updatedAccount = null;
    if (accountData && Object.keys(accountData).length > 0) {
      updatedAccount = await accountsService.update(
        instructor.accountId,
        accountData,
        txConnection,
      );
    }

    const updateInstructorPayload = {};
    const allowedFields = [
      "fullName", 
      "phone", 
      "instructorStatus", 
      "gender", 
      "address", 
      "dateOfBirth", 
      "specialization", 
      "hireDate"
    ];

    allowedFields.forEach((field) => {
      if (hasField(instructorData, field)) {
        updateInstructorPayload[field] = instructorData[field];
      }
    });

    let updatedInstructor = null;
    if (Object.keys(updateInstructorPayload).length > 0) {
      updatedInstructor = await instructorsRepository.update(
        instructorId,
        updateInstructorPayload,
        txConnection,
      );
    }

    throwIf(
      !updatedInstructor && !updatedAccount,
      AppError.ConflictError,
      ERROR_MESSAGES.NO_CHANGES,
    );

    return {
      account: updatedAccount || await accountsRepository.findById(instructor.accountId, txConnection),
      instructor: updatedInstructor || instructor,
    };
  });
};

const remove = async (instructorId, connection = db) => {
  return withTransaction(async (txConnection) => {
    const instructor = await instructorsRepository.findById(instructorId, txConnection);
    throwIf(!instructor, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

    const account = await accountsRepository.findById(instructor.accountId, txConnection);
    throwIf(!account, AppError.NotFoundError, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);

    throwIf(
      account.accountStatus === ACCOUNT_STATUS.DELETED,
      AppError.ConflictError,
      ERROR_MESSAGES.ACCOUNT_DELETED,
    );

    await accountsService.remove(instructor.accountId, txConnection);
    const result = await instructorsRepository.remove(instructorId, txConnection);
    
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