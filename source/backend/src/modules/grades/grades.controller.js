const { asyncHandler, successResponse } = require("../../utils/helpers");

const studentsService = require("./students.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await studentsService.getList(queryOptions);
  return successResponse(res, result, "Get list successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const studentId = req.params.id;
  const result = await studentsService.getById(studentId);
  return successResponse(res, result, "Get student successful");
});

const create = asyncHandler(async (req, res, next) => {
  const {accountData, studentData} = req.body;
  const result = await studentsService.create(accountData, studentData);
  return successResponse(res, result, "Create new student successful");
});

const update = asyncHandler(async (req, res, next) => {
  const studentId = req.params.id;
  const studentData = req.body;
  const result = await studentsService.update(studentId, studentData);
  return successResponse(res, result, "Update student successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const studentId = req.params.id;
  const result = await studentsService.remove(studentId);
  return successResponse(res, result, "Remove student successful");
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};
