const { queryValidator } = require("@/utils");
const { COURSE_CATEGORY_FIELDS } = require("./courseCategories.constants");

const validateCourseCategoryFormats = (data) => {
  if (!data) return;

  queryValidator(
    data,
    COURSE_CATEGORY_FIELDS.QUERY.SEARCHABLE,
    COURSE_CATEGORY_FIELDS.QUERY.SORTABLE,
  );
};

module.exports = {
  validateCourseCategoryFormats,
};
