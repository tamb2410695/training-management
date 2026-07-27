import { useState } from "react";
import {PAGE_MODES} from "../../constants";
export function usePageMode(defaultMode = PAGE_MODES.VIEW) {
  const [pageMode, setMode] = useState(defaultMode);

  const enterManageMode = () => setMode(PAGE_MODES.MANAGE);

  const exitManageMode = () => setMode(PAGE_MODES.VIEW);

  const toggleMode = () =>
    setMode((prev) =>
      prev === PAGE_MODES.VIEW ? PAGE_MODES.MANAGE : PAGE_MODES.VIEW,
    );

  return {
    pageMode,
    isViewMode: pageMode === PAGE_MODES.VIEW,
    isManageMode: pageMode === PAGE_MODES.MANAGE,
    enterManageMode,
    exitManageMode,
    toggleMode,
  };
}
