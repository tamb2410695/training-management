import { buildFeature } from "@/utils";
import { COURSE_FIELDS } from "./courseFields";
import { COURSE_CONFIG } from "./courseConfig";
import { resolveCourseRuntime } from "../policies/resolveCourseRuntime";

export const COURSE_FEATURE = buildFeature({
  fields: COURSE_FIELDS,
  config: COURSE_CONFIG,
  resolvePolicy: resolveCourseRuntime
});
