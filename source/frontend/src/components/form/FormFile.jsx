function FormFile({
  label,
  name,
  value,
  required,
  disabled,
  onChange,
  accept,
  error,
}) {
  const hasError = Boolean(error);

  const fileName =
    value instanceof File
      ? value.name
      : typeof value === "string" && value
        ? value.split("/").pop()
        : "";

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
  };

  const handleClearFile = () => {
    onChange(null);
  };

  const defaultAccept = accept ?? ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx";

  return (
    <div className="mb-3">
      <label className="form-label small fw-bold text-secondary">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>

      {!fileName ? (
        <input
          type="file"
          name={name}
          className={`form-control ${hasError ? "is-invalid" : ""}`}
          accept={defaultAccept}
          onChange={handleFileChange}
          required={required}
          disabled={disabled}
        />
      ) : (
        <>
          <div
            className={`form-control d-flex justify-content-between align-items-center ${
              hasError ? "is-invalid" : ""
            }`}
          >
            <span className="text-truncate text-primary" title={fileName}>
              {fileName}
            </span>

            {!disabled && (
              <button
                type="button"
                className="btn-close"
                aria-label="Clear file"
                onClick={handleClearFile}
              />
            )}
          </div>

          {hasError && (
            <div className="invalid-feedback d-block">
              {error.message ?? error}
            </div>
          )}
        </>
      )}

      {!fileName && hasError && (
        <div className="invalid-feedback">{error.message ?? error}</div>
      )}
    </div>
  );
}

export default FormFile;
