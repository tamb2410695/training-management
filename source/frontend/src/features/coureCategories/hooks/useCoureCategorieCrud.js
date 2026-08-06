import { useMemo } from "react";
import { useCrud } from "@/hooks";
import { COURECATEGORIE_FEATURE } from "../constants";
import coureCategoriesService from "../services/coureCategoriesService";

export function useCoureCategoriesCrud() {
  const service = useMemo(() => coureCategoriesService(), []);

  return useCrud(service, {
    resourceName: COURECATEGORIE_FEATURE.config.entity,
  });
}