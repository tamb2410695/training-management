import { useMemo } from "react";
import { useCrud } from "@/hooks";
import { STUDENT_FEATURE } from "../constants";
import studentsService from "../services/studentsService";

export function useStudentsCrud() {
  const service = useMemo(() => studentsService(), []);

  return useCrud(service, {
    resourceName: STUDENT_FEATURE.config.entity,
  });
}