import { buildQuery } from "@/utils/builders";

export function resolveQuery({ feature, policy }) {
  const query = buildQuery({
    fields: feature.fields,
    config: feature.config,
    overrides: policy.query,
  });
  return query;
}
