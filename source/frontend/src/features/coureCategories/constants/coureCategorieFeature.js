import { buildFeature } from "@/utils";
import { COURSE_CATEGORY_FIELDS } from "./coureCategorieFields";
import { COURSE_CATEGORY_CONFIG } from "./coureCategorieConfig";
import { resolveCoureCategorieRuntime } from "../policies/resolveCoureCategorieRuntime";

export const COURECATEGORIE_FEATURE = buildFeature({
  fields: COURSE_CATEGORY_FIELDS,
  config: COURSE_CATEGORY_CONFIG,
  resolvePolicy: resolveCoureCategorieRuntime
});
