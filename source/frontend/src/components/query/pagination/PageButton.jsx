const PageButton = ({
  active = false,
  disabled = false,
  children,
  onClick,
}) => (
  <button
    className={`btn btn-sm ${
      active ? "btn-primary" : "btn-outline-primary"
    }`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default PageButton;