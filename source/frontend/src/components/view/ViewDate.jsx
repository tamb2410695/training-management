function ViewDate({ label, value, showTime = false }) {
  const displayValue = formatDate(value, showTime);

  return (
    <div className="mb-3">
      <div className="form-label small fw-bold text-secondary">{label}</div>

      <div className="border rounded bg-light p-2 min-height">{displayValue}</div>
    </div>
  );
}

function formatDate(value, showTime) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat(
    "vi-VN",
    showTime
      ? {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      : {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        },
  ).format(date);
}

export default ViewDate;
