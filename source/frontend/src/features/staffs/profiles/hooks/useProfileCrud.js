import { useMemo } from "react";
import { useCrud } from "@/hooks";
import { STAFF_PROFILE_FEATURE } from "../constants";
import profilesService from "../services/profilesService";

export function useProfilesCrud() {
  const service = useMemo(() => profilesService(), []);

  return useCrud(service, {
    resourceName: STAFF_PROFILE_FEATURE.config.entity,
  });
}