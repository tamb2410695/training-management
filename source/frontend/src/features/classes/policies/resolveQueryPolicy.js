import { CLASS_STATUS } from "../constants";

const CLASS_FILTER_OPTIONS = {
  options: [...CLASS_STATUS.filterOptions((item) => item.filterable)],
};

export function resolveQueryPolicy(context) {
  return {
    filterFields: { classesStatus: CLASS_FILTER_OPTIONS },
  };
}
