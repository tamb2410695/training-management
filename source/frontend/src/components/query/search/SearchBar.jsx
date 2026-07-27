import SearchInput from "./SearchInput";
import SearchSelect from "./SearchSelect";

const SearchBar = ({
  keyword,
  searchField,
  searchFields,
  onKeywordChange,
  onSearchFieldChange,
}) => {
  return (
    <div className="w-100">
      <div className="row g-2">

        {/* Search field */}
        <div className="col-12 col-md-auto">
          <SearchSelect
            value={searchField}
            options={searchFields}
            onChange={onSearchFieldChange}
          />
        </div>

        {/* Keyword */}
        <div className="col-12 col-md">
          <SearchInput
            value={keyword}
            onChange={onKeywordChange}
          />
        </div>

      </div>
    </div>
  );
};

export default SearchBar;