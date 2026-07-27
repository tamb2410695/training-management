function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  disabled,
  error,
  placeholder,
}) {
  const hasError = Boolean(error);

  return (
    <div className="mb-3">
      <label className="form-label small fw-bold text-secondary">
        {label}

        {required && <span className="text-danger"> *</span>}
      </label>

      <input
        type={type}
        name={name}
        className={`form-control ${hasError ? "is-invalid" : ""}`}
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

export default FormInput;
