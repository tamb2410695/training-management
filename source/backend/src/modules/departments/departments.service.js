const db = require("../../config/database");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../../utils/errors");

const { ERROR_CODES } = require("../../constants");
const { throwIf, hasField } = require("../../utils/helpers");
const departmentsRepository = require("./departments.repository");

const getList = async (query, connection = db) => {
  const { data: departments, pagination } = await departmentsRepository.find(
    query,
    connection,
  );

  return {
    departments,
    pagination,
  };
};

const getById = async (departmentId, connection = db) => {
  const department = await departmentsRepository.findById(
    departmentId,
    connection,
  );

  throwIf(!department, NotFoundError, ERROR_CODES.DEPARTMENT_NOT_FOUND);

  return department;
};

const create = async (departmentData, connection = db) => {
  const { departmentCode } = departmentData;

  const existedDepartment = await departmentsRepository.findByCode(
    departmentCode,
    connection,
  );

  throwIf(
    existedDepartment,
    ConflictError,
    ERROR_CODES.DEPARTMENT_CODE_EXISTED,
  );

  const createdDepartment = await departmentsRepository.create(
    departmentData,
    connection,
  );

  throwIf(!createdDepartment, ConflictError, ERROR_CODES.NO_CHANGES);

  return createdDepartment;
};

const getDepartmentOrThrow = async (departmentId, connection = db) => {
  const department = await departmentsRepository.findById(
    departmentId,
    connection,
  );

  throwIf(!department, NotFoundError, ERROR_CODES.DEPARTMENT_NOT_FOUND);
  return department;
};

const resolveCodeUpdate = async (
  department,
  departmentData,
  updateDepartmentData,
  connection = db,
) => {
  if (!hasField(departmentData, "departmentCode")) return;

  const existed = await departmentsRepository.findByCode(
    departmentData.departmentCode,
    connection,
  );

  throwIf(
    existed && existed.departmentId !== department.departmentId,
    ConflictError,
    ERROR_CODES.DEPARTMENT_CODE_EXISTED,
  );

  updateDepartmentData.departmentCode = departmentData.departmentCode;
};

const resolveNameUpdate = (departmentData, updateDepartmentData) => {
  if (!hasField(departmentData, "departmentName")) return;
  updateDepartmentData.departmentName = departmentData.departmentName;
};

const buildUpdateDepartmentData = async (
  department,
  departmentData,
  connection = db,
) => {
  const updateDepartmentData = {};

  await resolveCodeUpdate(
    department,
    departmentData,
    updateDepartmentData,
    connection,
  );
  resolveNameUpdate(departmentData, updateDepartmentData);

  throwIf(
    Object.keys(updateDepartmentData).length === 0,
    BadRequestError,
    ERROR_CODES.NO_VALID_FIELDS,
  );

  return updateDepartmentData;
};

const update = async (departmentId, departmentData, connection = db) => {
  const department = await getDepartmentOrThrow(departmentId, connection);

  const updateDepartmentData = await buildUpdateDepartmentData(
    department,
    departmentData,
    connection,
  );

  const updatedDepartment = await departmentsRepository.update(
    departmentId,
    updateDepartmentData,
    connection,
  );

  throwIf(!updatedDepartment, ConflictError, ERROR_CODES.NO_CHANGES);

  return updatedDepartment;
};

const remove = async (departmentId, connection = db) => {
  await getDepartmentOrThrow(departmentId, connection);

  const deletedResult = await departmentsRepository.remove(
    departmentId,
    connection,
  );
  return deletedResult;
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};
