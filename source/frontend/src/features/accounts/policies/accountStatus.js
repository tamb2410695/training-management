const STATUS_TRANSITIONS = {
  PENDING: ["ACTIVE"],
  ACTIVE: ["LOCKED", "DISABLED"],
  LOCKED: ["ACTIVE"],
  DISABLED: ["ACTIVE", "DISABLED"],
};

export function resolveStatusPolicy({ currentStatus }) {
  return {
    readonly: false,
    options: [
      ...new Set([currentStatus, ...(STATUS_TRANSITIONS[currentStatus] ?? [])]),
    ],
  };
}
