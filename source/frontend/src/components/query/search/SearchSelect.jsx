const SearchSelect = ({
  value = "",
  options = [],
  onChange,
  placeholder = "Tất cả",
  className = "",
}) => {
  return (
    <select
      className={`form-select ${className}`}
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
    >
      <option value="">
        {placeholder}
      </option>

      {options.map((option) => (
        <option
          key={option.key}
          value={option.key}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SearchSelect;