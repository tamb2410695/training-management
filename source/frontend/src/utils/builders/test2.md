Tổng hợp kiến trúc Frontend Architecture: Feature-based + Schema-driven + Policy-based

Tài liệu này tổng hợp toàn bộ nội dung đã trao đổi về cách thiết kế feature account và mở rộng kiến trúc schema-driven cho toàn bộ frontend.

Mục tiêu:

Feature độc lập.
Global builder tái sử dụng.
Schema không chứa business logic.
Policy xử lý nghiệp vụ.
Context tối giản.
Component chỉ render.
Hook xử lý logic.
Runtime schema là cầu nối giữa business và UI.
1. Kiến trúc tổng quan ban đầu

Dự án theo hướng feature-based:

src
├── app
├── components
├── contexts
├── hooks
├── utils
├── services
└── features
    ├── account
    ├── student
    ├── course
    └── ...

Nguyên tắc:

Component

Chỉ:

Render UI.
Nhận props.
Trigger callback.

Không:

Gọi API.
Xử lý permission.
Quyết định business.
Hook

Chịu trách nhiệm:

State logic.
Workflow.
Gọi action.
Kết nối feature.

Ví dụ:

useAccountActions()
useAccountSchema()
useAccountQuery()
Context

Chỉ chứa global state:

Phù hợp:

Auth.
Theme.
Language.
Feedback.
Global modal.

Không phù hợp:

Form state.
Table query.
Search.
Pagination.
2. Kiến trúc hiện tại của query

Đang dùng:

useQueryState

Mục tiêu:

Quản lý filter.
Pagination.
Sort.
Refresh.

Flow:

updateQuery()

      |
      v

query state thay đổi

      |
      v

useEffect

      |
      v

API reload
Reset
query.resetQuery();

Ý nghĩa:

Trả về default query.
Trigger API lại.
Refresh
query.refresh();

Ý nghĩa:

Giữ nguyên filter.
Giữ nguyên page.
Chỉ thay đổi refresh key.
3. CRUD Action Architecture

Không xử lý CRUD trong page.

Sai:

Page
 |
 +-- API
 +-- Feedback
 +-- Error

Đúng:

useFeatureActions

        |
        +-- create
        +-- update
        +-- delete
        +-- refresh

Ví dụ:

useAccountActions({
  service,
  feedback
})

Chịu trách nhiệm:

API call.
Workflow.
Feedback.
Refresh query.

Không render UI.

4. Validation Architecture

Flow:

submit

 |
 v

validateForm()

 |
 v

runValidator()

 |
 v

validatorMap

Validator trả:

Thành công:

null

Lỗi:

{
 type:"required",
 message:"Tên bắt buộc"
}

Không throw.

Phân loại lỗi:

Client validation

Ví dụ:

Required.
Format.
Length.

Xử lý:

form.setErrors()
Server validation

Ví dụ:

email đã tồn tại

Đi qua:

errorHandler
5. Error Handling

Có:

AppError
ValidationError
errorHandler()

Chuẩn hóa:

{
 errorCode,
 statusCode,
 fieldErrors,
 serverError
}
ValidationError

Ví dụ:

{
 fieldErrors:{
   email:"Email đã tồn tại"
 }
}

Xử lý:

form.setErrors(fieldErrors)
AppError

Ví dụ:

Không quyền.
Server lỗi.

Xử lý:

feedback.setError()
6. Feedback Architecture

Tách hai tầng.

Global FeedbackContext

Chứa:

{
 feedback,

 setSuccess,

 setError,

 confirm,

 clearFeedback
}

Không biết:

Account.
Student.
Form.
API.
useFeedback

Wrapper:

const feedback = useFeedback();

Ví dụ:

feedback.setSuccess({
 title:"Thành công",
 message:"Lưu thành công"
});
FeedbackRenderer

Đặt ở root:

App

 |
FeedbackProvider

 |
FeedbackRenderer

 |
Routes

Mapping:

success
  |
  v
Toast


error
  |
  v
ErrorToast


confirm
  |
  v
ConfirmModal
7. Confirm Modal

Flow:

User click delete

      |
      v

useAccountActions

      |
      v

feedback.confirm()

      |
      v

ConfirmModal

      |
      v

onConfirm

      |
      v

API delete

ConfirmModal không gọi API.

8. Enum Architecture

Enum chỉ chứa metadata.

Ví dụ:

export const ACCOUNT_STATUS = buildEnum({
  ACTIVE:{
    label:"Đang hoạt động",
    color:"success"
  },

  DELETED:{
    label:"Đã xóa",
    color:"dark"
  }
});

Không thêm:

editable
canUpdate
canDelete

vì đó là business.

9. Vấn đề với DELETED status

Không nên đưa trực tiếp:

ACCOUNT_STATUS.options

vào select.

Vì admin có thể chọn:

DELETED

mà không qua API delete.

Giải pháp:

Tạo status transition policy.

Ví dụ:

STATUS_TRANSITIONS = {

 ACTIVE:[
   "LOCKED",
   "DISABLED"
 ],

 LOCKED:[
   "ACTIVE"
 ],

 DELETED:[]
}

Khi build form:

Current status
        |
        v
Status Policy
        |
        v
Available options
10. Schema-driven Architecture

Schema mô tả cấu trúc.

Ví dụ:

{
 key:"role",

 label:"Vai trò",

 type:"select",

 enum:ACCOUNT_ROLE
}

Không chứa:

if(student)

hoặc:

canEdit:false
11. Policy Architecture

Policy là lớp business nằm giữa schema và UI.

Luồng:

Schema

+

Context

+

Policy

      |

      v

Runtime Schema

      |

      v

UI
12. Policy nên là constant hay function?

Không nên toàn bộ là constant.

Nên chia:

constants

    |
    +-- static rule


policies

    |
    +-- runtime decision


utils

    |
    +-- helper
Constant

Ví dụ:

ROLE_GROUP = {

 STUDENT:[
   "STUDENT"
 ],

 STAFF:[
   "ADMIN",
   "INSTRUCTOR"
 ]

}
Policy Resolver

Ví dụ:

resolveRolePolicy({
 mode,
 account,
 currentUser
})
Utils

Chỉ xử lý chung:

Ví dụ:

filterOptions()
mergePolicy()
applyOverride()

Không chứa business.

13. Các loại Policy trong Account
1. Field Policy

Quyết định:

visible.
readonly.
disabled.

Ví dụ:

Student update:

role readonly

Staff update:

role editable
2. Role Policy

Xử lý:

Role nào được chọn.
Có đổi role không.

Ví dụ:

Student:

{
 readonly:true,

 options:[
   "STUDENT"
 ]
}

Staff:

{
 readonly:false,

 options:[
   "ADMIN",
   "INSTRUCTOR"
 ]
}
3. Status Policy

Xử lý:

Status transition.
Không cho chọn trạng thái không hợp lệ.
4. Action Policy

Quyết định:

Ví dụ:

{
 canEdit:true,
 canDelete:true,
 canRestore:false
}
5. Workflow Policy

Xử lý:

Wizard step.
API flow.
Mapper.
14. Builder Architecture

Builder dùng chung cho toàn app.

Ví dụ:

src/utils/builders

├── buildForm
├── buildTable
├── buildWizard
├── buildQuery
└── buildValidation

Builder không biết:

account.
student.
role.

Builder nhận:

Schema runtime

Không nhận business.

15. Runtime Schema

Đây là output cuối.

Ví dụ:

Input:

role field

Sau resolve:

{
 key:"role",

 component:"select",

 readonly:true,

 options:[
   {
    value:"STUDENT",
    label:"Học viên"
   }
 ]
}

FormRenderer chỉ render.

16. Vấn đề của buildFeature hiện tại

Hiện tại:

buildFeature({
 fields,
 config,
 wizard
})

đang làm:

const table = buildTable()

const forms = buildForm()

const validation = buildValidation()

const wizard = buildWizard()

Ngay khi import.

Vấn đề:

Chưa có:

account.
user.
permission.
mode runtime.

Không áp dụng được policy.

17. Tách Feature Definition và Feature Resolver
Feature Definition

Chỉ chứa metadata.

Ví dụ:

export const ACCOUNT_FEATURE =
defineFeature({

 name:"account",

 fields:ACCOUNT_FIELDS,

 config:ACCOUNT_CONFIG,

 wizard:ACCOUNT_WIZARD_CONFIG,

 policies:ACCOUNT_POLICIES

});
Feature Resolver

Runtime:

resolveFeature({
 feature:ACCOUNT_FEATURE,

 context:{
   mode:"update",
   account,
   currentUser
 }
})

Output:

{
 forms,
 validation,
 wizard,
 table,
 query
}
18. Cấu trúc Account Feature đề xuất
features/account

├── account.feature.js

├── constants
│   ├── accountRole.js
│   └── accountStatus.js


├── schemas
│   ├── account.fields.js
│   ├── account.wizard.js
│   ├── account.table.js
│   └── account.filter.js


├── policies
│   ├── role.policy.js
│   ├── status.policy.js
│   ├── action.policy.js
│   └── workflow.policy.js


├── hooks
│   ├── useAccountSchema.js
│   └── useAccountActions.js


├── services
│   ├── studentAccount.service.js
│   └── staffAccount.service.js


├── mappers
│   ├── student.mapper.js
│   └── staff.mapper.js


└── validation
19. Account Workflow
Create Student
Account

   |

Student Profile

   |

Student API
Create Staff
Account

   |

Staff Profile

   |

Permission

   |

Staff API
20. Flow tổng thể cuối cùng
Feature Definition

        |

        v

Context

(mode,
account,
currentUser)

        |

        v

Policy Resolver

        |

        v

Resolved Schema

        |

        v

Global Builder

        |

        v

Runtime Schema

        |

        +--------------+
        |              |
        v              v

     UI             Action

                     |

                     v

                  Service API
21. Thứ tự triển khai thực tế
Phase 1

Refactor nền:

Tạo defineFeature.
Tách khỏi buildFeature.
Tạo resolveFeature.
Phase 2

Policy:

Role policy.
Status policy.
Action policy.
Workflow policy.
Phase 3

Runtime schema:

resolveFields.
Sửa buildForm.
Sửa buildWizard.
Sửa validation.
Phase 4

Account workflow:

Student service.
Staff service.
Submit resolver.
Hoàn thiện useAccountSchema.
Kết luận kiến trúc

Mô hình cuối:

Schema
    |
    |
Policy
    |
    |
Context
    |
    v
Resolver
    |
    v
Builder
    |
    v
Runtime Schema
    |
    +-- Form
    +-- Table
    +-- Wizard
    +-- Validation
    +-- Action

Quy tắc cốt lõi:

Schema trả lời: "Có những gì?"
Policy trả lời: "Được làm gì?"
Builder trả lời: "Render như thế nào?"
Action trả lời: "Thực thi ra sao?"

Đây là nền tảng phù hợp để mở rộng từ account sang các feature khác mà không làm business logic bị phân tán.