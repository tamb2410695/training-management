import { resolveQueryPolicy } from "./resolveQueryPolicy";


export function resolveCoureCategorieRuntime(context) {
  const query = resolveQueryPolicy(context);

  return {
    query: {
      filterFields: {
        ...query.filterFields,
      },
    },
  };
}
