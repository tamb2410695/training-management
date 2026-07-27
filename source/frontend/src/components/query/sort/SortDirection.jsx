const SortDirection = ({ value, onChange }) => {
  const handleToggle = () => {
    if (!value) {
      onChange("desc");
      return;
    }
    onChange(value === "asc" ? "desc" : "asc");
  };

  return (
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={handleToggle}
    >
      {value === "asc" ? "▲" : "▼"}
    </button>
  );
};

export default SortDirection;