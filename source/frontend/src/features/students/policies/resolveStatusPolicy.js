const STATUS_TRANSITIONS = {
  INCOMPLETE: ["ACTIVE"],
  ACTIVE: ["SUSPENDED", "GRADUATED", "WITHDRAWN"],
  SUSPENDED: ["ACTIVE"],
  GRADUATED: ["ACTIVE"],
  WITHDRAWN: ["ACTIVE"],
};

export function resolveStatusPolicy({ currentStatus = "INCOMPLETE" }) {
  return {
    readonly: false,
    options: [
      ...new Set([currentStatus, ...(STATUS_TRANSITIONS[currentStatus] ?? [])]),
    ],
  };
}
