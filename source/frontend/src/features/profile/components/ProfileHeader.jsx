function ProfileHeader({ user }) {
  return (
    <div className="mb-4">
      <h5>Xin chào, {user?.fullName || user?.username}</h5>

      <span className="badge bg-primary">{user?.roleCode}</span>
    </div>
  );
}

export default ProfileHeader;
