const STATUS_TRANSITIONS = {
  DISABLE: ["ACTIVE"],
  ACTIVE: ["ON_LEAVE", "SUSPENDED", "TERMINATED", "DISABLE"],
  ON_LEAVE: ["ACTIVE"],
  SUSPENDED: ["ACTIVE", "TERMINATED"],
  TERMINATED: ["ACTIVE"],
};

export function resolveStatusPolicy({ currentStatus = "ACTIVE" }) {
  return {
    readonly: currentStatus === "TERMINATED",
    options: [
      ...new Set([currentStatus, ...(STATUS_TRANSITIONS[currentStatus] ?? [])]),
    ],
  };
}
