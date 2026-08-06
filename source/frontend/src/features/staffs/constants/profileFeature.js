import { buildFeature } from "@/utils";
import { STAFF_PROFILE_FIELDS } from "./profileFields";
import { STAFF_PROFILE_CONFIG, STAFF_PROFILE_WIZARD_CONFIG } from "./profileConfig";
import { resolveStudentRuntime } from "../policies/resolveProfileRuntime";

export const STAFF_PROFILE_FEATURE = buildFeature({
  fields: STAFF_PROFILE_FIELDS,
  config: STAFF_PROFILE_CONFIG,
  wizard: STAFF_PROFILE_WIZARD_CONFIG,
  resolvePolicy: resolveStudentRuntime
});
