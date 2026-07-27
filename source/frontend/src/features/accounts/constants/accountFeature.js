import { buildFeature } from "@/utils";
import { ACCOUNT_FIELDS } from "./accountFields";
import { ACCOUNT_CONFIG, ACCOUNT_WIZARD_CONFIG } from "./accountConfig";

export const ACCOUNT_FEATURE = buildFeature({
  fields: ACCOUNT_FIELDS,
  config: ACCOUNT_CONFIG,
  wizard: ACCOUNT_WIZARD_CONFIG,
});
