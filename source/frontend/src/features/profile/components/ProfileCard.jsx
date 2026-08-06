function ProfileCard({ title, children }) {
  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h4 className="mb-0">{title}</h4>
        </div>

        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}

export default ProfileCard;
