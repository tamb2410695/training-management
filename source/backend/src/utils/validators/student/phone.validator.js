const { ensure } = require("../../helpers/index");
const { ERROR_MESSAGES } = require("../../../constants/index");

const validatePhone = (phone) => {
  const regex = /^(0|\+84)[0-9]{9}$/;
  ensure(regex.test(phone), ERROR_MESSAGES.INVALID_PHONE);
};

module.exports = {
  validatePhone,
};
``