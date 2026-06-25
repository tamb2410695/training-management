import { useState } from "react";
import instructorService from "./instructorService";

export function useInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadInstructors = async () => {
    try {
      setLoading(true);

      const result = await instructorService.getAll();

      setInstructors(result.data.data);
    } finally {
      setLoading(false);
    }
  };

  return {
    instructors,
    loading,
    loadInstructors
  };
}