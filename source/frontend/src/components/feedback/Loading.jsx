function Loading({ fullScreen = false, size = "md" }) {
  const sizeClass = size === "sm" ? "spinner-border-sm" : "";
  const customStyle =
    size === "lg" ? { width: "3.5rem", height: "3.5rem" } : {};

  const spinnerElement = (
    <div className="d-flex flex-column align-items-center justify-content-center p-4">
      <div
        className={`spinner-border text-primary ${sizeClass}`}
        role="status"
        style={customStyle}
      >
        <span className="visually-hidden">Đang tải...</span>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75"
        style={{ zIndex: 1050 }}
      >
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
}

export default Loading;
