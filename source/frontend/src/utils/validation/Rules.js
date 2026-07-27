import { commonRules } from "./rules/common";
import { stringRules } from "./rules/string";
import { numberRules } from "./rules/number";
import { dateRules } from "./rules/date";
import { formatRules } from "./rules/format";
import { enumRules, asyncRules } from "./rules/bussiness"

export const Rules = {
  ...commonRules,
  ...stringRules,
  ...numberRules,
  ...dateRules,
  ...formatRules,
  ...enumRules,
  ...asyncRules,
};
