import { QUERY_DEFAULTS } from "@/constants";
import { buildFilterFields } from "./buildFilterFields";
import { buildSearchFields } from "./buildSearchFields";
import { buildSortFields } from "./buildSortFields";

export function buildDefaultQuery(config = {}) {
  return {
    ...structuredClone(QUERY_DEFAULTS),
    sortBy: config.defaultSort?.field ?? "",
    sortOrder: config.defaultSort?.order ?? "desc",
    ...(config.defaultFilters ?? {}),
  };
}

export function buildQuery(fields, config = {}) {
  return {
    searchableFields: buildSearchFields(fields),
    sortableFields: buildSortFields(fields),
    filterFields: buildFilterFields(fields),
    defaultQuery: buildDefaultQuery(config),
  };
}

export function serializeQuery(data, options = {}) {
  const { arrayFormat = "repeat" } = options;

  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        params.append(
          arrayFormat === "brackets" ? `${key}[]` : key,
          String(item),
        );
      });

      return;
    }

    params.append(key, String(value));
  });

  return params.toString();
}
