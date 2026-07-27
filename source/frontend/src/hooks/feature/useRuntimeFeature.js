import { useMemo } from "react";
import { resolveFeature } from "@/utils/helpers/reslove/resolveFeature";
import { useAuth } from "@/hooks";

export function useRuntimeFeature({ feature, context }) {
  const { user } = useAuth();

  return useMemo(() => {
    return resolveFeature({
      feature,
      context: {
        ...context,
        user,
      },
    });
  }, [feature, context, user]);
}
