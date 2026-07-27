
export function buildViewSchema(fields = {}) {
  return Object.values(fields)
    .filter((field) => field.view?.visible !== false)
    .map((field) => ({
      key: field.key,
      label: field.label,
      type: field.type,
      component: field.view?.component ?? field.type,
      valueKey: field.key,
      options: field.enum?.options ?? [],
      format: field.view?.format ?? null,
      showTime: field.view?.showTime ?? false,
      emptyText: field.view?.emptyText ?? "-",
      layout: field.view?.layout ??
        field.form?.layout ?? {
          col: 12,
        },
    }));
}
