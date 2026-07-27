const { AppError } = require("../../utils/errors");
const { CLASS_STATUS, ERROR_CODES, ERROR_MESSAGES } = require("../../constants");
const { throwIf, hasField, generateCode } = require("../../utils/helpers");

const classesRepository = require("./classes.repository");
const coursesRepository = require("../courses/courses.repository"); 

const db = require("../../config/database");
const { CLASS_CODE } = require("./classes.constants");
const { withTransaction } = require("../../utils/database");

const getList = async (query, connection = db) => {
  const { data: classes, pagination } = await classesRepository.find(query, connection);
  return { classes, pagination };
};

const getById = async (classId, connection = db) => {
  const targetClass = await classesRepository.findById(classId, connection);
  throwIf(
    !targetClass, 
    AppError, 
    ERROR_CODES.CLASS_NOT_FOUND || "CLASS_NOT_FOUND",
    ERROR_MESSAGES.RESOURCE_NOT_FOUND
  );
  return targetClass;
};

const create = async (classData, connection = db) => {
  return withTransaction(async (txConnection) => {
    // 1. Kiểm tra khóa ngoại xem khóa học gốc có tồn tại hay không
    const course = await coursesRepository.findById(classData.courseId, txConnection);
    throwIf(
      !course, 
      AppError, 
      ERROR_CODES.COURSE_NOT_FOUND || "COURSE_NOT_FOUND"
    );

    // 2. Kiểm tra logic ngày bắt đầu và kết thúc lớp học
    if (new Date(classData.endDate) < new Date(classData.startDate)) {
      throw new AppError(
        ERROR_CODES.INVALID_CLASS_DATES || "INVALID_CLASS_DATES",
        400
      );
    }
    
    // 3. Thiết lập các giá trị mặc định nếu client không truyền lên
    if (!hasField(classData, "classStatus")) {
      classData.classStatus = CLASS_STATUS.PENDING || "PENDING";
    }
    if (!hasField(classData, "maxStudents")) {
      classData.maxStudents = 30;
    }

    // 4. Tiến hành tạo bản ghi để lấy classId sinh mã code
    const createdClass = await classesRepository.create(classData, txConnection);
    throwIf(!createdClass, AppError, ERROR_CODES.INTERNAL_SERVER_ERROR);

    // 5. Sinh mã classCode tự động dựa theo Id vừa sinh ra
    const classCode = generateCode(
      CLASS_CODE.PREFIX,
      createdClass.classId,
      CLASS_CODE.LENGTH
    );

    // 6. Cập nhật mã classCode ngược lại vào db
    const finalClass = await classesRepository.update(
      createdClass.classId,
      { classCode },
      txConnection
    );

    return finalClass;
  });
};

const update = async (classId, classData, connection = db) => {
  return withTransaction(async (txConnection) => {
    const targetClass = await classesRepository.findById(classId, txConnection);
    throwIf(
      !targetClass, 
      AppError, 
      ERROR_CODES.CLASS_NOT_FOUND || "CLASS_NOT_FOUND"
    );

    const updateClassPayload = {};
    const allowedFields = [
      "courseId",
      "startDate",
      "endDate",
      "maxStudents",
      "classStatus"
    ];

    allowedFields.forEach((field) => {
      if (hasField(classData, field)) {
        updateClassPayload[field] = classData[field];
      }
    });

    // Xác thực logic ngày tháng sau khi trộn dữ liệu mới và cũ
    const finalStartDate = updateClassPayload.startDate || targetClass.startDate;
    const finalEndDate = updateClassPayload.endDate || targetClass.endDate;
    if (new Date(finalEndDate) < new Date(finalStartDate)) {
      throw new AppError(
        ERROR_CODES.INVALID_CLASS_DATES || "INVALID_CLASS_DATES",
        400
      );
    }

    // Kiểm tra tính hợp lệ nếu thay đổi khóa ngoại courseId
    if (hasField(updateClassPayload, "courseId")) {
      const course = await coursesRepository.findById(updateClassPayload.courseId, txConnection);
      throwIf(
        !course, 
        AppError, 
        ERROR_CODES.COURSE_NOT_FOUND || "COURSE_NOT_FOUND"
      );
    }

    let updatedClass = null;
    if (Object.keys(updateClassPayload).length > 0) {
      updatedClass = await classesRepository.update(
        classId,
        updateClassPayload,
        txConnection
      );
    }

    throwIf(
      !updatedClass, 
      AppError, 
      ERROR_CODES.NO_CHANGES || "NO_CHANGES"
    );
    return updatedClass;
  });
};

const remove = async (classId, connection = db) => {
  return withTransaction(async (txConnection) => {
    const targetClass = await classesRepository.findById(classId, txConnection);
    throwIf(
      !targetClass, 
      AppError, 
      ERROR_CODES.CLASS_NOT_FOUND || "CLASS_NOT_FOUND"
    );

    // Tránh việc gửi yêu cầu xóa một lớp học đã ở trạng thái DELETED từ trước
    throwIf(
      targetClass.classStatus === (CLASS_STATUS.DELETED || "DELETED"),
      AppError,
      ERROR_CODES.CLASS_CLOSED || "CLASS_CLOSED",
      "Class has already been deleted"
    );

    const result = await classesRepository.remove(classId, txConnection);
    throwIf(
      !result, 
      AppError, 
      ERROR_CODES.NO_CHANGES || "NO_CHANGES"
    );

    return result;
  });
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};