import { useMemo } from "react";
import { useCrud } from "@/hooks";
import { REGISTRATION_FEATURE } from "../constants";
import registrationsService from "../services/registrationsService";

export function useRegistrationsCrud() {
  const service = useMemo(() => registrationsService(), []);

  return useCrud(service, {
    resourceName: REGISTRATION_FEATURE.config.entity,
  });
}