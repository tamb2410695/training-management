const { SUCCESS_CODES } = require("@/constants");

const { asyncHandler, successResponse } = require("@/utils/helpers");

const accountsService = require("./accounts.service");

// ===============================
// Query
// ===============================

const getList = asyncHandler(async (req, res) => {
  const result = await accountsService.getList(req.query);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getById = asyncHandler(async (req, res) => {
  const result = await accountsService.getById(req.params.id);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

// ===============================
// CRUD
// ===============================

const create = asyncHandler(async (req, res) => {
  const result = await accountsService.create(req.body);

  return successResponse(
    res,
    result,
    SUCCESS_CODES.SYSTEM_CREATE_SUCCESS,
    undefined,
    201,
  );
});

const update = asyncHandler(async (req, res) => {
  const result = await accountsService.update(req.params.id, req.body);

  return successResponse(res, result, SUCCESS_CODES.ACCOUNT_PROFILE_UPDATED);
});

const remove = asyncHandler(async (req, res) => {
  const result = await accountsService.remove(req.params.id);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_DELETE_SUCCESS);
});

// ===============================
// Business Actions
// ===============================

const activate = asyncHandler(async (req, res) => {
  const result = await accountsService.activate(req.params.id);

  return successResponse(res, result, SUCCESS_CODES.ACCOUNT_ACTIVATE_SUCCESS);
});

const lock = asyncHandler(async (req, res) => {
  const result = await accountsService.lock(req.params.id);

  return successResponse(res, result, SUCCESS_CODES.ACCOUNT_LOCK_SUCCESS);
});

const disable = asyncHandler(async (req, res) => {
  const result = await accountsService.disable(req.params.id);

  return successResponse(res, result, SUCCESS_CODES.ACCOUNT_DISABLE_SUCCESS);
});

const restore = asyncHandler(async (req, res) => {
  const result = await accountsService.restore(req.params.id);

  return successResponse(res, result, SUCCESS_CODES.ACCOUNT_RESTORE_SUCCESS);
});

const changePassword = asyncHandler(async (req, res) => {
  const result = await accountsService.changePassword(
    req.params.id,
    req.body.newPassword,
  );

  return successResponse(res, result, SUCCESS_CODES.ACCOUNT_PASSWORD_CHANGED);
});

const changeRole = asyncHandler(async (req, res) => {
  const result = await accountsService.changeRole(
    req.params.id,
    req.body.roleCode,
    req.user.accountId,
  );

  return successResponse(res, result, SUCCESS_CODES.ACCOUNT_ROLE_CHANGED);
});

module.exports = {
  // Query
  getList,
  getById,

  // CRUD
  create,
  update,
  remove,

  // Business Actions
  activate,
  lock,
  disable,
  restore,

  changePassword,
  changeRole,
};
