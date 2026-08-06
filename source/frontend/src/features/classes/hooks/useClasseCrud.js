import { useMemo } from "react";
import { useCrud } from "@/hooks";
import { CLASS_FEATURE } from "../constants";
import classesService from "../services/classesService";

export function useClassesCrud() {
  const service = useMemo(() => classesService(), []);

  return useCrud(service, {
    resourceName: CLASS_FEATURE.config.entity,
  });
}