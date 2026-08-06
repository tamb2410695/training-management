import { buildFields, Rules, defineFields } from "@/utils";
import { REGISTRATION_STATUS } from "./registrationEnums";

const Field = buildFields();

export const REGISTRATION_FIELDS = defineFields({
  fullName: Field.text(
    "fullName",
    "Họ và tên",
  )
    .placeholder("Nguyễn Văn A")
    .requiredOnCreate()
    .searchable()
    .sortable()
    .tableWidth(220)
    .col(6)
    .validation(
      Rules.maxLength(100),
    ),

  gender: Field.select(
    "gender",
    "Giới tính",
    [],
  )
    .requiredOnCreate()
    .filter("text")
    .tableWidth(120)
    .col(6),

  dateOfBirth: Field.date(
    "dateOfBirth",
    "Ngày sinh",
  )
    .requiredOnCreate()
    .sortable()
    .tableWidth(140)
    .col(6),

  phone: Field.phone(
    "phone",
    "Số điện thoại",
  )
    .requiredOnCreate()
    .searchable()
    .sortable()
    .tableWidth(150)
    .col(6)
    .validation(
      Rules.maxLength(20),
    ),

  personalEmail: Field.email(
    "personalEmail",
    "Email cá nhân",
  )
    .requiredOnCreate()
    .searchable()
    .sortable()
    .tableWidth(240)
    .col(6)
    .validation(
      Rules.email(),
      Rules.maxLength(255),
    ),

  address: Field.textarea(
    "address",
    "Địa chỉ",
  )
    .col(12)
    .validation(
      Rules.maxLength(255),
    ),

  studentId: Field.select(
    "studentId",
    "Học viên",
    [],
  )
    .filter("text")
    .sortable()
    .tableWidth(150)
    .col(6),

  courseId: Field.select(
    "courseId",
    "Khóa học",
    [],
  )
    .filter("text")
    .sortable()
    .tableWidth(150)
    .col(6),

  registrationStatus: Field.badge(
    "registrationStatus",
    "Trạng thái đăng ký",
    REGISTRATION_STATUS,
  )
    .filter("text")
    .defaultValue(REGISTRATION_STATUS.values[0])
    .sortable()
    .tableWidth(150)
    .requiredOnUpdate()
    .disabled({
      create: true,
      update: false,
    })
    .col(6),

  createdAt: Field.date(
    "createdAt",
    "Ngày tạo",
  )
    .sortable()
    .hideOnForm()
    .tableWidth(160)
    .disableApi()
    .col(6),

  updatedAt: Field.date(
    "updatedAt",
    "Cập nhật cuối",
  )
    .sortable()
    .hideOnTable()
    .hideOnForm()
    .tableWidth(160)
    .disableApi()
    .col(6),
});