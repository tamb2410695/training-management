function ProfileField({ label, value }) {
  return (
    <div className="row mb-3">
      <div className="col-md-4 text-muted">{label}</div>

      <div className="col-md-8 fw-medium">{value || "-"}</div>
    </div>
  );
}

export default ProfileField;
