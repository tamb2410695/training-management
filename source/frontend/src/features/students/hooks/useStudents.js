import { useState } from "react";
import studentService from "./studentService";

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const result = await studentService.getAll();

      setStudents(result.data.data);
    } finally {
      setLoading(false);
    }
  };

  return {
    students,
    loading,
    loadStudents
  };
}