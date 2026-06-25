function AccountTable({ data, loading, onEdit, onDelete }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (data.length === 0) {
    return <p>No accounts found.</p>;
  }

  return (
    <table
      className="
        table
        table-bordered
        table-hover
      "
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map((account) => (
          <tr key={account.accountId}>
            <td>{account.accountId}</td>

            <td>{account.username}</td>

            <td>{account.email}</td>

            <td>{account.roleName}</td>

            <td>
              <button
                className="
                    btn
                    btn-warning
                    btn-sm
                    me-2
                  "
                onClick={() => onEdit(account)}
              >
                Edit
              </button>

              <button
                className="
                    btn
                    btn-danger
                    btn-sm
                  "
                onClick={() => onDelete(account)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AccountTable;
