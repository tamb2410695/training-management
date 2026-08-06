const { asyncHandler, successResponse } = require("@/utils/helpers");
const courseCategoriesService = require("./courseCategories.service");

const getList = asyncHandler(async (req, res) => {
  const result = await courseCategoriesService.getList(req.query);

  return successResponse(
    res,
    result,
    "Get list of course categories successful",
  );
});

const getById = asyncHandler(async (req, res) => {
  const result = await courseCategoriesService.getById(req.params.id);
  return successResponse(res, result, "Get course category details successful");
});

const create = asyncHandler(async (req, res) => {
  const result = await courseCategoriesService.create(req.body);
  return successResponse(res, result, "Create course category successful");
});

const update = asyncHandler(async (req, res) => {
  const result = await courseCategoriesService.update(req.params.id, req.body);
  return successResponse(res, result, "Update course category successful");
});

const remove = asyncHandler(async (req, res) => {
  const result = await courseCategoriesService.remove(req.params.id);
  return successResponse(res, result, "Remove course category successful");
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};
