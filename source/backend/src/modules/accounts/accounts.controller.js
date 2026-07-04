const { ACCOUNT_STATUS } = require("../../constants");
const { asyncHandler, successResponse } = require("../../utils/helpers");

const accountsService = require("./accounts.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await accountsService.getList(queryOptions);
  return successResponse(res, result, "Get list successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const accountId = req.params;
  const result = await accountsService.getById(accountId);
  return successResponse(res, result, "Get account successful");
});

const create = asyncHandler(async (req, res, next) => {
  const accountData = req.body;
  const result = await accountsService.create(accountData);
  return successResponse(res, result, "Create new account successful");
});

const update = asyncHandler(async (req, res, next) => {
  const { accountId, accountData } = req.validatedData;
  const result = await accountsService.update(accountId, accountData);
  return successResponse(res, result, "Update account successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const accountId = req.params;
  const result = await accountsService.remove(accountId);
  return successResponse(res, result, "Remove account successful");
});

// const restore = asyncHandler(async (req, res, next) => {
//   const accountId = req.params.id;
//   const result = await accountsService.restore(accountId);
//   return successResponse(res, result, "Remove account successful");
// });

const activate = asyncHandler(async (req, res, next) => {
  const accountId = req.params;
  const result = await accountsService.updateStatus(accountId, ACCOUNT_STATUS.ACTIVE);
  return successResponse(res, result, "Account activated successfully");
});

const lock = asyncHandler(async (req, res, next) => {
  const accountId = req.params;
  const result = await accountsService.updateStatus(accountId, ACCOUNT_STATUS.LOCKED);
  return successResponse(res, result, "Account locked successfully");
});

const disable = asyncHandler(async (req, res, next) => {
  const accountId = req.params;
  const result = await accountsService.updateStatus(accountId, ACCOUNT_STATUS.DISABLED);
  return successResponse(res, result, "Account disabled successfully");
});

const pending = asyncHandler(async (req, res, next) => {
  const accountId = req.params;
  const result = await accountsService.updateStatus(accountId, ACCOUNT_STATUS.PENDING);
  return successResponse(res, result, "Account status changed to pending");
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
  // restore
};
