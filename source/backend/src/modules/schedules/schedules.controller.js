const { asyncHandler, successResponse } = require("../../utils/helpers");
const certificatesService = require("./certificates.service");

const getList = asyncHandler(async (req, res, next) => {
  const result = await certificatesService.getList(req.query);
  return successResponse(res, result, "Get list of certificates successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const result = await certificatesService.getById(req.params.id);
  return successResponse(res, result, "Get certificate detail successful");
});

const create = asyncHandler(async (req, res, next) => {
  const { enrollmentId } = req.body;
  const result = await certificatesService.create({ enrollmentId });
  return successResponse(res, result, "Certificate issued successfully");
});

const updateStatus = asyncHandler(async (req, res, next) => {
  const result = await certificatesService.updateStatus(req.params.id, req.body.certificateStatus);
  return successResponse(res, result, "Certificate status updated successfully");
});

module.exports = {
  getList,
  getById,
  create,
  updateStatus,
};