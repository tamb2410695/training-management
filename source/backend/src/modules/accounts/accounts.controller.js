const { asyncHandler, successResponse } = require("../../utils/helpers");

const accountsService = require("./accounts.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await accountsService.getList(queryOptions);
  return successResponse(res, result, "Get list successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const accountId = req.params.id;
  const result = await accountsService.getById(accountId);
  return successResponse(res, result, "Get account successful");
});

const create = asyncHandler(async (req, res, next) => {
  const accountData = req.body;
  const result = await accountsService.create(accountData);
  return successResponse(res, result, "Create new account successful");
});

const update = asyncHandler(async (req, res, next) => {
  const accountId = req.params.id;
  const accountData = req.body;
  const result = await accountsService.update(accountId, accountData);
  return successResponse(res, result, "Update account successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const accountId = req.params.id;
  const result = await accountsService.remove(accountId);
  return successResponse(res, result, "Remove account successful");
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};
