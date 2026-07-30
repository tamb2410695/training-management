import { buildTable } from "@/utils/builders"

export function resloveTableRuntime({feature, policy, context}) {
  const table = buildTable(feature.fields, feature.config, policy.overrides, context)
  return
}