const db = require("@/config/database");

const { NotFoundError, ConflictError } = require("@/utils/errors");

const { ERROR_CODES, REGISTRATION_STATUS } = require("@/constants");

const {
  throwIf,
  generateUsernameFromEmail,
  pickFields,
} = require("@/utils/helpers");

const { withTransaction } = require("@/utils/database");

const registrationsRepository = require("./registrations.repository");

const { REGISTRATION_FIELDS } = require("./registrations.constants");

const userCreationService = require("../users/userCreation.service");

// ===============================
// Query
// ===============================

const getList = async (query, connection = db) => {
  const result = await registrationsRepository.list(query, connection);

  return {
    registrations: result.data,
    pagination: result.pagination,
  };
};

const getById = async (registrationId, connection = db) => {
  const registration = await registrationsRepository.findById(
    registrationId,
    connection,
  );

  throwIf(!registration, NotFoundError, ERROR_CODES.REGISTRATION_NOT_FOUND);

  return registration;
};

// ===============================
// CRUD
// ===============================

const create = async (registrationData, connection = db) => {
  return withTransaction(async (tx) => {
    const { personalEmail, phone } = registrationData;

    const existingRegistration = await registrationsRepository.findByContact(
      personalEmail,
      phone,
      tx,
    );

    throwIf(
      existingRegistration &&
        existingRegistration.registrationStatus === REGISTRATION_STATUS.PENDING,

      ConflictError,

      ERROR_CODES.REGISTRATION_ALREADY_PROCESSED,
    );

    const payload = {
      ...registrationData,
      registrationStatus: REGISTRATION_STATUS.PENDING,
    };

    const registration = await registrationsRepository.create(payload, tx);

    throwIf(!registration, ConflictError, ERROR_CODES.NO_CHANGES);

    return registration;
  }, connection);
};

const update = async (registrationId, registrationData, connection = db) => {
  const registration = await registrationsRepository.findById(
    registrationId,
    connection,
  );

  throwIf(!registration, NotFoundError, ERROR_CODES.REGISTRATION_NOT_FOUND);

  const payload = pickFields(registrationData, REGISTRATION_FIELDS.BODY.UPDATE);

  // Không cho CRUD update lifecycle
  delete payload.registrationStatus;
  delete payload.studentId;

  const updated = await registrationsRepository.update(
    registrationId,
    payload,
    connection,
  );

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};

const remove = async (registrationId, connection = db) => {
  const exists = await registrationsRepository.findById(
    registrationId,
    connection,
  );

  throwIf(!exists, NotFoundError, ERROR_CODES.REGISTRATION_NOT_FOUND);

  return registrationsRepository.remove(registrationId, connection);
};

// ===============================
// Business Actions
// ===============================

const approve = async (
  registrationId,
  accountData,
  profileData,
  connection = db,
) => {
  return withTransaction(
    async (tx) => {
      const registration = await registrationsRepository.findById(
        registrationId,
        tx,
      );

      if (registration.courseId) {
        await enrollmentService.create(
          {
            studentId: student.studentData.studentId,

            courseId: registration.courseId,
          },
          tx,
        );
      }

      throwIf(!registration, NotFoundError, ERROR_CODES.REGISTRATION_NOT_FOUND);

      throwIf(
        registration.registrationStatus !== REGISTRATION_STATUS.PENDING,

        ConflictError,

        ERROR_CODES.REGISTRATION_ALREADY_PROCESSED,
      );

      const username = await generateUsernameFromEmail(
        registration.personalEmail,
      );

      const student = await userCreationService.createStudent(
        {
          username,
          email: registration.personalEmail,
          ...accountData,
        },

        {
          fullName: registration.fullName,

          phone: registration.phone,

          personalEmail: registration.personalEmail,

          ...profileData,
        },

        tx,
      );

      await registrationsRepository.assignStudent(
        registrationId,
        student.studentData.studentId,
        tx,
      );

      const updated = await registrationsRepository.updateStatus(
        registrationId,
        REGISTRATION_STATUS.APPROVED,
        tx,
      );

      return {
        student,
        registration: updated,
      };
    },

    connection,
  );
};

const reject = async (registrationId, connection = db) => {
  const registration = await registrationsRepository.findById(
    registrationId,
    connection,
  );

  throwIf(!registration, NotFoundError, ERROR_CODES.REGISTRATION_NOT_FOUND);

  throwIf(
    registration.registrationStatus !== REGISTRATION_STATUS.PENDING,

    ConflictError,

    ERROR_CODES.REGISTRATION_ALREADY_PROCESSED,
  );

  return registrationsRepository.updateStatus(
    registrationId,
    REGISTRATION_STATUS.REJECTED,
    connection,
  );
};

module.exports = {
  getList,
  getById,

  create,
  update,
  remove,

  approve,
  reject,
};
