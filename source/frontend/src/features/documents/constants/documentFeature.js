import { buildFeature } from "@/utils";
import { DOCUMENT_FIELDS } from "./documentFields";
import { DOCUMENT_CONFIG, DOCUMENT_WIZARD } from "./documentConfig";
import { resolveDocumentRuntime } from "../policies/resolveDocumentRuntime";

export const DOCUMENT_FEATURE = buildFeature({
  fields: DOCUMENT_FIELDS,
  config: DOCUMENT_CONFIG,
  wizard: DOCUMENT_WIZARD,
  resolvePolicy: resolveDocumentRuntime
});
