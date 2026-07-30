import { ACCOUNT_STATUS } from "../constants";

const ACCOUNT_FILTER_OPTIONS = {
  options: [...ACCOUNT_STATUS.filterOptions((item) => item.filterable)],
};

export function resolveQueryPolicy(context) {
  return {
    filterFields: { accountStatus: ACCOUNT_FILTER_OPTIONS },
  };
}
