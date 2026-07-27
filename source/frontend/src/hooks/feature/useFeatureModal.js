import { useState } from "react";
import { useSelection } from "../data";

export const  useFeatureModal = (config = {}) => {
  const [opened, setOpened] = useState(false);
  const [mode, setMode] = useState(null);
  const {selected, setSelected, clearSelection} = useSelection()

  const open = ({ mode, record = null }) => {
    setMode(mode);
    setSelected(record);
    setOpened(true);
  };

  const close = () => {
    setOpened(false);
    setMode(null);
    clearSelection();
  };

  const title = config.title?.[mode] ?? "Thông tin";

  return {
    opened,
    mode,
    record: selected,

    title,

    open,
    close,

    isCreate: mode === "create",
    isUpdate: mode === "update",
    isView: mode === "view",

    isOpened: opened,
  };
};
