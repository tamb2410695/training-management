const { ACCOUNT_STATUS, SUCCESS_CODES } = require("../../constants");
const { asyncHandler, successResponse } = require("../../utils/helpers");

const accountsService = require("./accounts.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await accountsService.getList(queryOptions);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await accountsService.getById(id);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const create = asyncHandler(async (req, res, next) => {
  const accountData = req.body;
  const result = await accountsService.create(accountData);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_CREATE_SUCCESS, undefined, 201);
});

const update = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const accountData = req.body;
  const result = await accountsService.update(id, accountData);
  return successResponse(res, result, SUCCESS_CODES.ACCOUNT_PROFILE_UPDATED);
});

const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await accountsService.remove(id);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_DELETE_SUCCESS);
});

const restore = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await accountsService.restore(id);
  return successResponse(res, result, SUCCESS_CODES.SYSTEM_OPERATION_SUCCESS);
});

const activate = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await accountsService.updateStatus(id, ACCOUNT_STATUS.ACTIVE);
  return successResponse(res, result, SUCCESS_CODES.ACCOUNT_STATUS_UPDATED);
});

const lock = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await accountsService.updateStatus(id, ACCOUNT_STATUS.LOCKED);
  return successResponse(res, result, SUCCESS_CODES.ACCOUNT_STATUS_UPDATED);
});

const disable = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await accountsService.updateStatus(id, ACCOUNT_STATUS.DISABLED);
  return successResponse(res, result, SUCCESS_CODES.ACCOUNT_STATUS_UPDATED);
});

const pending = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await accountsService.updateStatus(id, ACCOUNT_STATUS.PENDING);
  return successResponse(res, result, SUCCESS_CODES.ACCOUNT_STATUS_UPDATED);
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
  activate,
  lock,
  disable,
  pending,
  restore
};