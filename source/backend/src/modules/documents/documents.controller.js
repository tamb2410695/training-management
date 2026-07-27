const { asyncHandler, successResponse } = require("../../utils/helpers");
const documentsService = require("./documents.service");

const getList = asyncHandler(async (req, res, next) => {
  const result = await documentsService.getList(req.query);
  return successResponse(res, result, "Lấy danh sách tài liệu thành công");
});

const getById = asyncHandler(async (req, res, next) => {
  const result = await documentsService.getById(req.params.id);
  return successResponse(res, result, "Lấy thông tin tài liệu thành công");
});

const create = asyncHandler(async (req, res, next) => {
  const staffId = req.user.accountId; 
  const result = await documentsService.create(req.body, req.file, staffId);
  return successResponse(res, result, "Tải lên tài liệu thành công");
});

const update = asyncHandler(async (req, res, next) => {
  const documentId = req.params.id;
  const documentData = req.body;

  const result = await documentsService.update(documentId, documentData);
  return successResponse(res, result, "Cập nhật thông tin tài liệu thành công");
});

const remove = asyncHandler(async (req, res, next) => {
  const result = await documentsService.remove(req.params.id);
  return successResponse(res, result, "Xóa tài liệu thành công");
});

const restore = asyncHandler(async (req, res, next) => {
  const result = await documentsService.restore(req.params.id);
  return successResponse(res, result, "Khôi phục tài liệu thành công");
});

const download = asyncHandler(async (req, res, next) => {
  const fileInfo = await documentsService.download(req.params.id);
  
  return res.download(fileInfo.filePath, fileInfo.originalName);
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
  restore,
  download,
};