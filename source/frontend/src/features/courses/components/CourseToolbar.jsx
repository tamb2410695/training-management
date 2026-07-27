function AccountToolbar({ keyword, onKeywordChange, onCreate }) {
  return (
    <div
      className="
        d-flex
        justify-content-between
        mb-3
      "
    >
      <input
        className="form-control w-50"
        placeholder="Tìm kiếm tài khoản..."
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />

      <button
        className="
          btn btn-primary
        "
        onClick={onCreate}
      >
        Add Account
      </button>
    </div>
  );
}

export default AccountToolbar;
