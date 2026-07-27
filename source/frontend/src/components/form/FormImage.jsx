import { useEffect, useState } from "react";

function FormImage({
  label,
  name,
  value,
  onChange,
  required,
  disabled,
  error,
}) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    let objectUrl = "";

    if (typeof value === "string") {
      setPreview(value);
    } else if (value instanceof File) {
      objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
    } else {
      setPreview("");
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [value]);

  const hasError = Boolean(error);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
  };

  const handleClear = () => {
    onChange(null);
  };

  return (
    <div className="mb-3">
      <label className="form-label small fw-bold text-secondary">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>

      <div className="d-flex align-items-start gap-3">
        <div
          className="border rounded bg-light d-flex align-items-center justify-content-center"
          style={{
            width: 80,
            height: 80,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt={label}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <span className="text-muted small">Không có ảnh</span>
          )}
        </div>

        <div className="flex-grow-1">
          <input
            type="file"
            name={name}
            className={`form-control ${hasError ? "is-invalid" : ""}`}
            accept="image/*"
            onChange={handleFileChange}
            required={required && !preview}
            disabled={disabled}
          />

          {hasError && (
            <div className="invalid-feedback">{error.message ?? error}</div>
          )}

          {preview && !disabled && (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger mt-2"
              onClick={handleClear}
            >
              Xóa ảnh
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormImage;
