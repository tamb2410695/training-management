const { asyncHandler, successResponse } = require("../../../utils/helpers");

const staffCapabilitiesService = require("./capabilities.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await staffCapabilitiesService.getList(queryOptions);
  return successResponse(res, result, "Get list staff capabilities successful");
});

const getByCompositeKey = asyncHandler(async (req, res, next) => {
  // Lấy bộ đôi ID từ params (Ví dụ route: /staff-capabilities/:staffId/:courseId)
  const { staffId, courseId } = req.params;
  const result = await staffCapabilitiesService.getByCompositeKey(staffId, courseId);
  return successResponse(res, result, "Get staff capability successful");
});

const create = asyncHandler(async (req, res, next) => {
  const capabilityData = req.body;
  const result = await staffCapabilitiesService.create(capabilityData);
  return successResponse(res, result, "Assign staff capability successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const { staffId, courseId } = req.params;
  const result = await staffCapabilitiesService.remove(staffId, courseId);
  return successResponse(res, result, "Remove staff capability successful");
});

module.exports = {
  getList,
  getByCompositeKey,
  create,
  remove,
};