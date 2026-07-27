function DepartmentSearch({
  keyword,
  onChange,
}) {
  return (
    <input
      placeholder="Tìm kiếm phòng ban..."
      value={keyword}
      onChange={(e) =>
        onChange(
          e.target.value
        )
      }
    />
  );
}

export default DepartmentSearch;