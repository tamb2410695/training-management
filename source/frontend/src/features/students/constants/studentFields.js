import { buildFields, Rules, defineFields } from "@/utils";
import { STUDENT_GENDER, STUDENT_STATUS } from "./studentEnums";
import { ACCOUNT_STATUS } from "@/features/accounts";

const Field = buildFields();

export const STUDENT_FIELDS = defineFields({
  username: Field.text("username", "Tên đăng nhập")
    .placeholder("student01_123")
    .searchable()
    .hideOnTable()
    .col(6)
    .validation(Rules.minLength(4), Rules.maxLength(50))
    .requiredOnCreate()
    .disableOnUpdate()
    .disableApiUpdate(),

  accountEmail: Field.email("accountEmail", "Email tài khoản")
    .placeholder("student@gmail.com")
    .searchable()
    .hideOnTable()
    .col(6)
    .validation(Rules.email(), Rules.maxLength(255))
    .requiredOnCreate()
    .disableOnUpdate()
    .disableApiUpdate(),

  password: Field.password("password", "Mật khẩu")
    .requiredOnCreate()
    .defaultValue("")
    .hideOnTable()
    .col(6)
    .validation(Rules.minLength(8), Rules.maxLength(100)),

  studentCode: Field.text("studentCode", "Mã học viên")
    .disableOnCreate()
    .disableOnUpdate()
    .disableApi()
    .searchable()
    .sortable()
    .tableWidth(180)
    .col(6)
    .validation(Rules.maxLength(20)),

  fullName: Field.text("fullName", "Họ và tên")
    .required()
    .placeholder("Họ và tên học viên")
    .searchable()
    .sortable()
    .tableWidth(220)
    .col(6)
    .validation(Rules.minLength(2), Rules.maxLength(100)),

  personalEmail: Field.email("personalEmail", "Email cá nhân")
    .placeholder("Bỏ qua nếu là Email tài khoản")
    .col(6)
    .validation(Rules.email(), Rules.maxLength(255)),

  gender: Field.select("gender", "Giới tính", STUDENT_GENDER)
    .defaultValue(STUDENT_GENDER.values[2])
    .filter("text")
    .col(6),

  dateOfBirth: Field.date("dateOfBirth", "Ngày sinh")
    .required()
    .col(6)
    .validation(Rules.pastDate()),

  phone: Field.phone("phone", "Số điện thoại")
    .required()
    .placeholder("Số điện thoại học viên")
    .searchable()
    .tableWidth(140)
    .col(6)
    .validation(Rules.phone(), Rules.minLength(10), Rules.maxLength(15)),

  address: Field.textarea("address", "Địa chỉ")
    .hideOnTable()
    .placeholder("Địa chỉ liên hệ học viên")
    .col(12)
    .validation(Rules.maxLength(500)),

  studentStatus: Field.badge("studentStatus", "Trạng thái học", STUDENT_STATUS)
    .filter("text")
    .defaultValue(STUDENT_STATUS.values[0])
    .disabled({
      create: true,
    })
    .required()
    .disableApiCreate()
    .tableWidth(140)
    .col(6),

  accountStatus: Field.badge(
    "accountStatus",
    "Trạng thái tài khoản",
    ACCOUNT_STATUS,
  )
    .filter("text")
    .defaultValue(ACCOUNT_STATUS.values[0])
    .disabled({
      create: true,
      update: true,
    })
    .tableWidth(140)
    .col(6)
    .disableApi(),

  createdAt: Field.date("createdAt", "Ngày tạo hồ sơ")
    .sortable()
    .hideOnForm()
    .tableWidth(150)
    .disableApi()
    .col(6),

  updatedAt: Field.date("updatedAt", "Cập nhật cuối")
    .sortable()
    .hideOnTable()
    .hideOnForm()
    .tableWidth(150)
    .disableApi()
    .col(6),
});
