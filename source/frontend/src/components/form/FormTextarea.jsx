function FormTextarea({
  label,
  name,
  value,
  onChange,
  required,
  disabled,
  placeholder,
  rows = 3,
  error,
}) {
  const hasError = Boolean(error);

  return (
    <div className="mb-3">
      <label className="form-label small fw-bold text-secondary">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>

      <textarea
        name={name}
        className={`form-control ${hasError ? "is-invalid" : ""}`}
        rows={rows}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
      />

      {hasError && (
        <div className="invalid-feedback">{error.message ?? error}</div>
      )}
    </div>
  );
}

export default FormTextarea;
