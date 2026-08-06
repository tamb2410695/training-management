import { buildFields, Rules, defineFields } from "@/utils";
import { GENDER, STAFF_STATUS } from "./profileEnums";
import { ACCOUNT_ROLES, ACCOUNT_STATUS } from "@/features/accounts";

const Field = buildFields();
export const STAFF_PROFILE_FIELDS = defineFields({
  username: Field.text("username", "Tên đăng nhập")
    .placeholder("staff01")
    .requiredOnCreate()
    .disableOnUpdate()
    .disableApiUpdate()
    .searchable()
    .hideOnTable()
    .col(6)
    .validation(Rules.minLength(4), Rules.maxLength(50)),

  accountEmail: Field.email("accountEmail", "Email tài khoản")
    .placeholder("staff@academy.edu.vn")
    .requiredOnCreate()
    .disableOnUpdate()
    .disableApiUpdate()
    .searchable()
    .hideOnTable()
    .col(6)
    .validation(Rules.email(), Rules.maxLength(255)),

  password: Field.password("password", "Mật khẩu")
    .requiredOnCreate()
    .defaultValue("")
    .hideOnTable()
    .col(6)
    .validation(Rules.minLength(8), Rules.maxLength(100)),

  staffCode: Field.text("staffCode", "Mã nhân viên")
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
    .placeholder("Nhập họ và tên")
    .searchable()
    .sortable()
    .tableWidth(220)
    .col(6)
    .validation(Rules.minLength(2), Rules.maxLength(100)),

  gender: Field.select("gender", "Giới tính", GENDER)
    .defaultValue(GENDER.values[2])
    .filter("text")
    .col(6)
    .required(),


  dateOfBirth: Field.date("dateOfBirth", "Ngày sinh")
    .col(6)
    .required()
    .validation(Rules.pastDate()),

  phone: Field.phone("phone", "Số điện thoại")
    .required()
    .placeholder("Nhập số điện thoại")
    .searchable()
    .tableWidth(150)
    .col(6)
    .validation(Rules.phone(), Rules.minLength(10), Rules.maxLength(15)),

  personalEmail: Field.email("personalEmail", "Email cá nhân")
    .placeholder("example@gmail.com")
    .col(6)
    .validation(Rules.email(), Rules.maxLength(255)),

  address: Field.textarea("address", "Địa chỉ")
    .placeholder("Địa chỉ liên hệ")
    .hideOnTable()
    .col(12)
    .validation(Rules.maxLength(500)),

  roleCode: Field.select("roleCode", "Vai trò", ACCOUNT_ROLES)
    .requiredOnCreate()
    .disableOnUpdate()
    .disableApiUpdate()
    .filter("text")
    .tableWidth(160)
    .col(6),

  staffStatus: Field.badge("staffStatus", "Trạng thái nhân viên", STAFF_STATUS)
    .defaultValue(STAFF_STATUS.values[0])
    .filter("text")
    .disabled({
      create: true,
    })
    .requiredOnUpdate()
    .disableApiCreate()
    .tableWidth(150)
    .col(6),

  accountStatus: Field.badge(
    "accountStatus",
    "Trạng thái tài khoản",
    ACCOUNT_STATUS,
  )
    .defaultValue(ACCOUNT_STATUS.values[0])
    .filter("text")
    .disabled({
      create: true,
      update: true,
    })
    .disableApi()
    .tableWidth(150)
    .col(6),

  createdAt: Field.date("createdAt", "Ngày tạo")
    .sortable()
    .hideOnForm()
    .disableApi()
    .tableWidth(170)
    .col(6),

  updatedAt: Field.date("updatedAt", "Cập nhật cuối")
    .sortable()
    .hideOnForm()
    .hideOnTable()
    .disableApi()
    .tableWidth(170)
    .col(6),
});
