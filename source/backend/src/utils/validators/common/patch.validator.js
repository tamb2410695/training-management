const { ERROR_MESSAGES } = require("../../../constants/index");
const { ensure, pickFields, sanitizeFields } = require("../../helpers/index");

const validateBodyNotEmpty = (body) => {
  ensure(
    body && Object.keys(body).length > 0,
    ERROR_MESSAGES.EMPTY_REQUEST_BODY,
  );
};

const sanitizePatchBody = (body, allowedFields) => {
  const patchData = sanitizeFields(pickFields(body, allowedFields));
  validateBodyNotEmpty(patchData);

  return patchData;
};

module.exports = {
  validateBodyNotEmpty,
  sanitizePatchBody,
};
