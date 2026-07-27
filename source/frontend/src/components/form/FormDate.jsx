function FormDate({ label, name, value, onChange, required, disabled, error }) {
  const hasError = Boolean(error);

  return (
    <div className="mb-3">
      <label className="form-label small fw-bold text-secondary">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>

      <input
        type="date"
        name={name}
        value={value ?? ""}
        className={`form-control ${hasError ? "is-invalid" : ""}`}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      />

      {hasError && (
        <div className="invalid-feedback">{error.message ?? error}</div>
      )}
    </div>
  );
}

export default FormDate;
