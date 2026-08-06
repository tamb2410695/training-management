const { SUCCESS_CODES } = require("@/constants");

const { asyncHandler, successResponse } = require("@/utils/helpers");

const enrollmentsService = require("./enrollments.service");

// ===============================
// Query
// ===============================

const getList = asyncHandler(async (req, res) => {
  const result = await enrollmentsService.getList(req.query);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.SYSTEM_FETCH_SUCCESS,
  );
});

const getById = asyncHandler(async (req, res) => {
  const result = await enrollmentsService.getById(req.params.id);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.SYSTEM_FETCH_SUCCESS,
  );
});

// ===============================
// CRUD
// ===============================

const create = asyncHandler(async (req, res) => {
  const result = await enrollmentsService.create(req.body);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.SYSTEM_CREATE_SUCCESS,
  );
});

const update = asyncHandler(async (req, res) => {
  const result = await enrollmentsService.update(
    req.params.id,

    req.body,
  );

  return successResponse(
    res,

    result,

    SUCCESS_CODES.SYSTEM_UPDATE_SUCCESS,
  );
});

const remove = asyncHandler(async (req, res) => {
  const result = await enrollmentsService.remove(req.params.id);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.SYSTEM_DELETE_SUCCESS,
  );
});

// ===============================
// Business Actions
// ===============================

const approve = asyncHandler(async (req, res) => {
  const result = await enrollmentsService.approve(req.params.id);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.ENROLLMENT_APPROVED,
  );
});

const reject = asyncHandler(async (req, res) => {
  const result = await enrollmentsService.reject(req.params.id);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.ENROLLMENT_REJECTED,
  );
});

module.exports = {
  getList,

  getById,

  create,

  update,

  remove,

  approve,

  reject,
};
