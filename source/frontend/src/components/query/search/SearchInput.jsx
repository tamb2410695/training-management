const SearchInput = ({
  value = "",
  onChange,
  placeholder = "Nhập từ khóa...",
  size = "",
}) => {
  const handleChange = (event) => {
    onChange?.(event.target.value);
  };

  const handleClear = () => {
    onChange?.("");
  };

  return (
    <div className="input-group">
      <span className="input-group-text bg-white">
        <i className="bi bi-search" />
      </span>

      <input
        className={`form-control ${size}`}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />

      {value && (
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleClear}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchInput;
