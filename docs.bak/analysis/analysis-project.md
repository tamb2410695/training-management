# **PHÂN TÍCH ĐỀ TÀI NIÊN LUẬN CƠ SỞ NGÀNH**
- Đề tài 1: Các trung tâm dạy thêm thường dành cho học sinh từ lớp 1 đến lớp 12, nội dung giảng dạy được cố định từ trước. Việc quản lý sẽ tập trung vào phân chia lớp học, phòng học tại trung tâm. Tính thực tế đề tài: hiện nay các nhà trường đều có tổ chức dạy thêm ngoài giờ tại trường, quy định về nội dung giảng dạy bị hạn chế không vượt kiến thức trong trường, dẫn đến phạm vi ứng dụng của mô hình trung tâm dạy thêm sẽ không còn đa dạng như trước. Thay vào đó các trung tâm sẽ tập trung vào luyện thi THPT, tốt nghiệp, ĐGNL, các bằng cấp ngôn ngữ,...  Các trung tâm sẽ dạy cho học sinh từ 10-12. Nội dung giảng dạy bao gồm kiến thức trên lớp và các khóa luyện thi, khóa học chứng chỉ. Điều này tạo thêm độ phức tạp cho đề tài khi phải vừa quản lý môn học và khóa học.
- Đề tài 2: Các trung tâm đào tạo CNTT sẽ mang tính chủ động hơn ở việc cập nhật khóa học mới phù hợp thời điểm hiện tại. Khách có thể tìm kiếm đến website của trung tâm để tham khảo khóa học. Nhiều chức năng linh hoạt như: quản lý nhân sự, lịch học, khóa học, khai giảng theo kỳ,... Hệ thống cho phép các học viên truy cập để đăng ký khóa học.
- Đề tài 2 có giá trị thực tế hơn so với đề tài 1.
- Khó khăn ở đề tài 2: chưa thể xây dựng hệ thống hoàn chỉnh cho 1 trung tâm đào tạo CNTT các chức năng: học phí, doanh thu, học online, liên kết doanh nghiệp,...
# XÂY DỰNG HỆ THỐNG QUẢN LÝ TRUNG TÂM ĐÀO TẠO CNTT TRÊN NỀN TẢNG WEB
## ĐÁNH GIÁ TỔNG QUAN ĐỀ TÀI
- Trung tâm đào tạo CNTT tập trung giảng dạy cho sinh viên, người muốn học CNTT. Trung tâm cung cấp các khóa học về CNTT như: Lập trình Fullstack, Phát triển ứng dụng, Tin học văn phòng
- Mục đích xây dựng đề tài: xây dựng csdl để giảm quá trình nhập liệu ở bảng tính thô.
- Hỗ trợ thao tác trực quan qua web, tạo nơi tương tác giữa học viên và trung tâm đào tạo.
## ⁠Chức năng người dùng
### Quản trị viên
Quản trị và quản lý hầu hết các công việc trung tâm, chức năng của kế toán sẽ được chuyển giao cho quản trị viên.
- Quản lý tài khoản
- Quản lý giảng viên
- Quản lý học viên
- Quản lý khóa học
- Quản lý lịch học
- Quản lý phòng học
- Quản lý học phí
- Thống kê hệ thống
### ⁠Giảng viên
- Xem lớp học
- Xem danh sách học viên
- Quản lý tài liệu học tập
- Điểm danh học viên
- Quản lý tiến độ học tập
- Quản lý điểm học viên
### ⁠Học viên
- Quản lý hồ sơ cá nhân
- Đăng ký khóa học
- Xem trạng thái đăng ký
- Xem lớp học đã tham gia
- Xem lịch học
- Xem tài liệu
- Tải tài liệu
- Kiểm tra trạng thái học phí các khóa học
### ⁠Khách
- Xem danh sách khóa học
- Xem chi tiết khóa học
- Đăng ký tài khoản
- Đăng nhập tài khoản
## Chức năng hệ thống
### ⁠Quản lý tài khoản
- Thêm tài khoản
- Xem thông tin tài khoản
- Cập nhật tài khoản
- Xóa tài khoản
- Khóa/Mở khóa tài khoản
### ⁠Truy cập hệ thống
- Đăng ký tài khoản
- Đăng nhập
- Đăng xuất
- Đổi mật khẩu
### ⁠Quản lý học viên
- Thêm học viên
- Xem thông tin học viên
- Cập nhật thông tin học viên
- Xóa học viên
- Tìm kiếm học viên
- Xem danh sách học viên
### ⁠Quản lý giảng viên
- Thêm giảng viên
- Xem thông tin giảng viên
- Cập nhật thông tin giảng viên
- Xóa giảng viên
- Tìm kiếm giảng viên
- Xem danh sách giảng viên
### ⁠Quản lý khóa học 
- Thêm khóa học
- Xem chi tiết khóa học
- Cập nhật khóa học
- Xóa khóa học
- Tìm kiếm khóa học
- Xem danh sách khóa học
### ⁠Quản lý tài học tập
- Thêm tài liệu
- Xem chi tiết tài liệu
- Cập nhật tài liệu
- Xóa tài liệu
- Tìm tài liệu
- Xem danh sách tài liệu
- Tải xuống tài liệu
- Ẩn/hiển thị tài liệu
### ⁠Quản lý lớp học
- Thêm lớp học
- Xem lớp học
- Cập nhật lớp học
- Xóa lớp học
- Tìm kiếm lớp học
- Xem danh sách lớp học
- Phân công giảng viên
### Quản lý tiến độ học tập
- Thêm tiến độ học tập
- Xem tiến độ học tập
- Cập nhật tiến độ học tập
- Xóa tiến độ học tập
### ⁠Đăng ký khóa học
- Thêm đăng ký học
- Hủy đăng ký học
- Phê duyệt đăng ký
- Xem danh sách học viên của khóa học
### ⁠Quản lý lịch học
- Sắp xếp lịch học
- Xem lịch học
- Cập nhật lịch học
- Xóa lịch học
- Thay đổi lịch học học
## Quản lý phòng học
- Thêm phòng học phòng học
- Cập nhật thông tin phòng học
- Xóa phòng học
- Xem danh sách phòng học
- Tìm kiếm phòng học
- Kiểm tra và cảnh báo trùng lịch học
### Quản lý điểm số
- Cập nhật điểm số
- Tính điểm số và điểm trung bình khóa học
### ⁠Quản lý học phí
- Tra cứu tình trạng học phí
- Xác nhận thu học phí
- Xem lịch sử đóng tiền
### ⁠Chức năng thống kê
- Thống kê số lượng giảng viên
- Thống kê số lượng học viên
- Thống kê số lượng lớp học
- Thống kê số lượng khóa học
- Thống kê số lượng chứng chỉ đã cấp
- Thống kê số lượng đăng ký học
- Thống kê số lượng buổi dạy
- Thống kê doanh thu theo thời điểm
## Đánh giá các chức năng
- Về khóa học, lớp học, lịch học và phòng học: một khóa học sẽ gồm nhiều lớp học, mỗi lớp học sẽ có lịch học và tiến độ học tập của từng lớp. Các phòng học sẽ được phân công trước và đảm bảo không trùng lịch hai lớp khác nhau tại một thời điểm.
- Về khóa học: mỗi khóa sẽ có thông tin về đề cương khóa học, số buổi học, số giờ dạy dự kiến, lộ trình học tập cơ bản (chi tiết được thông báo theo tiến độ). Các khóa học có thể là khóa học có cung cấp chứng chỉ hoặc các khóa học ngắn hạn.
- Về cung cấp chứng chỉ: hệ thống hiện tại chỉ quản lý thông tin chứng chỉ và trạng thái hoàn thành khóa học, không cung cấp chứng chỉ điện tử.
- Về tính năng học online: học viên và giảng viên sẽ học trực tiếp tại trung tâm, giảng viên có thể tự gửi đường dẫn phòng học ảo và điểm danh thủ công nếu có trường hợp bất tiện.
- Về tài liệu học tập: Hệ thống chỉ hỗ trợ lưu trữ, phân loại, tải lên và tải xuống tài liệu phục vụ học tập, hiện tại không hỗ trợ chấm bài tự động.
-  Về tiến độ học tập: do giảng viên mỗi lớp quản lý, bao gồm số buổi đã học, số buổi hoàn thành, phần trăm hoàn thành khóa học.
- Về tính năng thu học phí: giải quyết tạm thời bằng việc thu trực tiếp tại trung tâm và cập nhật tại chỗ hoặc gửi mail có thông tin chuyển khoản học phí (công việc sẽ thực hiện thủ công).
- Về quy định đăng ký khóa học: sẽ có thời gian cho học viên ghi danh trước để sắp xếp lớp học, lịch học và phòng học phù hợp.
## CÔNG CỤ VÀ CÔNG NGHỆ PHÁT TRIỂN
### Công nghệ lập trình Web
- **Frontend:** HTML5, CSS3, JavaScript thuần kết hợp thư viện **Bootstrap 5** để làm giao diện thích ứng.
- **Backend:** Ngôn ngữ JavaScript chạy trên môi trường **Node.js** kết hợp với Framework **Express.js**.
- **Cơ sở dữ liệu:** **MySQL**.
### Công cụ hỗ trợ lập trình
- **Trình viết code:** VS Code.
- **Quản lý mã nguồn:** Git & GitHub.
