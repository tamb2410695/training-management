function AccountDeleteModal({ open, account, onClose, onConfirm }) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        position-fixed
        top-0
        start-0
        w-100
        h-100
        bg-dark
        bg-opacity-50
      "
    >
      <div
        className="
          card
          p-4
          mx-auto
          mt-5
          w-25
        "
      >
        <h4>Delete Account</h4>

        <p>
          Delete account: <strong>{account?.username}</strong>?
        </p>

        <button
          className="
            btn
            btn-danger
            me-2
          "
          onClick={onConfirm}
        >
          Delete
        </button>

        <button
          className="
            btn
            btn-secondary
          "
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AccountDeleteModal;
