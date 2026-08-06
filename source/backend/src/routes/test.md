Dưới đây là context tổng hợp đầy đủ để tiếp tục phát triển hệ thống ở các lượt sau. Nội dung bao gồm:

Kiến trúc nghiệp vụ ban đầu
Các module đã phân tích
Các quyết định thiết kế đã thống nhất
Các phần đã hoàn thiện
Các phần đang tiếp tục xây dựng
Quy tắc code style và pattern cần giữ
PROJECT CONTEXT — ACCOUNT / USER / PROFILE MANAGEMENT SYSTEM
1. Tổng quan kiến trúc

Hệ thống backend Node.js + Express + MySQL.

Kiến trúc module:

modules
│
├── accounts
│   ├── accounts.controller.js
│   ├── accounts.service.js
│   ├── accounts.repository.js
│   ├── accounts.middleware.js
│   └── accounts.constants.js
│
├── users
│   └── userCreation.service.js
│
├── registrations
│   ├── registrations.controller.js
│   ├── registrations.service.js
│   ├── registrations.repository.js
│   ├── registrations.middleware.js
│   └── registrations.constants.js
│
├── students
│   ├── students.controller.js
│   ├── students.service.js
│   ├── students.repository.js
│   ├── students.middleware.js
│   └── students.constants.js
│
├── staffs
│   ├── staffs.controller.js
│   ├── staffs.service.js
│   ├── staffs.repository.js
│   ├── staffs.middleware.js
│   └── staffs.constants.js
2. Nguyên tắc nghiệp vụ quan trọng
Account

Account là entity gốc.

Account chịu trách nhiệm:

authentication
username
email
password
role
account status

Account không biết profile.

Profile

Profile chỉ tồn tại khi có Account.

Ví dụ:

ACCOUNT
 |
 +---- STUDENT_PROFILE

ACCOUNT
 |
 +---- STAFF_PROFILE

Không cho phép:

POST /students
POST /staffs

để tạo profile trực tiếp.

Lý do:

Tránh:

STAFF_PROFILE
      |
      X
 không có ACCOUNT
3. Luồng tạo user chuẩn
Student
Registration
     |
     |
registrationService.approve()
     |
     |
userCreationService.createStudent()
     |
     |
accountsService.create()
     |
     |
studentsService.createProfile()
Staff
Admin tạo staff
       |
       |
userCreationService.createStaff()
       |
       |
accountsService.create()
       |
       |
staffService.createProfile()
4. Pattern Service chuẩn

Service gồm:

Public API

Controller gọi.

Ví dụ:

getList()
getById()
update()
remove()
Internal API

Service khác gọi.

Ví dụ:

createProfile()

Không expose qua router/controller.

5. Registration module (tham khảo chuẩn)

Registration đã là module tham chiếu.

Pattern:

Controller

Có:

getList
getById

create
update
remove

approve
reject
Service

Có:

getList
getById

create
update
remove

approve
reject

Approve chịu trách nhiệm:

Registration
      |
      |
User Creation
      |
      |
Student Account
      |
      |
Student Profile
6. Account module
accounts.constants.js

Đã điều chỉnh hướng tới:

ACCOUNT_FIELDS

QUERY
{
 SEARCHABLE
 SORTABLE
 FILTERS
 ALLOWED_KEYS
}


BODY
{
 CREATE
 UPDATE
 CHANGE_PASSWORD
}


REQUIRED
{
 CREATE
}
Account Service hoàn thiện hướng:

Có:

getList()

getById()

create()

update()

remove()

restore()

updateStatus()

changeRole()
Account create flow
validate
 |
format
 |
check username duplicate
 |
check email duplicate
 |
hash password
 |
resolve role
 |
insert account
 |
return safe data
Account không trả passwordHash

Các response:

const {
 passwordHash,
 ...safeAccount
}=account;
7. Account Controller chuẩn

Đã thống nhất:

getList

getById

create

update

remove

restore

activate

lock

disable

pending

Không thêm logic.

Controller chỉ:

request
 |
service
 |
response
8. Account Router chuẩn

Có:

GET    /accounts

POST   /accounts

GET    /accounts/:id

PATCH  /accounts/:id

DELETE /accounts/:id

PATCH  /accounts/:id/restore

PATCH  /accounts/:id/activate

PATCH  /accounts/:id/lock

PATCH  /accounts/:id/disable

PATCH  /accounts/:id/pending
9. Student module
Nghiệp vụ

Student profile không tự tạo.

Không có:

POST /students

Controller không export create.

Student Service public
getList()

getById()

update()

remove()
Student Service internal
createProfile()

Dùng bởi:

userCreationService.createStudent()
Student Repository

Yêu cầu:

Không hard-code query lặp lại.

Pattern:

find()
findById()
findByAccountId()
findByCode()
findByPhone()

create()

update()

remove()
10. Staff module

Đang hoàn thiện theo Student.

Staff constant

Đã định hướng:

STAFF_PROFILE_FIELDS

Bao gồm:

QUERY:

SEARCHABLE

SORTABLE

FILTERS

ALLOWED_KEYS

BODY:

CREATE
UPDATE
Staff fields

Profile:

staffId

accountId

staffCode

fullName

gender

dateOfBirth

phone

personalEmail

address

hireDate

staffStatus

Account join:

username

accountEmail

accountStatus

roleCode

roleLabel
11. Staff Repository

Cần giữ pattern giống Student.

Các hàm:

find()

findById()

findByAccountId()

findByCode()

findByPhone()

create()

update()

remove()

Không tạo profile trực tiếp từ controller.

12. Staff Service đã điều chỉnh

Public:

getList()

getById()

update()

remove()

Internal:

createProfile()
createProfile flow
check accountId

check account exists

check account already linked

check phone duplicate

create STAFF_PROFILE

generate staffCode

update profile
remove staff flow
Staff profile
       |
       |
soft delete Account
       |
       |
update staffStatus TERMINATED

Transaction:

withTransaction()
13. Staff Controller cuối cùng

Không có:

create()

Không import:

userCreationService

Controller:

getList()

getById()

update()

remove()
14. Middleware Pattern

Middleware chuẩn giống Registration.

Bao gồm:

Query
validateAllowedFields()

sanitizeFields()

pickFields()

formatQuery()

validateFormats()
Params
formatNumericId()

validateId()
Create
validateAllowedFields()

pickFields()

sanitizeFields()

validateRequiredFields()

formatData()

validateFormats()
Patch
sanitizePatchBody()

check empty

formatData()

validateFormats()
15. Repository rule quan trọng

Không viết SQL lặp.

Sai:

findById()
findByPhone()
findByAccountId()

mỗi hàm copy SELECT dài.

Nên tạo:

const BASE_SELECT = `
SELECT ...
`

const BASE_JOIN = `
FROM ...
JOIN ...
`

Sau đó:

`${BASE_SELECT}
${BASE_JOIN}
WHERE xxx`
16. Query Builder

Các repository dùng:

queryBuilder.buildQueryOptions()

Input:

{
 page,
 limit,

 search,
 searchField,
 searchableFields,
 searchMap,

 sortBy,
 sortOrder,
 sortMap,

 filters,
 filterMap
}

Output:

{
 pagination,

 searchResult,

 filterResult,

 sortClause
}
17. Quy tắc tiếp tục phát triển

Khi xây module mới:

Controller

Không chứa:

validation
business logic
transaction

Chỉ:

req
 |
service
 |
response
Service

Chứa:

business rule
transaction
duplicate check
lifecycle
Repository

Chứa:

SQL
database mapping
Constants

Chứa:

field whitelist
query mapping
Middleware

Chứa:

request validation
sanitize
formatter
18. Các việc tiếp tục cần làm

Danh sách tiếp theo:

Hoàn thiện staff.middleware.js
Hoàn thiện staff.validator.js
Hoàn thiện staff.formatter.js
Hoàn thiện staff.routes.js
Xây dựng userCreation.service.createStaff()
Rà soát students.repository bỏ SQL lặp
Đồng bộ toàn bộ status constants:
ACCOUNT_STATUS
STUDENT_STATUS
STAFF_STATUS
Chuẩn hóa ERROR_CODES
Chuẩn hóa SUCCESS_CODES
Review transaction toàn hệ thống
Context tiếp tục

Khi tiếp tục, giữ nguyên các quyết định:

Profile không tạo trực tiếp từ API.
createProfile() chỉ internal.
userCreationService là orchestrator tạo Account + Profile.
Controller không gọi repository.
Repository không chứa business logic.
Service dùng transaction khi ảnh hưởng nhiều bảng.
Dùng constant thay hard-code status.
Dùng queryBuilder thay build query thủ công.
Không trả passwordHash ra ngoài.

Đây là baseline để tiếp tục hoàn thiện các module còn lại.