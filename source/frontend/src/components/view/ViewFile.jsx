function ViewFile({ label, value }) {
  return (
    <div className="mb-3">
      <div className="form-label small fw-bold text-secondary">{label}</div>

      <div className="border rounded bg-light p-2 min-height">{value?.name ?? "-"}</div>
    </div>
  );
}

export default ViewFile;
