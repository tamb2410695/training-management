function Skeleton({ variant = "text", width, height, className = "" }) {
  const inlineStyle = {
    width: width || (variant === "text" ? "100%" : undefined),
    height: height || (variant === "text" ? "1rem" : undefined),
  };

  let variantClass = "rounded";
  if (variant === "circle") variantClass = "rounded-circle";
  if (variant === "rect") variantClass = "rounded-0";

  return (
    <div className={`placeholder-glow ${className}`} style={inlineStyle}>
      <span
        className={`placeholder w-100 h-100 bg-secondary opacity-25 ${variantClass}`}
        style={{ display: "block" }}
      ></span>
    </div>
  );
}

export default Skeleton;
