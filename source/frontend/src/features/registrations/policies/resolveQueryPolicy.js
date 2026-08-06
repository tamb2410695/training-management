import { REGISTRATION_STATUS } from "../constants";

const REGISTRATION_FILTER_OPTIONS = {
  options: [...REGISTRATION_STATUS.filterOptions((item) => item.filterable)],
};

export function resolveQueryPolicy(context) {
  return {
    filterFields: { registrationStatus: REGISTRATION_FILTER_OPTIONS },
  };
}
