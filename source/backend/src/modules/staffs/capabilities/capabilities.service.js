const db = require("../../../config/database");
const {
  NotFoundError,
  ConflictError,
} = require("../../../utils/errors");

const { ERROR_CODES } = require("../../../constants");
const { throwIf } = require("../../../utils/helpers");

const staffCapabilitiesRepository = require("./staffCapabilities.repository");
const staffsRepository = require("../profiles/profiles.repository");
const coursesRepository = require("../../courses/courses.repository"); 

/**
 * Lấy danh sách năng lực giảng dạy của giảng viên (phân trang, lọc, sắp xếp)
 */
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

/**
 * Lấy thông tin chi tiết một bản ghi năng lực theo cặp khóa (staffId, courseId)
 */
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

/**
 * Gán năng lực giảng dạy môn học cho nhân sự (Giảng viên)
 */
const create = async (capabilityData, connection = db) => {
  const { staffId, courseId } = capabilityData;

  // 1. Kiểm tra xem nhân sự và môn học gốc có tồn tại hay không
  const [staffExists, courseExists] = await Promise.all([
    staffsRepository.findById(staffId, connection),
    coursesRepository.findById(courseId, connection),
  ]);

  throwIf(!staffExists, NotFoundError, ERROR_CODES.STAFF_NOT_FOUND || "STAFF_NOT_FOUND");
  throwIf(!courseExists, NotFoundError, ERROR_CODES.COURSE_NOT_FOUND || "COURSE_NOT_FOUND");

  // 2. Kiểm tra xem năng lực này đã được gán từ trước chưa (Tránh trùng khóa chính phức hợp)
  const currentRelation = await staffCapabilitiesRepository.findWithCompositeKey(staffId, courseId, connection);
  throwIf(
    currentRelation,
    ConflictError,
    ERROR_CODES.DUPLICATE_ENTRY || "CAPABILITY_EXISTED",
    "This staff is already certified to teach this course"
  );

  // 3. Tiến hành lưu vào database
  const createdCapability = await staffCapabilitiesRepository.create(capabilityData, connection);

  throwIf(
    !createdCapability,
    ConflictError,
    ERROR_CODES.NO_CHANGES
  );

  return createdCapability;
};

/**
 * Hủy gán năng lực giảng dạy (Xóa liên kết)
 */
const remove = async (staffId, courseId, connection = db) => {
  // Xác thực sự tồn tại của bản ghi trước khi tiến hành xóa vật lý
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