const { asyncHandler, successResponse } = require("../../utils/helpers");
const paymentsService = require("./payments.service");

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await paymentsService.getList(queryOptions);
  return successResponse(res, result, "Get list of payments successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const paymentId = req.params.id;
  const result = await paymentsService.getById(paymentId);
  return successResponse(res, result, "Get payment successful");
});

const create = asyncHandler(async (req, res, next) => {
  const { studentId, classId } = req.body;
  const result = await paymentsService.create({ studentId, classId });
  return successResponse(res, result, "Student enrolled successfully");
});

const updateStatus = asyncHandler(async (req, res, next) => {
  const paymentId = req.params.id;
  const { paymentStatus } = req.body;
  const result = await paymentsService.updateStatus(paymentId, paymentStatus);
  return successResponse(res, result, "Update payment status successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const paymentId = req.params.id;
  const result = await paymentsService.remove(paymentId);
  return successResponse(res, result, "Soft deleted payment successful");
});

module.exports = {
  getList,
  getById,
  create,
  updateStatus,
  remove,
};