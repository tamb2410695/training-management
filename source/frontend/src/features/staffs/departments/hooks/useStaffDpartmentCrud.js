import { useMemo } from "react";
import { useCrud } from "@/hooks";
import { STAFF_DEPARTMENT_FEATURE } from "../constants";
import departmentsService from "../services";

export function useProfilesCrud() {
  const service = useMemo(() => departmentsService(), []);

  return useCrud(service, {
    resourceName: STAFF_DEPARTMENT_FEATURE.config.entity,
  });
}