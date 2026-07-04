const AppError = require("../../utils/errors");
const { ROLES, ERROR_MESSAGES } = require("../../constants");
const { AUTH_FIELDS } = require("./auth.constants");

const {
  formatNumericId,
  formatAuthData
} = require("../../utils/formatters");

const { 
  pickFields, 
  sanitizeFields, 
  hasField, 
  throwIf 
} = require("../../utils/helpers");

const {
  validateEnum,
  validateId,
  validateEmail,
  validatePassword,
  validateUsername,
  validateAllowedFields,
  validateRequiredFields,
} = require("../../utils/validators");

const validateAuthFormats = (authData) => {
  if (!authData) return;

  if (hasField(authData, "username")) {
    validateUsername(authData.username);
  }

  if (hasField(authData, "email")) {
    validateEmail(authData.email);
  }

  if (hasField(authData, "roleCode")) {
    validateEnum(authData.roleCode, Object.values(ROLES), "roleCode");
  }

  // if (hasField(authData, "password")) {
  //   validatePassword(authData.password);
  // }

  if (hasField(authData, "newPassword")) {
    validatePassword(authData.newPassword);
  }
};

const validateRegister = (body) => {
  validateAllowedFields(body, AUTH_FIELDS.BODY.REGISTER);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, AUTH_FIELDS.BODY.REGISTER)
  );
  validateRequiredFields(sanitizedData, AUTH_FIELDS.REQUIRED.REGISTER);

  const formattedData = formatAuthData(sanitizedData);
  validateAuthFormats(formattedData);
  return formattedData;
};

const validateLogin = (body) => {
  
  validateAllowedFields(body, AUTH_FIELDS.BODY.LOGIN);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, AUTH_FIELDS.BODY.LOGIN)
  );
  validateRequiredFields(sanitizedData, AUTH_FIELDS.REQUIRED.LOGIN);
  const formattedData = formatAuthData(sanitizedData);
  validateAuthFormats(formattedData);
  return formattedData;
};

const validateRefresh = (body) => {
  validateAllowedFields(body, AUTH_FIELDS.BODY.REFRESH);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, AUTH_FIELDS.BODY.REFRESH)
  );
  validateRequiredFields(sanitizedData, AUTH_FIELDS.REQUIRED.REFRESH);

  const formattedData = formatAuthData(sanitizedData);
  validateAuthFormats(formattedData);
  return formattedData;
};

const validateChangePassword = (body) => {
  validateAllowedFields(body, AUTH_FIELDS.BODY.CHANGE_PASSWORD);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, AUTH_FIELDS.BODY.CHANGE_PASSWORD)
  );
  validateRequiredFields(sanitizedData, AUTH_FIELDS.REQUIRED.CHANGE_PASSWORD);

  const formattedData = formatAuthData(sanitizedData);
  validateAuthFormats(formattedData);
  return formattedData;
};

const validateForgotPassword = (body) => {
  validateAllowedFields(body, AUTH_FIELDS.BODY.FORGOT_PASSWORD);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, AUTH_FIELDS.BODY.FORGOT_PASSWORD)
  );
  validateRequiredFields(sanitizedData, AUTH_FIELDS.REQUIRED.FORGOT_PASSWORD);

  const formattedData = formatAuthData(sanitizedData);
  validateAuthFormats(formattedData);
  return formattedData;
};

const validateResetPassword = (body) => {
  validateAllowedFields(body, AUTH_FIELDS.BODY.RESET_PASSWORD);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, AUTH_FIELDS.BODY.RESET_PASSWORD)
  );
  validateRequiredFields(sanitizedData, AUTH_FIELDS.REQUIRED.RESET_PASSWORD);

  const formattedData = formatAuthData(sanitizedData);
  validateAuthFormats(formattedData);
  return formattedData;
};

module.exports = {
  validateRegister,
  validateLogin,
  validateRefresh,
  validateChangePassword,
  validateForgotPassword,
  validateResetPassword,
};