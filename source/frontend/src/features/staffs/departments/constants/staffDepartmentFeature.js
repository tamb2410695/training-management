import { buildFeature } from "@/utils";
import { STAFF_DEPARTMENT_FIELDS } from "./staffDepartmentFields";
import { STAFF_DEPARTMENT_CONFIG, STAFF_DEPARTMENT_WIZARD_CONFIG } from "./staffDepartmentConfig";
import { resolveStudentRuntime } from "../policies/resolveStaffDepartmentRuntime";

export const STAFF_DEPARTMENT_FEATURE = buildFeature({
  fields: STAFF_DEPARTMENT_FIELDS,
  config: STAFF_DEPARTMENT_CONFIG,
  wizard: STAFF_DEPARTMENT_WIZARD_CONFIG,
  resolvePolicy: resolveStudentRuntime
});
