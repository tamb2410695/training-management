import { ENROLLMENT_STATUS } from "../constants";

const ENROLLMENT_FILTER_OPTIONS = {
  options: [...ENROLLMENT_STATUS.filterOptions((item) => item.filterable)],
};

export function resolveQueryPolicy(context) {
  return {
    filterFields: { enrollmentStatus: ENROLLMENT_FILTER_OPTIONS },
  };
}
