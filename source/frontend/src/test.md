Context Refactor Frontend - Training Management System
1. Bối cảnh hiện tại

Dự án là hệ thống quản lý trung tâm đào tạo CNTT.

Backend

Backend đã được xây dựng theo hướng phân tầng rõ ràng.

Route
    ↓
Middleware
    ↓
Validator
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
Database

Mỗi module đều có đầy đủ:

accounts
students
staffs
courses
classes
documents
registrations
enrollments
...

Mỗi module đã có CRUD cơ bản và bắt đầu bổ sung các API nghiệp vụ.

Ví dụ:

POST /registrations/:id/approve

POST /registrations/:id/reject

POST /classes/:id/open

POST /classes/:id/close

POST /accounts/:id/reset-password

Backend chịu trách nhiệm:

Business Logic.
Validation.
Authorization.
Transaction.
Error Handling.
API Contract.

Frontend không được chứa Business Logic.

Frontend hiện tại

Frontend đã có hệ thống Component dùng chung khá đầy đủ.

components/

card/

table/

form/

feedback/

toolbar/

query/

modal/

layouts/

view/

Ngoài ra còn có

Generic CRUD
Generic Form
Generic Table
Generic Query
Generic Modal

Các CRUD cơ bản đã hoạt động.

API giữa Backend và Frontend đã cơ bản đồng bộ.

Hiện tại frontend bắt đầu chuyển sang xây dựng nghiệp vụ.

2. Những vấn đề hiện tại

CRUD đã giải quyết được

Create

Update

Delete

List

Detail

Nhưng chưa giải quyết được

Approve

Reject

Cancel

Assign Class

Upload Document

Reset Password

Activate

Deactivate

Đây không còn là CRUD.

Đây là Business Action.

Frontend bắt đầu xuất hiện nhiều câu lệnh

if(status==="PENDING")

if(role==="ADMIN")

if(owner)

...

Nếu tiếp tục sẽ dẫn đến

Component biết nghiệp vụ.
Page biết quá nhiều.
Hook quá lớn.
UI và UX bị gắn chặt.
3. Mục tiêu refactor

Mục tiêu không phải tạo kiến trúc phức tạp.

Mục tiêu là:

UI độc lập

Ví dụ

Hôm nay

Table

Mai đổi thành

Card

hoặc

Kanban

thì

Business vẫn hoạt động.

Ví dụ

Hôm nay

CrudToolbar

Mai đổi thành

Floating Action Button

thì

API

↓

Hook

↓

Workflow

không thay đổi.

Nói cách khác

Frontend hướng tới

Business độc lập với giao diện.

Không phải

Button

↓

API

mà là

Button

↓

Action

↓

Handler

↓

API

Button chỉ là cách thể hiện.

4. Triết lý kiến trúc

Frontend chỉ nên có ba loại trách nhiệm.

Presentation

Hiển thị.

Ví dụ

Table

Card

Modal

Form

Button

Không biết Business.

Application

Điều phối.

Ví dụ

Load Data

Call API

Reload

Navigate

Toast

Dialog

Không chứa Business Rule.

Infrastructure

Ví dụ

Axios

Storage

Context

Router

Utils

Business Rule

↓

Backend.

5. Kiến trúc mong muốn
Page

↓

Feature Runtime / Feature Hook

↓

Feature Service

↓

Backend API

Component không gọi API.

Component không biết Business.

6. Vai trò từng tầng
Component

Chỉ render.

Ví dụ

<DataTable/>

<Card/>

<Button/>

Không chứa

if(role==="ADMIN")

Không gọi API.

Page

Chỉ ghép Component.

Ví dụ

StudentDetailPage

gồm

Header

Toolbar

Overview

Enrollment

Documents

Không chứa Business.

Feature Hook

Đây là tầng Application.

Ví dụ

useStudentsPage()

useRegistrationDetail()

Chịu trách nhiệm

State.
Query.
Loading.
Call Service.
Workflow.
Feedback.

Được phép gọi nhiều Service nếu cùng phục vụ một màn hình.

Ví dụ

registrationService

studentService

documentService
Feature Service

Chỉ gọi API.

Không

Toast

Navigate

Dialog

Không xử lý UI.

7. Khi nào cần Runtime?

Không phải mọi Feature đều cần Runtime.

CRUD

↓

Feature Hook là đủ.

Ví dụ

Students

Khi bắt đầu xuất hiện

Approve

Reject

Assign

Export

History

và

một màn hình cần nhiều Service

↓

Runtime xuất hiện.

Runtime không thay Business.

Runtime chỉ điều phối.

Ví dụ

Registration Runtime

↓

Registration

Student

Documents

History

Policy

Handlers
8. Policy

Policy không phải Authorization.

Authorization

↓

Backend.

Policy chỉ trả lời

UI nên làm gì.

Ví dụ

Role

+

Status

+

Owner

↓

Available Actions

Visible Tabs

Readonly

Visibility

Policy không gọi API.

Policy không sửa Database.

9. Workflow

Workflow nằm trong Hook hoặc Runtime.

Ví dụ

Approve

↓

API

↓

Toast

↓

Reload

↓

Navigate

Không nằm trong Component.

10. Error Flow

Backend

AppError

↓

Error Middleware

↓

HTTP Response

Frontend

Axios

↓

Api Error Resolver

↓

Feature Hook

↓

Feedback Context

↓

UI

Frontend không cần AppError.

Frontend chỉ chuẩn hóa lỗi.

Error Code

Backend

EMAIL_EXISTS

CLASS_FULL

ACCOUNT_LOCKED

Frontend dùng chung Code.

Không dùng Message Backend.

Frontend tự ánh xạ

EMAIL_EXISTS

↓

Email đã tồn tại.

Success cũng tương tự.

ACCOUNT_CREATED

↓

Tạo tài khoản thành công.

Code là Contract.

Message là Presentation.

11. Business Action

Mỗi nút nghiệp vụ nên có API riêng.

Ví dụ

Không

PATCH registration

mà

POST approve

POST reject

POST assign-class

Frontend Action

↓

Backend API

↓

Business.

12. Nguyên tắc phát triển

Không thiết kế Runtime trước.

Không thiết kế Policy trước.

Không chia nhỏ Hook từ đầu.

Chỉ tách khi

Hook quá lớn.
Một màn hình cần nhiều nguồn dữ liệu.
Có nhiều Workflow.
Có nhiều trạng thái.

Đây là Progressive Architecture.

13. Khả năng tái sử dụng

Điều cần tái sử dụng không phải Component.

Điều cần tái sử dụng là

Business Workflow

API

Query

Feedback

Form

Table

View

Component chỉ là lớp ngoài.

Ví dụ

Table

↓

Card

↓

Timeline

↓

Tree

thì

Business

không đổi.

14. Nguyên tắc tránh Over Engineering

Không tạo Runtime cho mọi Feature.

Không tạo Policy cho mọi Feature.

Không tạo Action Engine.

Không tạo Event Bus.

Không tạo State Machine.

Không tạo Plugin System.

Không tạo hàng chục Hook nhỏ chỉ để "đẹp kiến trúc".

Không thêm abstraction khi chỉ có một nơi sử dụng.

15. Tiêu chí đánh giá sau Refactor

Sau khi refactor hoàn thành, frontend nên đạt được các tiêu chí sau:

Tách biệt trách nhiệm
Component chỉ hiển thị.
Page chỉ tổ chức bố cục.
Hook/Runtime điều phối nghiệp vụ giao diện.
Service chỉ giao tiếp API.
Backend chịu trách nhiệm Business Logic.
UI độc lập với Business

Có thể thay đổi

DataTable

thành

Card List

hoặc

Kanban

mà không phải sửa Hook hay Service.

Có thể thay đổi

CrudToolbar

thành

Dropdown Menu

hoặc

Context Menu

mà workflow vẫn giữ nguyên.

UX độc lập với Component

Một Action như

Approve Registration

có thể được kích hoạt từ:

Button trên Toolbar.
Menu chuột phải.
Card Action.
Phím tắt.
Wizard.

Tất cả đều gọi cùng một Handler trong Hook/Runtime.

Điều này có nghĩa UX (cách người dùng tương tác) được tách khỏi UI (cách hiển thị).

Khả năng mở rộng

Có thể bổ sung thêm Business Action mới mà không phải sửa Component dùng chung.

Có thể bổ sung thêm giao diện mới mà không phải sửa Service.

Có thể bổ sung thêm Workflow mới mà không phải sửa DataTable hay DynamicForm.

Kết luận

Mục tiêu cuối cùng của quá trình refactor không phải là tạo ra nhiều tầng hơn, mà là đạt được sự phân tách rõ ràng giữa dữ liệu, điều phối và hiển thị.

Kiến trúc nên hướng đến nguyên tắc:

Backend định nghĩa nghiệp vụ (Business). Frontend điều phối trải nghiệm (Application/UX). Component chỉ chịu trách nhiệm hiển thị (UI).

Nhờ đó, nghiệp vụ không phụ thuộc vào giao diện, và giao diện có thể thay đổi hoặc tái sử dụng mà không làm thay đổi luồng xử lý của hệ thống. Đây là mục tiêu quan trọng nhất của quá trình refactor và cũng là tiêu chí để tránh over-engineering: chỉ bổ sung thêm tầng khi nó thực sự giúp giảm sự phụ thuộc hoặc giảm độ phức tạp của mã nguồn, không phải chỉ để "đẹp kiến trúc".