const ToolbarActions = ({ actions = [] }) => {
  return (
    <div className="d-flex gap-2">
      {actions.map((action) => (
        <button
          key={action.key}
          className={`btn btn-${action.variant}`}
          onClick={action.onClick}
        >
          {action.icon && <i className={`bi-${action.icon} me-1`} />}
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ToolbarActions;
