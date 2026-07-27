import FilterCheckbox from "./FilterCheckbox";

const FilterGroup = ({ filters = [], values = {}, onChange }) => {
  const handleCheckboxChange = (filterKey, optionKey, checked) => {
    const currentValues = values[filterKey] ?? [];

    const updatedValues = checked
      ? [...currentValues, optionKey]
      : currentValues.filter((item) => item !== optionKey);

    onChange({
      [filterKey]: updatedValues,
    });
  };
  return (
    <div className="d-flex flex-column gap-3">
      {filters.map((filter) => (
        <div key={filter.key} className="d-flex align-items-center gap-3">
          <div
            className="
          small
          fw-semibold
          text-secondary
          filter-label
        "
          >
            {filter.label}
          </div>

          <div className="d-flex flex-wrap gap-2">
            {filter.options.map((option) => (
              <FilterCheckbox
                key={`${filter.key}-${option.value}`}
                label={option.label}
                checked={values[filter.key]?.includes(option.value) ?? false}
                onChange={(checked) =>
                  handleCheckboxChange(filter.key, option.value, checked)
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterGroup;
