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
    <ProfileCard title="Thông tin giảng viên">
      <ProfileHeader user={user} />

      <ProfileField label="Tên đăng nhập" value={user.username} />

      <ProfileField label="Email" value={user.email} />

      <ProfileField label="Mã nhân viên" value={user.staffCode} />

      <ProfileField label="Họ tên" value={user.fullName} />

      <ProfileField label="Số điện thoại" value={user.phone} />

      <ProfileField label="Trạng thái" value={user.staffStatus} />

      <ProfileField label="Ngày vào làm" value={user.hireDate} />
    </ProfileCard>
  );
}

export default InstructorProfilePage;
