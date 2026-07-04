const db = require("../../config/database");
const AppError = require("../../utils/errors");
const { throwIf } = require("../../utils/helpers");
const { ERROR_MESSAGES } = require("../../constants");
const roomsRepository = require("./rooms.repository");

// =========================================================================
// 1. GET LIST ROOMS
// =========================================================================
const getList = async (query, connection = db) => {
  return await roomsRepository.find(query, connection);
};

// =========================================================================
// 2. GET ROOM BY ID
// =========================================================================
const getById = async (roomId, connection = db) => {
  const room = await roomsRepository.findById(roomId, connection);

  throwIf(
    !room,
    AppError.NotFoundError,
    ERROR_MESSAGES.ROOM_NOT_FOUND || "Room not found",
  );

  return room;
};

// =========================================================================
// 3. CREATE ROOM
// =========================================================================
const create = async (roomData, connection = db) => {
  const { roomCode } = roomData;

  // Kiểm tra trùng lặp mã phòng ban/phòng học (uq_room_room_code)
  const existedRoom = await roomsRepository.findByCode(roomCode, connection);
  throwIf(
    existedRoom,
    AppError.ConflictError,
    "Room code already exists",
  );

  const createdRoom = await roomsRepository.create(roomData, connection);
  throwIf(
    !createdRoom,
    AppError.ConflictError,
    ERROR_MESSAGES.NO_CHANGES,
  );

  return createdRoom;
};

// =========================================================================
// 4. UPDATE ROOM
// =========================================================================
const update = async (roomId, roomData, connection = db) => {
  // 1. Đảm bảo phòng học tồn tại trước khi cập nhật
  await getById(roomId, connection);

  if (roomData.roomCode) {
    const existedRoom = await roomsRepository.findByCode(
      roomData.roomCode,
      connection,
    );
    throwIf(
      existedRoom && existedRoom.roomId !== roomId,
      AppError.ConflictError,
      "New room code is already assigned to another room",
    );
  }

  const updatedRoom = await roomsRepository.update(
    roomId,
    roomData,
    connection,
  );
  throwIf(
    !updatedRoom,
    AppError.ConflictError,
    ERROR_MESSAGES.NO_CHANGES,
  );

  return updatedRoom;
};

// =========================================================================
// 5. REMOVE ROOM (Hard Delete bắt lỗi ràng buộc giống hệt Department)
// =========================================================================
const remove = async (roomId, connection = db) => {
  const room = await getById(roomId, connection);

  const isDeleted = await roomsRepository.remove(roomId, connection);
  throwIf(
    !isDeleted,
    AppError.ConflictError,
    "Cannot delete room because it is currently linked to existing schedules",
  );

  return isDeleted;
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};