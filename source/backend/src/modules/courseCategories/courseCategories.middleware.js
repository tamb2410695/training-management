const { sanitizeFields, pickFields } = require("@/utils/helpers");
const { validateAllowedFields } = require("@/utils/validators/request/requestFields.validator");
const { COURSE_CATEGORY_FIELDS } = require("./courseCategories.constants");
const { formatCourseCategoryQuery } = require("./courseCategories.formatter");
const { validateCourseCategoryFormats } = require("./courseCategories.validator");
const { formatNumericId } = require("@/utils/formatters/input");
const { validateId } = require("@/utils/validators/common/id.validator");

const getList = (query) => {
  validateAllowedFields(query, COURSE_CATEGORY_FIELDS.QUERY.ALLOWED_KEYS);

  const rawQueryData = sanitizeFields(
    pickFields(query, COURSE_CATEGORY_FIELDS.QUERY.ALLOWED_KEYS),
  );

  return formatCourseCategoryQuery(rawQueryData);
};

const getById = (params) => {
  const categoryId = formatNumericId(params.id);
  validateId(categoryId);

  return categoryId;
};

const create = (body) => {
  validateAllowedFields(body, COURSE_CATEGORY_FIELDS.BODY.CREATE);

  const sanitizedData = sanitizeFields(
    pickFields(body, COURSE_CATEGORY_FIELDS.BODY.CREATE),
  );

  validateRequiredFields(
    sanitizedData,
    COURSE_CATEGORY_FIELDS.REQUIRED.CREATE,
  );

  const categoryData = formatCourseCategoryData(sanitizedData);

  validateCourseCategoryFormats(categoryData);

  return categoryData;
};

const update = (params, body) => {
  const categoryId = formatNumericId(params.id);
  validateId(categoryId);

  validateAllowedFields(body, COURSE_CATEGORY_FIELDS.BODY.UPDATE);

  const sanitizedData = sanitizeFields(
    pickFields(body, COURSE_CATEGORY_FIELDS.BODY.UPDATE),
  );

  const categoryData = formatCourseCategoryData(sanitizedData);

  throwIf(
    !categoryData || Object.keys(categoryData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  validateCourseCategoryFormats(categoryData);

  return {
    params: categoryId,
    categoryData,
  };
};

const remove = (params) => {
  const categoryId = formatNumericId(params.id);
  validateId(categoryId);

  return categoryId;
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};