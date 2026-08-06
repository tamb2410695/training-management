import { useMemo } from "react";
import { useCrud } from "@/hooks";
import { ENROLLMENT_FEATURE } from "../constants";
import enrollmentsService from "../services/enrollmentsService";

export function useEnrollmentsCrud() {
  const service = useMemo(() => enrollmentsService(), []);

  return useCrud(service, {
    resourceName: ENROLLMENT_FEATURE.config.entity,
  });
}