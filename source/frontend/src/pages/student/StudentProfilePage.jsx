import ProfileCard from "@/features/profile/components/ProfileCard";
import ProfileField from "@/features/profile/components/ProfileField";
import ProfileHeader from "@/features/profile/components/ProfileHeader";

import { useProfile } from "@/features/profile/hook/useProfile";

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

      <ProfileField label="Mã học viên" value={user.studentCode} />

      <ProfileField label="Họ tên" value={user.fullName} />

      <ProfileField label="Ngày sinh" value={user.dateOfBirth} />

      <ProfileField label="Số điện thoại" value={user.phone} />

      <ProfileField label="Email cá nhân" value={user.personalEmail} />
    </ProfileCard>
  );
}

export default InstructorProfilePage;
