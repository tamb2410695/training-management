import { buildFeature } from "@/utils";
import { ENROLLMENT_FIELDS } from "./enrollmentFields";
import { ENROLLMENT_CONFIG, ENROLLMENT_WIZARD } from "./enrollmentConfig";
import { resolveEnrollmentRuntime } from "../policies/resolveEnrollmentRuntime";

export const ENROLLMENT_FEATURE = buildFeature({
  fields: ENROLLMENT_FIELDS,
  config: ENROLLMENT_CONFIG,
  wizard: ENROLLMENT_WIZARD,
  resolvePolicy: resolveEnrollmentRuntime
});
