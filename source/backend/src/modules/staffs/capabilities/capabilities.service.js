const db = require("../../../config/database");
const {
  NotFoundError,
  ConflictError,
} = require("../../../utils/errors");

const { ERROR_CODES } = require("../../../constants");
const { throwIf } = require("../../../utils/helpers");

const staffCapabilitiesRepository = require("./capabilities.repository");
const staffsRepository = require("../profiles/profiles.repository");
const coursesRepository = require("../../courses/courses.repository"); 

const getList = async (query, connection = db) => {
  const { data: staffCapabilities, pagination } = await staffCapabilitiesRepository.find(
    query,
    connection,
  );

  return {
    staffCapabilities,
    pagination,
  };
};

const getByCompositeKey = async (staffId, courseId, connection = db) => {
  const capability = await staffCapabilitiesRepository.findWithCompositeKey(staffId, courseId, connection);

  throwIf(
    !capability,
    NotFoundError,
    ERROR_CODES.RESOURCE_NOT_FOUND || "STAFF_CAPABILITY_NOT_FOUND",
    "This staff profile is not certified for this course"
  );

  return capability;
};

const create = async (capabilityData, connection = db) => {
  const { staffId, courseId } = capabilityData;

  const [staffExists, courseExists] = await Promise.all([
    staffsRepository.findById(staffId, connection),
    coursesRepository.findById(courseId, connection),
  ]);

  throwIf(!staffExists, NotFoundError, ERROR_CODES.STAFF_NOT_FOUND || "STAFF_NOT_FOUND");
  throwIf(!courseExists, NotFoundError, ERROR_CODES.COURSE_NOT_FOUND || "COURSE_NOT_FOUND");

  const currentRelation = await staffCapabilitiesRepository.findWithCompositeKey(staffId, courseId, connection);
  throwIf(
    currentRelation,
    ConflictError,
    ERROR_CODES.DUPLICATE_ENTRY || "CAPABILITY_EXISTED",
    "This staff is already certified to teach this course"
  );
  const createdCapability = await staffCapabilitiesRepository.create(capabilityData, connection);

  throwIf(
    !createdCapability,
    ConflictError,
    ERROR_CODES.NO_CHANGES
  );

  return createdCapability;
};

const remove = async (staffId, courseId, connection = db) => {
  await getByCompositeKey(staffId, courseId, connection);

  const deletedResult = await staffCapabilitiesRepository.remove(staffId, courseId, connection);
  return deletedResult;
};

module.exports = {
  getList,
  getByCompositeKey,
  create,
  remove,
};