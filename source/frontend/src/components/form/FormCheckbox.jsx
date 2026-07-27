function FormCheckbox({ label, name, checked, onChange, disabled, error }) {
  const hasError = Boolean(error);

  return (
    <div className="mb-3">
      <div className="form-check">
        <input
          type="checkbox"
          id={name}
          name={name}
          className={`form-check-input ${hasError ? "is-invalid" : ""}`}
          checked={Boolean(checked)}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />

        <label
          htmlFor={name}
          className="form-check-label small fw-bold text-secondary"
        >
          {label}
        </label>
      </div>

      {hasError && (
        <div className="invalid-feedback d-block">{error.message ?? error}</div>
      )}
    </div>
  );
}

export default FormCheckbox;
