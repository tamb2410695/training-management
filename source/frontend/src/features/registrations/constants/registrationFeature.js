import { buildFeature } from "@/utils";
import { REGISTRATION_FIELDS } from "./registrationFields";
import { REGISTRATION_CONFIG } from "./registrationConfig";
import { resolveRegistrationRuntime } from "../policies/resolveRegistrationRuntime";

export const REGISTRATION_FEATURE = buildFeature({
  fields: REGISTRATION_FIELDS,
  config: REGISTRATION_CONFIG,
  resolvePolicy: resolveRegistrationRuntime
});
