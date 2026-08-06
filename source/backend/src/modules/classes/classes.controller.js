const { SUCCESS_CODES } = require("@/constants");

const {
  asyncHandler,

  successResponse,
} = require("@/utils/helpers");

const classesService = require("./classes.service");

// ===============================
// Query
// ===============================

const getList = asyncHandler(async (req, res) => {
  const result = await classesService.getList(req.query);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.SYSTEM_FETCH_SUCCESS,
  );
});

const getById = asyncHandler(async (req, res) => {
  const result = await classesService.getById(req.params.id);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.SYSTEM_FETCH_SUCCESS,
  );
});

// ===============================
// CRUD
// ===============================

const create = asyncHandler(async (req, res) => {
  const result = await classesService.create(req.body);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.SYSTEM_CREATE_SUCCESS,

    201,
  );
});

const update = asyncHandler(async (req, res) => {
  const result = await classesService.update(
    req.params.id,

    req.body,
  );

  return successResponse(
    res,

    result,

    SUCCESS_CODES.SYSTEM_UPDATE_SUCCESS,
  );
});

const remove = asyncHandler(async (req, res) => {
  const result = await classesService.remove(req.params.id);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.SYSTEM_DELETE_SUCCESS,
  );
});

// ===============================
// Business Actions
// ===============================

const assignInstructor = asyncHandler(async (req, res) => {
  const result = await classesService.assignInstructor(
    req.params.id,

    req.body.teacherId,
  );

  return successResponse(
    res,

    result,

    SUCCESS_CODES.CLASS_INSTRUCTOR_ASSIGNED,
  );
});

const open = asyncHandler(async (req, res) => {
  const result = await classesService.open(req.params.id);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.CLASS_OPENED,
  );
});

const start = asyncHandler(async (req, res) => {
  const result = await classesService.start(req.params.id);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.CLASS_STARTED,
  );
});

const complete = asyncHandler(async (req, res) => {
  const result = await classesService.complete(req.params.id);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.CLASS_COMPLETED,
  );
});

const cancel = asyncHandler(async (req, res) => {
  const result = await classesService.cancel(req.params.id);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.CLASS_CANCELLED,
  );
});

// ===============================
// Support
// ===============================

const getCapacity = asyncHandler(async (req, res) => {
  const result = await classesService.getCapacity(req.params.id);

  return successResponse(
    res,

    result,

    SUCCESS_CODES.SYSTEM_FETCH_SUCCESS,
  );
});

module.exports = {
  // Query
  getList,
  getById,

  // CRUD
  create,
  update,
  remove,

  // Business Actions
  assignInstructor,
  open,
  start,
  complete,
  cancel,

  // Support
  getCapacity,
};
