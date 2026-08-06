export function resolveFormPlaceholder({ mode }) {
  const placeholder = {
    view: "Không hiển thị mật khẩu",
    create: "Hãy nhập mật khẩu",
    update: "Bỏ qua nếu không cập nhật mật khẩu",
  };
  
  return {
    placeholder: placeholder[mode],
  };
}
