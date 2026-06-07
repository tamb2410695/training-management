Nội dung trong tập tin này sẽ trình bày kết quả tìm hiểu của em về các chức năng của hệ thống, các công cụ dự kiến sử dụng trong quá trình thực hiện đề tài.
# XÂY DỰNG HỆ THỐNG QUẢN LÝ TRUNG TÂM DẠY THÊM TRÊN NỀN TẢNG WEB
### Đánh giá tổng quan đề tài
- Trung tâm dạy thêm tập trung giảng dạy học sinh từ lớp 1 đến 12, có thể mở rộng sang ôn tập, luyện thi các chứng chỉ ngôn ngữ, THPT, tốt nghiệp, ĐGNL,...
- Giảm quá trình nhập liệu trên các tập tin bảng tính thô, thay vào đó xây dựng csdl để thao tác và quản lý
- Đối tượng giảng dạy ở trung tâm sẽ tập trung vào học sinh tiểu học.
- Đề tài xây dựng hỗ trợ thao tác các quy trình thông qua giao diện web, tập trung kết nối phụ huynh với trung tâm hơn là học sinh với trung tâm.
## Người dùng hệ thống
### Quản trị viên
Quản trị và quản lý hầu hết các công việc trung tâm, chức năng của kế toán sẽ được chuyển giao cho quản trị viên.
- Quản lý tài khoản
- Quản lý giáo viên
- Quản lý học sinh
- Quản lý phụ huynh
- Quản lý môn học
- Quản lý lịch học
- Quản lý phòng học
- Quản lý học phí
- Thống kê hệ thống
- Xem toàn bộ tài liệu học tập
- Gỡ bỏ tài liệu không phù hợp
### Giáo viên
- Quản lý lớp học
- Quản lý điểm số
- Quản lý tiến độ học tập
- Điểm danh học sinh
- Quản lý tài liệu học tập
### Phụ huynh / học sinh
Học sinh tại trung là đối tường được quản lý, các chức năng của học sinh sẽ do phụ huynh quản lý
- Xem hồ sơ học sinh
- Xem lịch học
- Xem thông tin môn học
- Xem danh sách tài liệu
- Xem thông tin tài liệu
- Tải xuống tài liệu
- Xem thông tin giáo viên
- Xem tiến độ học
- Xem điểm số
- Kiểm tra trạng thái học phí
- Chuyển đổi hồ sơ học sinh (nếu phụ huynh có nhiều con cùng theo học ở trung tâm)
## Tổng quan chức năng hệ thống
### ⁠Quản lý tài khoản
- Thêm tài khoản
- Xem thông tin tài khoản
- Cập nhật tài khoản
- Xóa tài khoản
- Khóa/Mở khóa tài khoản
### Truy cập hệ thống
- Đăng ký tài khoản
- Đăng nhập
- Đăng xuất
- Đổi mật khẩu
### Quản lý học sinh
- Thêm học sinh
- Xem thông tin học sinh
- Cập nhật thông tin học sinh
- Xóa học sinh
- Tìm kiếm học sinh
- Xem danh sách học sinh
### Quản lý giáo viên
- Thêm giáo viên
- Xem thông tin giáo viên
- Cập nhật thông tin giáo viên
- Xóa giáo viên
- Tìm kiếm giáo viên
- Xem danh sách giáo viên
### Quản lý môn học
- Thêm môn học
- Xem chi tiết môn học
- Cập nhật môn học
- Xóa môn học
- Tìm kiếm môn học
- Xem danh sách môn học
### Quản lý tài liệu đào tạo
- Thêm tài liệu
- Xem chi tiết tài liệu
- Cập nhật tài liệu
- Xóa tài liệu
- Tìm tài liệu
- Xem danh sách tài liệu
- Tải xuống tài liệu
- Ẩn/hiện tài liệu
### ⁠Quản lý lớp học
- Thêm lớp học
- Xem lớp học
- Cập nhật lớp học
- Xóa lớp học
- Tìm kiếm lớp học
- Xem danh sách lớp học
- Phân công giáo viên
### ⁠Quản lý lịch học
- Sắp xếp lịch học
- Xem lịch học
- Cập nhật lịch học
- Xóa lịch học
- Thay đổi lịch học học
### Quản lý phòng học
- Thêm phòng học
- Cập nhật thông tin phòng học
- Xóa phòng học
- Xem danh sách phòng học
- Tìm kiếm phòng học
- Kiểm tra trùng lịch sử dụng phòng
### Quản lý tiến độ học tập
- Thêm tiến độ học tập
- Xem tiến độ học tập
- Cập nhật tiến độ học tập
- Xóa tiến độ học tập
### Quản lý điểm số
- Cập nhật điểm số
- Tính điểm môn học
- Tính điểm trung bình kỳ học
### Q⁠uản lý học phí
- Tra cứu tình trạng học phí
- Xác nhận thu học phí (trực tiếp tại trung tâm)
- Xem lịch sử đóng tiền
### ⁠Chức năng thống kê
- Thống kê số lượng giáo viên
- Thống kê số lượng học sinh
- Thống kê số lượng lớp học
- Thống kê điểm số các môn học
- Thống kê doanh thu theo thời điểm
## Đánh giá các chức năng
- Về  học, lớp học, lịch học và phòng học: một môn học sẽ gồm nhiều lớp học, mỗi lớp học sẽ có lịch học và tiến độ học tập của từng lớp. Các phòng học sẽ được phân công trước và đảm bảo không trùng lịch hai lớp khác nhau tại một thời điểm.
- Về môn học: mỗi môn sẽ có thông tin về nội dung giảng dạy, số buổi học, số giờ dự kiến, lộ trình học tập.
- Về tiến độ học tập: giáo viên có thể dạy nhiều lớp nhiều môn, nên tiến độ sẽ do giáo viên quản lý, bao gồm: số buổi đã học, số buổi hoàn thành, phần trăm hoàn thành môn học.
- Về tài liệu học tập: giáo viên có thể tải lên các tài liệu phục vụ giảng dạy như đề cương ôn tập, bài tập, đề kiểm tra và tài liệu tham khảo. Tài liệu được phân loại theo môn học và cho phép phụ huynh hoặc học sinh tải xuống để phục vụ quá trình học tập. Hệ thống chỉ hỗ trợ lưu trữ và chia sẻ tài liệu, không hỗ trợ giao bài tập hoặc chấm bài tự động.
- Về tính năng thu học phí: thu trực tiếp tại trung tâm và cập nhật tại chỗ hoặc gửi mail có thông tin chuyển khoản học phí (công việc sẽ thực hiện thủ công).