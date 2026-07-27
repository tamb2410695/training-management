const { asyncHandler, successResponse } = require("../../utils/helpers");
const roomsService = require("./rooms.service"); // Giả định service xử lý DB tương tự department

const getList = asyncHandler(async (req, res, next) => {
  const queryOptions = req.query;
  const result = await roomsService.getList(queryOptions);
  return successResponse(res, result, "Get list of rooms successful");
});

const getById = asyncHandler(async (req, res, next) => {
  const roomId = req.params.id;
  const result = await roomsService.getById(roomId);
  return successResponse(res, result, "Get room detail successful");
});

const getAvailability = asyncHandler(async (req, res, next) => {
  const roomId = req.params.id;
  const queryOptions = req.query; // Chứa thông tin ngày giờ cần check lịch trống

  const result = await roomsService.checkAvailability(roomId, queryOptions);

  return successResponse(res, result, "Check room availability successful");
});

const create = asyncHandler(async (req, res, next) => {
  const roomData = req.body;
  const result = await roomsService.create(roomData);
  return successResponse(res, result, "Create new room successful", 201);
});

const update = asyncHandler(async (req, res, next) => {
  const roomId = req.params.id;

  // Trích xuất an toàn nếu middleware lưu data sạch vào key roomData độc lập
  const roomData = req.body.roomData || req.body;

  const result = await roomsService.update(roomId, roomData);
  return successResponse(res, result, "Update room successful");
});

const remove = asyncHandler(async (req, res, next) => {
  const roomId = req.params.id;
  await roomsService.remove(roomId);
  return successResponse(res, null, "Remove room successful");
});

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};
