const db = require("@/config/database");
const AppError = require("@/utils/errors");
const { ERROR_MESSAGES, CODE_PREFIX } = require("@/constants");
const { throwIf, hasField, generateCode } = require("@/utils/helpers");

const courseCategoriesRepository = require("./courseCategories.repository");
const { validateCourseCategoryFormats } = require("./courseCategories.validator");
const { formatCourseCategoryQuery, formatCourseCategoryData } = require("./courseCategories.formatter");

const GENERAL_FIELDS = ["categoryName", "description"];

const getList = async (query, connection = db) => {
  query = formatCourseCategoryQuery(query);
  validateCourseCategoryFormats(query);

  const { data: categories, pagination } =
    await courseCategoriesRepository.find(query, connection);

  return {
    categories,
    pagination,
  };
};

const getById = async (categoryId, connection = db) => {
  const category = await courseCategoriesRepository.findById(
    categoryId,
    connection,
  );
  throwIf(!category, AppError.NotFoundError, "Course category not found");

  return category;
};

const create = async (categoryData, connection = db) => {
  categoryData = formatCourseCategoryData(categoryData);
  validateCourseCategoryFormats(categoryData);

  const { existedCategory } = categoryData;

  if (existedCategory) {
    const existed = await courseCategoriesRepository.findByCode(
      existedCategory,
      connection,
    );

    throwIf(existed, AppError.ConflictError, "Category code already exists");
  }

  const createdCategory = await courseCategoriesRepository.create(
    categoryData,
    connection,
  );

  throwIf(!createdCategory, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

  const categoryCode = generateCode(
    CODE_PREFIX.CATEGORY,
    createdCategory.categoryId,
  );

  const updatedCategory = await update(
    createdCategory.categoryId,
    { categoryCode },
    connection,
  );

  return updatedCategory;
};

const resolveCategoryCodeUpdate = async (
  category,
  categoryData,
  updateData,
  connection = db,
) => {
  if (!hasField(categoryData, "categoryCode")) return;

  const existed = await courseCategoriesRepository.findByCode(
    categoryData.categoryCode,
    connection,
  );

  throwIf(
    existed && existed.categoryId !== category.categoryId,
    AppError.ConflictError,
    "Category code already exists",
  );

  updateData.categoryCode = categoryData.categoryCode;
};

const buildUpdateCategoryData = async (
  category,
  categoryData,
  connection = db,
) => {
  const updateData = {};

  await resolveCategoryCodeUpdate(
    category,
    categoryData,
    updateData,
    connection,
  );

  GENERAL_FIELDS.forEach((field) => {
    if (hasField(categoryData, field)) {
      updateData[field] = categoryData[field];
    }
  });

  throwIf(
    Object.keys(updateData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  return updateData;
};

const update = async (categoryId, categoryData, connection = db) => {
  categoryData = formatCourseCategoryData(categoryData);
  validateCourseCategoryFormats(categoryData);

  const category = await getById(categoryId, connection);

  const updateData = await buildUpdateCategoryData(
    category,
    categoryData,
    connection,
  );

  const updatedCategory = await courseCategoriesRepository.update(
    categoryId,
    updateData,
    connection,
  );

  throwIf(!updatedCategory, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

  return updatedCategory;
};

const remove = async (categoryId, connection = db) => {
  await getById(categoryId, connection);

  const deletedCategory = await courseCategoriesRepository.remove(
    categoryId,
    connection,
  );

  throwIf(!deletedCategory, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

  return deletedCategory;
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};
