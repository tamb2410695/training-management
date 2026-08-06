import { buildFeature } from "@/utils";
import { CLASS_FIELDS } from "./classesFields";
import { CLASS_CONFIG, CLASS_WIZARD } from "./classesConfig";
import { resolveClasseRuntime } from "../policies/resolveClasseRuntime";

export const CLASS_FEATURE = buildFeature({
  fields: CLASS_FIELDS,
  config: CLASS_CONFIG,
  wizard: CLASS_WIZARD,
  resolvePolicy: resolveClasseRuntime
});
