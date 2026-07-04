const db = require("../../../config/database");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../../../utils/errors");

const { ERROR_CODES } = require("../../../constants");
const { throwIf, hasField } = require("../../../utils/helpers");

const staffDepartmentsRepository = require("./departments.repository");
const staffsRepository = require("../profiles/profiles.repository");
const departmentsRepository = require("../../departments/departments.repository");

const getList = async (query, connection = db) => {
  const { data: staffDepartments, pagination } =
    await staffDepartmentsRepository.find(query, connection);

  return {
    staffDepartments,
    pagination,
  };
};

const getByCompositeKey = async (staffId, departmentId, connection = db) => {
  const relation = await staffDepartmentsRepository.findWithCompositeKey(
    staffId,
    departmentId,
    connection,
  );

  throwIf(
    !relation,
    NotFoundError,
    ERROR_CODES.RESOURCE_NOT_FOUND || "STAFF_DEPARTMENT_NOT_FOUND",
    "Staff is not assigned to this department",
  );

  return relation;
};

const assign = async (assignmentData, connection = db) => {
  const { staffId, departmentId, appointmentType } = assignmentData;

  const [staffExists, departmentExists] = await Promise.all([
    staffsRepository.findById(staffId, connection),
    departmentsRepository.findById(departmentId, connection),
  ]);

  throwIf(
    !staffExists,
    NotFoundError,
    ERROR_CODES.STAFF_NOT_FOUND || "STAFF_NOT_FOUND",
  );
  throwIf(!departmentExists, NotFoundError, ERROR_CODES.DEPARTMENT_NOT_FOUND);

  const currentRelation = await staffDepartmentsRepository.findWithCompositeKey(
    staffId,
    departmentId,
    connection,
  );
  throwIf(
    currentRelation,
    ConflictError,
    ERROR_CODES.DUPLICATE_ENTRY || "ASSIGNMENT_EXISTED",
    "Staff is already assigned to this department",
  );

  if (appointmentType === "PRIMARY") {
    const primaryDept =
      await staffDepartmentsRepository.findPrimaryDepartmentByStaffId(
        staffId,
        connection,
      );
    throwIf(
      primaryDept,
      ConflictError,
      ERROR_CODES.VALIDATION_FAILED,
      "This staff already has a PRIMARY department assignment",
    );
  }

  const createdAssignment = await staffDepartmentsRepository.create(
    assignmentData,
    connection,
  );

  throwIf(!createdAssignment, ConflictError, ERROR_CODES.NO_CHANGES);

  return createdAssignment;
};

const updateAssignment = async (
  staffId,
  departmentId,
  updateData,
  connection = db,
) => {
  const currentRelation = await getByCompositeKey(
    staffId,
    departmentId,
    connection,
  );

  const finalUpdatePayload = {};

  if (
    hasField(updateData, "appointmentType") &&
    updateData.appointmentType !== currentRelation.appointmentType
  ) {
    if (updateData.appointmentType === "PRIMARY") {
      const primaryDept =
        await staffDepartmentsRepository.findPrimaryDepartmentByStaffId(
          staffId,
          connection,
        );
      throwIf(
        primaryDept && primaryDept.departmentId !== departmentId,
        ConflictError,
        ERROR_CODES.VALIDATION_FAILED,
        "This staff already has a PRIMARY department assignment elsewhere",
      );
    }
    finalUpdatePayload.appointmentType = updateData.appointmentType;
  }

  if (hasField(updateData, "assignedAt")) {
    finalUpdatePayload.assignedAt = updateData.assignedAt;
  }

  throwIf(
    Object.keys(finalUpdatePayload).length === 0,
    BadRequestError,
    ERROR_CODES.NO_VALID_FIELDS,
  );

  const updatedAssignment = await staffDepartmentsRepository.update(
    staffId,
    departmentId,
    finalUpdatePayload,
    connection,
  );

  throwIf(!updatedAssignment, ConflictError, ERROR_CODES.NO_CHANGES);

  return updatedAssignment;
};

const remove = async (staffId, departmentId, connection = db) => {
  await getByCompositeKey(staffId, departmentId, connection);

  const deletedResult = await staffDepartmentsRepository.remove(
    staffId,
    departmentId,
    connection,
  );
  return deletedResult;
};

module.exports = {
  getList,
  getByCompositeKey,
  assign,
  updateAssignment,
  remove,
};
