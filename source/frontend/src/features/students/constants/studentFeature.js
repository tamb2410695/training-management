import { buildFeature } from "@/utils";
import { STUDENT_FIELDS } from "./studentFields";
import { STUDENT_CONFIG, STUDENT_WIZARD_CONFIG } from "./studentConfig";
import { resolveStudentRuntime } from "../policies/resolveStudentRuntime";

export const STUDENT_FEATURE = buildFeature({
  fields: STUDENT_FIELDS,
  config: STUDENT_CONFIG,
  wizard: STUDENT_WIZARD_CONFIG,
  resolvePolicy: resolveStudentRuntime
});
