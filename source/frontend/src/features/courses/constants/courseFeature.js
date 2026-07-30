import { buildFeature } from "@/utils";
import { COURSE_FIELDS } from "./courseFields";
import { COURSE_CONFIG, COURSE_WIZARD_CONFIG } from "./courseConfig";
import { resolveCoursesRuntime } from "../policies/resolveCoursesRuntime";

export const COURSE_FEATURE = buildFeature({
  fields: COURSE_FIELDS,
  config: COURSE_CONFIG,
  wizard: COURSE_WIZARD_CONFIG,
  resolvePolicy: resolveCoursesRuntime
});
