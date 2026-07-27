function FormSelect({
  label,
  name,
  value,
  onChange,
  required,
  disabled,
  options = [],
  placeholder = "-- Chọn --",
  error,
}) {
  const hasError = Boolean(error);

  return (
    <div className="mb-3">
      <label className="form-label small fw-bold text-secondary">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>

      <select
        name={name}
        className={`form-select ${hasError ? "is-invalid" : ""}`}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      >
        {!required && <option value="">{placeholder}</option>}

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {hasError && (
        <div className="invalid-feedback">{error.message ?? error}</div>
      )}
    </div>
  );
}

export default FormSelect;
