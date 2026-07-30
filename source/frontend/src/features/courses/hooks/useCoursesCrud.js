import { useMemo } from "react";
import { useCrud } from "@/hooks";
import { COURSE_FEATURE } from "../constants";
import departmentsService from "../services/coursesService";

export function useCoursesCrud() {
  const service = useMemo(() => departmentsService(), []);

  return useCrud(service, {
    resourceName: COURSE_FEATURE.config.entity,
  });
}