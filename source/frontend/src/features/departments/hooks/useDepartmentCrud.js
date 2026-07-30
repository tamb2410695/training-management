import { useMemo } from "react";
import { useCrud } from "@/hooks";
import { DEPARTMENT_FEATURE } from "../constants";
import departmentsService from "../services/departmentsService";

export function useDepartmentCrud() {
  const service = useMemo(() => departmentsService(), []);

  return useCrud(service, {
    resourceName: DEPARTMENT_FEATURE.config.entity,
  });
}