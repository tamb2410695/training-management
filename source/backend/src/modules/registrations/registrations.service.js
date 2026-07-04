const db = require("../../config/database");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../../utils/errors");

const { ERROR_CODES } = require("../../constants");
const { throwIf, hasField } = require("../../utils/helpers");
const registrationsRepository = require("./registrations.repository");

const generateRegistrationCode = async (connection = db) => {
  const currentYear = new Date().getFullYear();
  
  const [rows] = await connection.query(
    `SELECT COUNT(*) as total FROM REGISTRATION WHERE registration_code LIKE ?`,
    [`REG-${currentYear}-%`]
  );
  
  const nextSequence = (rows[0]?.total || 0) + 1;
  const paddedSequence = String(nextSequence).padStart(6, "0");
  
  return `REG-${currentYear}-${paddedSequence}`;
};

const getList = async (query, connection = db) => {
  const { data: registrations, pagination } = await registrationsRepository.find(
    query,
    connection,
  );

  return {
    registrations,
    pagination,
  };
};

const getById = async (registrationId, connection = db) => {
  const registration = await registrationsRepository.findById(registrationId, connection);

  throwIf(
    !registration,
    NotFoundError,
    ERROR_CODES.RESOURCE_NOT_FOUND || "REGISTRATION_NOT_FOUND",
    "Registration form not found"
  );

  return registration;
};

const getByCode = async (registrationCode, connection = db) => {
  const registration = await registrationsRepository.findByCode(registrationCode, connection);

  throwIf(
    !registration,
    NotFoundError,
    ERROR_CODES.RESOURCE_NOT_FOUND || "REGISTRATION_NOT_FOUND",
    "Invalid registration code"
  );

  return registration;
};

const create = async (registrationData, connection = db) => {
  const { personalEmail, phone } = registrationData;
  
  const existingForm = await registrationsRepository.findByContact(personalEmail, phone, connection);
  
  if (existingForm && ["PENDING", "REVIEWING"].includes(existingForm.registrationStatus)) {
    throw new ConflictError(
      "DUPLICATE_REGISTRATION",
      `You already have an active registration form (${existingForm.registrationCode}) currently being processed.`
    );
  }

  const registrationCode = await generateRegistrationCode(connection);

  const finalPayload = {
    ...registrationData,
    registrationCode,
    registrationStatus: "PENDING"
  };

  const createdRegistration = await registrationsRepository.create(finalPayload, connection);

  throwIf(!createdRegistration, ConflictError, ERROR_CODES.NO_CHANGES);

  return createdRegistration;
};

const buildUpdateData = (registration, updateBody) => {
  const updatePayload = {};
  const allowedFields = [
    "fullName", "gender", "dateOfBirth", 
    "phone", "personalEmail", "address", 
    "registrationStatus"
  ];

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
      "Cannot modify the status of a registration form that has already been finalized (APPROVED/REJECTED)."
    );
  }

  throwIf(
    Object.keys(updatePayload).length === 0,
    BadRequestError,
    ERROR_CODES.NO_VALID_FIELDS
  );

  return updatePayload;
};

const update = async (registrationId, updateBody, connection = db) => {
  const registration = await registrationsRepository.findById(registrationId, connection);
  throwIf(!registration, NotFoundError, "Registration form not found");

  const finalUpdatePayload = buildUpdateData(registration, updateBody);

  const updatedRegistration = await registrationsRepository.update(
    registrationId,
    finalUpdatePayload,
    connection
  );

  throwIf(!updatedRegistration, ConflictError, ERROR_CODES.NO_CHANGES);

  return updatedRegistration;
};

const remove = async (registrationId, connection = db) => {
  const registration = await registrationsRepository.findById(registrationId, connection);
  throwIf(!registration, NotFoundError, "Registration form not found");

  const deletedResult = await registrationsRepository.remove(registrationId, connection);
  return deletedResult;
};

module.exports = {
  getList,
  getById,
  getByCode,
  create,
  update,
  remove,
};