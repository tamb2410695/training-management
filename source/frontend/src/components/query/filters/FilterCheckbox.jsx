const FilterCheckbox = ({ label, checked, onChange }) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />

      <label className="form-check-label">{label}</label>
    </div>
  );
};

export default FilterCheckbox;
