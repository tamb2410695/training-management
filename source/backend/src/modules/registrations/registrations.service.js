const db = require("../../config/database");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../../utils/errors");

const {
  ERROR_CODES,
  REGISTRATION_STATUS,
  ROLES,
  CODE_PREFIX,
} = require("../../constants");
const { throwIf, hasField, generateCode, generateUsernameFromEmail } = require("../../utils/helpers");
const registrationsRepository = require("./registrations.repository");
const { REGISTRATION_FIELDS } = require("./registrations.constants");

const studentsService = require("../students/students.service");
const { withTransaction } = require("../../utils/database");
const { PROFILE_TYPE } = require("../../constants/lookups/userCreation");
const userCreationService = require("../users/userCreation.service");

const getList = async (query, connection = db) => {
  return await registrationsRepository.find(query, connection);
};

const getById = async (registrationId, connection = db) => {
  const registrationData = await registrationsRepository.findById(
    registrationId,
    connection,
  );

  const username = await generateUsernameFromEmail(registrationData.personalEmail);

  throwIf(
    !registrationData,
    NotFoundError,
    ERROR_CODES.RESOURCE_NOT_FOUND
  );

  return {...registrationData, username};
};

const getByCode = async (registrationCode, connection = db) => {
  const registrationData = await registrationsRepository.findByCode(
    registrationCode,
    connection,
  );
  const username = await generateUsernameFromEmail(registrationData.personalEmail);

  throwIf(
    !registration,
    NotFoundError,
    ERROR_CODES.RESOURCE_NOT_FOUND
  );
  
  return registrationData;
};

const create = async (registrationData, connection = db) => {
  return await withTransaction(async (txConnection) => {
    const { personalEmail, phone } = registrationData;

    const existingForm = await registrationsRepository.findByContact(
      personalEmail,
      phone,
      txConnection,
    );

    throwIf(
      existingForm &&
        ["PENDING", "REVIEWING"].includes(existingForm.registrationStatus),
      ConflictError,
      ERROR_CODES.REGISTRATION_ALREADY_PROCESSED,
    );

    const finalPayload = {
      ...registrationData,
      registrationStatus: "PENDING",
    };

    const createdRegistration = await registrationsRepository.create(
      finalPayload,
      txConnection,
    );

    const registrationCode = await generateCode(
      CODE_PREFIX.REGISTRATION,
      createdRegistration.registrationId,
    );

    const updatedRegistration = await update(
      createdRegistration.registrationId,
      { registrationCode },
      txConnection,
    );

    throwIf(!updatedRegistration, ConflictError, ERROR_CODES.NO_CHANGES);

    return updatedRegistration;
  }, connection);
};

const buildUpdateData = (registration, updateBody) => {
  const updatePayload = {};
  const allowedFields = [...REGISTRATION_FIELDS.BODY.UPDATE, "registrationCode"];

  console.log(updateBody);
  allowedFields.forEach((field) => {
    if (hasField(updateBody, field)) {
      updatePayload[field] = updateBody[field];
    }
  });

  if (
    hasField(updateBody, "registrationStatus") &&
    ["APPROVED", "REJECTED"].includes(registration.registrationStatus)
  ) {
    throw new BadRequestError(
      "INVALID_STATUS_TRANSITION",
      "Cannot modify the status of a registration form that has already been finalized (APPROVED/REJECTED).",
    );
  }

  throwIf(
    Object.keys(updatePayload).length === 0,
    BadRequestError,
    ERROR_CODES.NO_VALID_FIELDS,
  );

  return updatePayload;
};

const update = async (registrationId, registrationData, connection = db) => {
  const registration = await registrationsRepository.findById(
    registrationId,
    connection,
  );
  throwIf(!registration, NotFoundError, ERROR_CODES.REGISTRATION_NOT_FOUND);

  const finalUpdatePayload = buildUpdateData(registration, registrationData);

  const updatedRegistration = await registrationsRepository.update(
    registrationId,
    finalUpdatePayload,
    connection,
  );

  throwIf(!updatedRegistration, ConflictError, ERROR_CODES.NO_CHANGES);

  return updatedRegistration;
};

const remove = async (registrationId, connection = db) => {
  const registration = await registrationsRepository.findById(
    registrationId,
    connection,
  );
  throwIf(!registration, NotFoundError, ERROR_CODES.REGISTRATION_NOT_FOUND);

  const deletedResult = await registrationsRepository.remove(
    registrationId,
    connection,
  );
  return deletedResult;
};

const activate = async (registrationId, registrationData, connection = db) => {
  return await withTransaction(async (txConnection) => {
    const { accountData, profileData } = registrationData;
    const registration = await registrationsRepository.findById(
      registrationId,
      txConnection,
    );

    throwIf(!registration, NotFoundError, ERROR_CODES.REGISTRATION_NOT_FOUND);
    const { fullName, phone, personalEmail } = registration;

    throwIf(
      registration.studentId ||
        registration.registrationStatus === REGISTRATION_STATUS.COMPLETED,
      ConflictError,
      ERROR_CODES.REGISTRATION_ALREADY_PROCESSED,
    );

    const username = await generateUsernameFromEmail(personalEmail);
    const accountPayload = { username, email: personalEmail, ...accountData };
    const studentPayload = { fullName, phone, personalEmail, ...profileData };
    const createdUserData = await userCreationService.createStudent(
      accountPayload,
      studentPayload,
      txConnection,
    );

    const updatedRegistration = await update(
      registrationId,
      {
        studentId: createdUserData.studentData.studentId,
        registrationStatus: REGISTRATION_STATUS.COMPLETED,
      },
      txConnection,
    );

    return {createdUserData, updatedRegistration};
  }, connection);
};

module.exports = {
  getList,
  getById,
  getByCode,
  create,
  update,
  remove,
  activate,
};
