import { useState } from "react";

export const useForm = (defaultValues) => {
  const [form, setForm] = useState(defaultValues);

  const setField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const resetForm = () => setForm(defaultValues);

  return {
    form,
    setForm,
    setField,
    resetForm,
  };
};
