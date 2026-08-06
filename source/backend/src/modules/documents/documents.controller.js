const { SUCCESS_CODES } = require("@/constants");

const { asyncHandler, successResponse } = require("@/utils/helpers");

const documentsService = require("./documents.service");

// ===============================
// Query
// ===============================

const getList = asyncHandler(async (req, res) => {
  const result = await documentsService.getList(req.query);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

const getById = asyncHandler(async (req, res) => {
  const result = await documentsService.getById(req.params);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_FETCH_SUCCESS);
});

// ===============================
// CRUD
// ===============================

const upload = asyncHandler(async (req, res) => {
  const result = await documentsService.upload(
    req.body,
    req.file,
    req.user.staffId,
  );

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_CREATE_SUCCESS, 201);
});

const update = asyncHandler(async (req, res) => {
  const result = await documentsService.update(
    req.params,
    req.body,
    req.user.staffId,
  );

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_UPDATE_SUCCESS);
});

const remove = asyncHandler(async (req, res) => {
  const result = await documentsService.remove(req.params, req.user);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_DELETE_SUCCESS);
});

// ===============================
// Business Actions
// ===============================

const restore = asyncHandler(async (req, res) => {
  const result = await documentsService.restore(req.params);

  return successResponse(res, result, SUCCESS_CODES.SYSTEM_UPDATE_SUCCESS);
});

const download = asyncHandler(async (req, res) => {
  const file = await documentsService.download(req.params, req.user);

  res.setHeader("Content-Type", file.mimeType);

  return res.download(file.path, file.fileName);
});

module.exports = {
  getList,
  getById,

  upload,
  update,
  remove,

  restore,
  download,
};
