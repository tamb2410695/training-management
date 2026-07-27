import { useMemo } from "react";
import { useCrud } from "@/hooks";
import { ACCOUNT_FEATURE } from "../constants";
import accountsService from "../services/accountsService";

export function useAccountsCrud() {
  const service = useMemo(() => accountsService(), []);

  return useCrud(service, {
    resourceName: ACCOUNT_FEATURE.config.entity,
  });
}