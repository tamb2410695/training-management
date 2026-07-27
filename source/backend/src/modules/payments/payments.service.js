const db = require("../../config/database");
const AppError = require("../../utils/errors");
const { withTransaction } = require("../../utils/database");
const { throwIf } = require("../../utils/helpers");
const { ERROR_MESSAGES, ENROLLMENT_STATUS, PAYMENT_STATUS } = require("../../constants");

const paymentsRepository = require("./payments.repository");
const enrollmentsRepository = require("../enrollments/enrollments.repository");

const getList = async (query, connection = db) => {
  return await paymentsRepository.find(query, connection);
};

const getById = async (paymentId, connection = db) => {
  const payment = await paymentsRepository.findById(paymentId, connection);
  throwIf(!payment, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);
  return payment;
};

const processPayment = async (paymentId, { paymentStatus, paymentMethod, transactionCode }, connection = db) => {
  return withTransaction(async (txConnection) => {
    // 1. Kiểm tra hóa đơn tồn tại
    const payment = await paymentsRepository.findById(paymentId, txConnection);
    throwIf(!payment, AppError.NotFoundError, "Payment record not found");

    // Nếu trạng thái không đổi thì trả về luôn
    if (payment.paymentStatus === paymentStatus) {
      return payment;
    }

    // 2. Cập nhật thông tin thanh toán cho bản ghi PAYMENT
    const updatedPayment = await paymentsRepository.update(
      paymentId, 
      { 
        paymentStatus, 
        paymentMethod, 
        transactionCode,
        paymentDate: paymentStatus === PAYMENT_STATUS.FULLY_PAID ? new Date() : payment.paymentDate
      }, 
      txConnection
    );

    // 3. Tự động cập nhật trạng thái ENROLLMENT tương ứng dựa vào kết quả thanh toán
    let targetEnrollmentStatus = null;

    if (paymentStatus === PAYMENT_STATUS.FULLY_PAID) {
      targetEnrollmentStatus = ENROLLMENT_STATUS.CONFIRMED;
    } else if (paymentStatus === PAYMENT_STATUS.REFUNDED) {
      targetEnrollmentStatus = ENROLLMENT_STATUS.REFUNDED;
      
      // Hoàn tiền đồng nghĩa học viên rút: Khấu trừ lại sĩ số lớp học (-1)
      const enrollment = await enrollmentsRepository.findById(payment.enrollmentId, txConnection);
      if (enrollment) {
        await txConnection.query(
          `UPDATE CLASS SET current_students = GREATEST(0, current_students - 1) WHERE class_id = ?`,
          [enrollment.classId]
        );
      }
    } else if (paymentStatus === PAYMENT_STATUS.FAILED) {
      targetEnrollmentStatus = ENROLLMENT_STATUS.WAITING_FOR_PAYMENT; 
    }

    // 4. Thực thi cập nhật bảng ENROLLMENT nếu có sự thay đổi trạng thái hợp lệ
    if (targetEnrollmentStatus) {
      await enrollmentsRepository.update(
        payment.enrollmentId, 
        { enrollmentStatus: targetEnrollmentStatus }, 
        txConnection
      );
    }

    return updatedPayment;
  }, connection);
};

module.exports = {
  getList,
  getById,
  processPayment,
};