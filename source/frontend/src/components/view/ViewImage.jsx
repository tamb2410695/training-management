function ViewImage({ label, value }) {
  return (
    <div>
      <div className="form-label small fw-bold text-secondary">{label}</div>

      {value ? <img src={value} /> : "-"}
    </div>
  );
}

export default ViewImage;
