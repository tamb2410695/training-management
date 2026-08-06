const { BadRequestError } = require("../../errors");
const { ERROR_CODES, ERROR_MESSAGES } = require("../../../constants");
const { pickFields, sanitizeFields, throwIf } = require("../../helpers");

const validateBodyNotEmpty = (body) => {
  throwIf(
    !body || Object.keys(body).length === 0,
    BadRequestError,
    ERROR_CODES.NO_VALID_FIELDS,
    ERROR_MESSAGES.NO_VALID_FIELDS
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