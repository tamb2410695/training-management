const { asyncHandler, successResponse } = require("../../utils/helpers");
const departmentsService = require("./departments.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await departmentsService.getList(queryOptions);
  return successResponse(res, result, "Get list of departments successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await departmentsService.getById(id);
  return successResponse(res, result, "Get department detail successful");
});

const create = asyncHandler(async (req, res, next) => {
  const departmentData = req.body;
  const result = await departmentsService.create(departmentData);
  return successResponse(res, result, "Create new department successful");
});

const update = asyncHandler(async (req, res, next) => {
  const { departmentId, departmentData } = req.validatedData;
  const result = await departmentsService.update(departmentId, departmentData);
  return successResponse(res, result, "Update department successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await departmentsService.remove(id);
  return successResponse(res, result, "Remove department successful");
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};