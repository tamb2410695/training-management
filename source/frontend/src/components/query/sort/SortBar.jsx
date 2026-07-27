import SortDirection from "./SortDirection";
import SortSelect from "./SortSelect";

const SortBar = ({
  sortBy,
  sortOrder = "desc",
  sortFields = [],
  onChange,
}) => {
  const handleFieldChange = (newField) => {
    const defaultOrder =
      newField.toLowerCase().includes("created") ||
      newField.toLowerCase().includes("id")
        ? "desc"
        : "asc";
    onChange({
      sortBy: newField,
      sortOrder: newField ? defaultOrder : undefined,
    });
  };

  const handleDirectionChange = (newDirection) => {
    if (!sortBy) return;
    onChange({
      sortBy: sortBy,
      sortOrder: newDirection,
    });
  };

  return (
    <div className="d-flex gap-2 align-items-center">
      <SortSelect
        value={sortBy}
        options={sortFields}
        onChange={handleFieldChange}
      />

      <SortDirection
        value={sortOrder}
        disabled={!sortBy}
        onChange={handleDirectionChange}
      />
    </div>
  );
};

export default SortBar;
