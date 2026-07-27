const PAGE_SIZES = [10, 20, 50, 100];

const PageSizeSelect = ({ value, onChange }) => (
  <select
    className="form-select"
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
  >
    {PAGE_SIZES.map((size) => (
      <option key={size} value={size}>
        {size} / trang
      </option>
    ))}
  </select>
);

export default PageSizeSelect;
