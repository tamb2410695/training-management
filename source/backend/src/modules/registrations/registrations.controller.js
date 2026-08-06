const { SUCCESS_CODES } = require("@/constants");

const { asyncHandler, successResponse } = require("@/utils/helpers");

const registrationsService = require("./registrations.service");

// ===============================
// Query
// ===============================

const getList = asyncHandler(async (req, res) => {
  const result = await registrationsService.getList(req.query);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getById = asyncHandler(async (req, res) => {
  const result = await registrationsService.getById(req.params.id);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

// ===============================
// CRUD
// ===============================

const create = asyncHandler(async (req, res) => {
  const result = await registrationsService.create(req.body);

  return successResponse(
    res,
    result,
    SUCCESS_CODES.STUDENT_REGISTRATION_SUBMITTED,
    211,
  );
});

const update = asyncHandler(async (req, res) => {
  const result = await registrationsService.update(req.params.id, req.body);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_UPDATE_SUCCESS);
});

const remove = asyncHandler(async (req, res) => {
  const result = await registrationsService.remove(req.params.id);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_DELETE_SUCCESS);
});

// ===============================
// Business Actions
// ===============================

const approve = asyncHandler(async (req, res) => {
  const result = await registrationsService.approve(
    req.params.id,
    req.body.accountData,
    req.body.profileData,
  );

  return successResponse(
    res,
    result,
    SUCCESS_CODES.STUDENT_REGISTRATION_APPROVED,
  );
});

const reject = asyncHandler(async (req, res) => {
  const result = await registrationsService.reject(req.params.id);

  return successResponse(
    res,
    result,
    SUCCESS_CODES.STUDENT_REGISTRATION_REJECTED,
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
