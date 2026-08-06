import { DOCUMENT_STATUS } from "../constants";

const DOCUMENT_FILTER_OPTIONS = {
  options: [...DOCUMENT_STATUS.filterOptions((item) => item.filterable)],
};

export function resolveQueryPolicy(context) {
  return {
    filterFields: { documentStatus: DOCUMENT_FILTER_OPTIONS },
  };
}
