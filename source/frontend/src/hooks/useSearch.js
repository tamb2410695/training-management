import { useState } from "react";

export const useSearch = () => {
  const [search, setSearch] = useState("");

  return {
    search,
    setSearch,
  };
};
