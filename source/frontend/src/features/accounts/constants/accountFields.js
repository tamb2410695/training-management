import { buildFields, Rules, defineFields } from "@/utils";
import { ACCOUNT_ROLES, ACCOUNT_STATUS } from "./accountEnums";

const Field = buildFields();

export const ACCOUNT_FIELDS = defineFields({
  username: Field.text("username", "Tên đăng nhập")
    .placeholder("username123")
    .requiredOnCreate()
    .searchable()
    .sortable()
    .tableWidth(180)
    .col(6)
    .validation(
      Rules.minLength(4),
      Rules.maxLength(50),
    ),

  email: Field.email("email", "Email tài khoản")
    .placeholder("example@gmail.com")
    .required()
    .searchable()
    .sortable()
    .tableWidth(260)
    .col(6)
    .validation(
      Rules.email(),
      Rules.maxLength(255),
    ),

  password: Field.password("password", "Mật khẩu")
    .defaultValue("")
    .required({
      create: true,
      update: false,
    })
    .hideOnTable()
    .col(6)
    .validation(
      Rules.minLength(8),
      Rules.maxLength(100),
    ),

  roleCode: Field.select(
    "roleCode",
    "Vai trò",
    ACCOUNT_ROLES,
  )
    .required({create: true})
    .filter("text")
    .sortable()
    .tableWidth(150)
    .disabled({
      create: true,
      update: false,
    })
    .required()
    .col(6),

  accountStatus: Field.badge(
    "accountStatus",
    "Trạng thái tài khoản",
    ACCOUNT_STATUS,
  )
    .filter("text")
    .defaultValue(ACCOUNT_STATUS.values[0])
    .tableWidth(150)
    .requiredOnUpdate()
    .disabled({
      create: true,
      update: false,
    })
    .col(6),

  createdAt: Field.date(
    "createdAt",
    "Ngày tạo tài khoản",
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