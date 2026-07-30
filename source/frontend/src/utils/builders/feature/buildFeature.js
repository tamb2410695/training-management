import { buildDefaultValues } from "../form";
import { buildViewSchema } from "../form/buildViewSchema";
import { buildTable } from "../table/buildTable";
import { buildValidationSchema } from "@/utils/validation/buildValidationSchema";

export function buildFeature({ fields, config, wizard, resolvePolicy }) {
  const validation = {
    create: buildValidationSchema(fields),
    update: buildValidationSchema(fields, "update"),
  };

  const forms = {
    defaultValues: buildDefaultValues(fields),
  };

  return {
    config,
    fields,
    forms,
    table: buildTable(fields, config),
    view: buildViewSchema(fields),
    wizard,
    validation,
    resolvePolicy,
  };
}
