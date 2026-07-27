import { useMemo } from "react";
import { ACTIONS } from "@/constants";

const ACTION_MAP = Object.values(ACTIONS).reduce((result, action) => {
  result[action.key] = action;
  return result;
}, {});

export function useActions(config = [], handlers = {}) {
  return useMemo(() => {
    return config
      .map((key) => {
        const meta = ACTION_MAP[key];
        const onClick = handlers[key];
        if (!meta || !onClick) {
          return null;
        }

        return {
          ...meta,
          onClick,
        };
      })
      .filter(Boolean);
  }, [config, handlers]);
}
