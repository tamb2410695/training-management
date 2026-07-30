import { buildFeature } from "@/utils";
import { DEPARTMENT_FIELDS } from "./departmentFields";
import { DEPARTMENT_CONFIG, DEPARTMENT_WIZARD_CONFIG } from "./departmentConfig";
import { resolveDepartmentRuntime } from "../policies/resolveDepartmentRuntime";

export const DEPARTMENT_FEATURE = buildFeature({
  fields: DEPARTMENT_FIELDS,
  config: DEPARTMENT_CONFIG,
  wizard: DEPARTMENT_WIZARD_CONFIG,
  resolvePolicy: resolveDepartmentRuntime
});
