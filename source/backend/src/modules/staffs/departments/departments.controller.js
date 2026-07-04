const { asyncHandler, successResponse } = require("../../../utils/helpers");
const staffDepartmentsService = require("./departments.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await staffDepartmentsService.getList(queryOptions);
  return successResponse(res, result, "Get staff department assignments successful");
});

const getByCompositeKey = asyncHandler(async (req, res, next) => {
  const { staffId, departmentId } = req.params;
  const result = await staffDepartmentsService.getByCompositeKey(Number(staffId), Number(departmentId));
  return successResponse(res, result, "Get staff department assignment detail successful");
});

const assign = asyncHandler(async (req, res, next) => {
  const assignmentData = req.body;
  const result = await staffDepartmentsService.assign(assignmentData);
  return successResponse(res, result, "Staff assigned to department successfully");
});

const updateAssignment = asyncHandler(async (req, res, next) => {
  const { staffId, departmentId, staffDepartmentData } = req.validatedData;
  const result = await staffDepartmentsService.updateAssignment(staffId, departmentId, staffDepartmentData);
  return successResponse(res, result, "Update staff department assignment successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const { staffId, departmentId } = req.params;
  const result = await staffDepartmentsService.remove(Number(staffId), Number(departmentId));
  return successResponse(res, result, "Staff unassigned from department successfully");
});

module.exports = {
  getList,
  getByCompositeKey,
  assign,
  updateAssignment,
  remove,
};