const ModalFooter = ({ actions = [], loading = false }) => {
  if (!actions.length) {
    return null;
  }

  return (
    <div
      className="modal-footer 
        justify-content-between
        align-items-center"
    >
      {actions.map((action) => (
        <button
          key={action.key}
          type="button"
          className={
            action.className ??
            `btn btn-${action.variant ?? "primary"} 
          justify-content-between`
          }
          disabled={loading || action.disabled}
          onClick={action.onClick}
        >
          {action.icon && <i className={`bi-${action.icon} me-1`} />}
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ModalFooter;
