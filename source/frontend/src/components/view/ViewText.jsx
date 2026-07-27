import { displayValue } from "@/utils";

function ViewText({ label, value, options = [] }) {
  const option = options.find((item) => item.value === value);

  const textValue = option?.label ?? displayValue(value);

  return (
    <div className="mb-3">
      <div className="form-label small fw-bold text-secondary">{label}</div>

      <div className="border rounded bg-light p-2 min-height">{textValue}</div>
    </div>
  );
}

export default ViewText;
