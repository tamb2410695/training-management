import { buildViewSchema } from "../form/buildViewSchema";
import { buildQuery } from "../query/buildQuery";
import { buildTable } from "../table/buildTable";

export function buildFeature({ fields, config, wizard }) {
  return {
    config,
    fields,
    table: buildTable(fields, config),
    query: buildQuery(fields, config),
    view: buildViewSchema(fields),
    wizard,
  };
}
