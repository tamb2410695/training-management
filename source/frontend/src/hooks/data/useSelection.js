import { useState } from "react";

export function useSelection() {
  const [selected, setSelected] = useState(null);
  const clearSelection = () => setSelected(null);

  return {
    selected,
    setSelected,
    clearSelection,
  };
}
