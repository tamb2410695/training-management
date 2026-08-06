import ProfileCard from "../components/ProfileCard";
import ProfileField from "../components/ProfileField";
import ProfileHeader from "../components/ProfileHeader";

import { useProfile } from "../hooks/useProfile";

function InstructorProfilePage() {
  const { user, loading } = useProfile();

  if (loading) {
    return (
      <div className="container py-4">Đang tải thông tin tài khoản...</div>
    );
  }

  return (
    <ProfileCard title="Thông tin học viên">
      <ProfileHeader user={user} />

      <ProfileField label="Username" value={user.username} />

      <ProfileField label="Email" value={user.email} />

      <ProfileField label="Vai trò" value={user.roleCode} />
    </ProfileCard>
  );
}

export default InstructorProfilePage;
