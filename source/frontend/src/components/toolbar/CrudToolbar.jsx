import SearchBar from "../query/search/SearchBar";
import FilterGroup from "../query/filters/FilterGroup";
import SortBar from "../query/sort/SortBar";
import ToolbarActions from "./ToolbarActions";

const CrudToolbar = ({ schema = {}, query = {}, onChange, actions = [] }) => {
  const handleChange = (key, value) => {
    onChange?.({
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
      {/* Header */}
      <div
        className="
          d-flex
          justify-content-between
          align-items-center
          mb-4
        "
      >
        <div>
          <h6 className="mb-1 fw-semibold">Search & Filter</h6>

          <small className="text-muted">Find and manage your records</small>
        </div>

        {actions.length > 0 && <ToolbarActions actions={actions} />}
      </div>

      {/* Search */}
      {schema.searchableFields?.length > 0 && (
        <div className="mb-4">
          <SearchBar
            keyword={query.search ?? ""}
            searchField={query.searchField}
            searchFields={schema.searchableFields}
            onKeywordChange={(value) => handleChange("search", value)}
            onSearchFieldChange={(value) => handleChange("searchField", value)}
          />
        </div>
      )}

      {/* Filter */}
      {schema.filterFields?.length > 0 && (
        <div className="mb-4">
          <div className="text-muted small fw-semibold mb-2">Filters</div>

          <div className="border rounded-3 p-3 bg-light">
            <FilterGroup
              filters={schema.filterFields}
              values={query}
              onChange={onChange}
            />
          </div>
        </div>
      )}

      {/* Sort */}
      {schema.sortableFields?.length > 0 && (
        <div
          className="
            d-flex
            align-items-center
            gap-2
          "
        >
          <span className="text-muted small fw-semibold">Sort:</span>

          <SortBar
            sortFields={schema.sortableFields}
            sortBy={query.sortBy}
            sortOrder={query.sortOrder}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};

export default CrudToolbar;
