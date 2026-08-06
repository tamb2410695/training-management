import { useMemo } from "react";
import { useCrud } from "@/hooks";
import { DOCUMENT_FEATURE } from "../constants";
import documentsService from "../services/documentsService";

export function useDocumentsCrud() {
  const service = useMemo(() => documentsService(), []);

  return useCrud(service, {
    resourceName: DOCUMENT_FEATURE.config.entity,
  });
}