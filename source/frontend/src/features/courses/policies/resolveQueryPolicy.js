import { COURSE_STATUS } from "../constants";

const COURSE_FILTER_OPTIONS = {
  options: [...COURSE_STATUS.filterOptions((item) => item.filterable)],
};

export function resolveQueryPolicy(context) {
  return {
    filterFields: { courseStatus: COURSE_FILTER_OPTIONS },
  };
}
