function AccountSearch({
  keyword,
  onChange,
}) {
  return (
    <input
      placeholder="Tìm kiếm tài khoản..."
      value={keyword}
      onChange={(e) =>
        onChange(
          e.target.value
        )
      }
    />
  );
}

export default AccountSearch;