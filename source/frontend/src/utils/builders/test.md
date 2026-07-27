# Context: Kiến trúc Field Schema, Builder và các hàm Build trong CRUD Framework

## 1. Mục tiêu kiến trúc

Xây dựng một hệ thống khai báo CRUD dựa trên:

* `FieldBuilder` là Builder chính để tạo field schema.
* `FIELD_DEFAULTS` là nguồn cấu hình mặc định của từng loại field.
* Các hàm `build*()` chịu trách nhiệm chuyển đổi schema sang cấu hình runtime:

  * `buildForm()`
  * `buildTable()`
  * `buildQuery()`
  * `buildWizardForm()`
  * `buildColumns()`

Không tạo quá nhiều Builder class để tránh over-engineering.

Nguyên tắc:

* Builder chỉ dùng cho đối tượng có nhiều hành vi.
* Các cấu hình tổ chức dữ liệu nên dùng function build.
* Field schema là nguồn dữ liệu trung tâm.

---

# 2. FIELD_DEFAULTS

Schema gốc:

```js
const BASE_FIELD = {
  defaultValue: null,

  options: [],

  form: {
    visible: true,
    component: null,
    placeholder: "",
    readonly: false,

    disabled: {
      create: false,
      update: false,
    },
  },

  table: {
    visible: true,
    width: 180,
    align: "left",
    formatter: null,
    renderer: null,
  },

  query: {
    searchable: false,
    sortable: false,

    filter: null,
  },

  validation: {
    required: {
      create: false,
      update: false,
    },

    rules: [],

    trigger: "blur",
  },

  enum: null,

  api: {
    create: true,
    update: true,
  },

  export: {
    visible: true,
  },

  import: {
    visible: true,
  },
};
```

Lưu ý:

* `default` đổi thành `defaultValue`.
* `validation` chứa `rules`.
* `required` nằm trong `validation.required`.
* `component` nằm trong `form.component`.
* Nếu dùng options, nên thống nhất:

  * Hoặc `enum.options`
  * Hoặc `options`

Ưu tiên giữ `enum.options` là nguồn chính.

---

# 3. FieldBuilder

Vai trò:

Tạo Field Schema.

Ví dụ:

```js
f.text("name", "Tên")
  .placeholder("Nhập tên")
  .required()
  .searchable()
  .build();
```

Các nhóm method:

## Form

```js
.placeholder()
.component()
.readonly()
.disabled()
.disableOnCreate()
.disableOnUpdate()
.visibleOnForm()
```

## Table

```js
.width()
.align()
.formatter()
.renderer()
.visibleOnTable()
```

## Query

```js
.searchable()
.sortable()
.filter(type, defaultValue)
```

## Validation

```js
.required()
.requiredOnCreate()
.requiredOnUpdate()
.validation()
.rule()
```

## Enum

```js
.enum(enumDefinition)
```

## Default

```js
.defaultValue(value)
```

---

# 4. buildFields()

Không nên khai báo thủ công toàn bộ type.

Ưu tiên sinh động từ FIELD_DEFAULTS:

```js
export function buildFields() {
  const builders = {};

  Object.keys(FIELD_DEFAULTS)
    .forEach(type => {
      builders[type] = (key, label) =>
        new FieldBuilder(type, key, label);
    });

  return builders;
}
```

Các field đặc biệt có thể override:

```js
select(key, label, enumDefinition)

badge(key, label, enumDefinition)
```

---

# 5. defineFields()

Giữ nguyên.

Chỉ nên đổi kiểm tra builder:

```js
export function defineFields(fields) {
  return Object.fromEntries(
    Object.entries(fields)
      .map(([key, field]) => [
        key,
        typeof field?.build === "function"
          ? field.build()
          : field
      ])
  );
}
```

Lý do:

* Không phụ thuộc instanceof.
* Dễ mở rộng builder khác.

---

# 6. Table

Không tạo TableBuilder.

Dùng:

* TABLE_DEFAULTS
* buildTable()

Ví dụ:

```js
export const TABLE_DEFAULTS = {
  columns: [],

  actions: {
    visible: true,
    width: 180,
    fixed: "right",
    items: [],
  },

  selection: {
    enabled: false,
    multiple: true,
  },

  pagination: {
    enabled: true,
    pageSize: 20,
    pageSizes: [10,20,50,100],
  },

  sort: {
    key: null,
    order: "asc",
  },

  toolbar: {
    visible: true,
    create: true,
    refresh: true,
    search: true,
    filter: true,
    import: true,
    export: true,
  },

  appearance: {
    bordered: false,
    striped: false,
    hover: true,
    size: "default",
  },
};
```

---

# 7. buildColumns()

Nên dùng spread để dễ mở rộng:

```js
export function buildColumns(fields) {
  return Object.values(fields)
    .filter(field => field.table?.visible !== false)
    .map(field => ({
      key: field.key,
      label: field.label,
      type: field.type,

      ...field.table,

      enum: field.enum,
    }));
}
```

Không nên hard-code quá nhiều property.

---

# 8. buildTable()

Chỉ làm nhiệm vụ merge:

```js
export function buildTable(fields, config = {}) {
  const table = structuredClone(TABLE_DEFAULTS);

  return {
    ...table,

    ...config,

    columns: buildColumns(fields),
  };
}
```

Không chứa business logic.

---

# 9. Query

Backend hỗ trợ query phẳng:

```js
{
  search:"",
  sortBy:"",
  sortOrder:"asc",
  page:1,
  limit:10
}
```

Không dùng nested query.

---

## QUERY_DEFAULTS

```js
export const QUERY_DEFAULTS = {
  search:"",

  sortBy:"",

  sortOrder:"asc",

  page:1,

  limit:10,
};
```

---

# 10. buildQuery()

Giữ cấu trúc ban đầu.

```js
export function buildQuery(fields, config = {}) {

  return {

    searchableFields:
      buildSearchFields(fields),

    sortableFields:
      buildSortFields(fields, config),

    filterFields:
      buildFilterFields(fields),

    defaultQuery:
      buildDefaultQuery(fields, config),
  };
}
```

---

# 11. Filter

Backend hỗ trợ filter phẳng.

Ví dụ:

```js
{
 search:"",
 sortBy:"",
 sortOrder:"asc",
 page:1,
 limit:10,

 status:"",
 role:""
}
```

Không dùng:

```js
{
 filters:{
   status:""
 }
}
```

---

# 12. buildDefaultQuery()

Sinh filter từ field:

```js
export function buildDefaultQuery(fields, config={}) {

  const filters = Object.values(fields)
    .reduce((query, field)=>{

      const filter =
        field.query?.filter;

      if(filter){
        query[field.key] =
          filter.defaultValue;
      }

      return query;

    },{});


  return {
    ...QUERY_DEFAULTS,

    ...filters,

    ...config.defaultQuery,
  };
}
```

---

# 13. serializeQuery()

Backend dùng query phẳng nên không cần xử lý object nested.

```js
export function serializeQuery(data){

  const params =
    new URLSearchParams();


  Object.entries(data)
    .forEach(([key,value])=>{

      if(
        value === undefined ||
        value === null ||
        value === ""
      ){
        return;
      }


      if(Array.isArray(value)){
        value.forEach(item =>
          params.append(
            key,
            String(item)
          )
        );

        return;
      }


      params.append(
        key,
        String(value)
      );

    });


  return params.toString();
}
```

---

# 14. Form

buildForm chuyển field schema sang form schema.

Các property đúng:

* `defaultValue`
* `form.component`
* `form.placeholder`
* `form.disabled`
* `validation.required`
* `validation.rules`

---

Ví dụ:

```js
export function buildForm(fields, mode="create") {

 return Object.values(fields)

 .filter(field =>
   field.form?.visible !== false
 )

 .map(field=>({

   key: field.key,

   label: field.label,

   type: field.type,

   defaultValue:
     field.defaultValue,

   ...field.form,

   required:
     field.validation
       ?.required?.[mode] ?? false,

   rules:
     field.validation?.rules ?? [],

   enum:
     field.enum,

 }));

}
```

---

# 15. buildDefaultValues()

Không tự quyết định enum option.

Trách nhiệm:

* FieldDefaults quyết định default.
* FieldBuilder.defaultValue() quyết định override.
* buildDefaultValues chỉ lấy giá trị.

Ví dụ:

```js
{
 name:"",
 status:"active"
}
```

---

# 16. Wizard Form

Không tạo WizardBuilder.

Wizard chỉ là composition của buildForm.

Config:

```js
{
 steps:[
   {
     key:"account",
     title:"Tài khoản",
     fields:[
       "username",
       "password"
     ]
   }
 ]
}
```

buildWizardForm:

* Build form trước.
* Map field vào step.

---

# 17. Nguyên tắc cuối cùng

Kiến trúc:

```
FIELD_DEFAULTS
       |
       v
 FieldBuilder
       |
       v
 Field Schema
       |
       +----------------+
       |                |
       v                v
 buildForm()      buildTable()
       |
       v
 buildWizardForm()


 Field Schema
       |
       v
 buildQuery()
       |
       v
 REST API Query
```

Không thêm:

* QueryBuilder
* TableBuilder
* FormBuilder
* WizardBuilder

trừ khi sau này các phần này có behavior phức tạp riêng.

Mục tiêu là giữ API khai báo đơn giản, schema nhất quán và các hàm build chỉ làm nhiệm vụ chuyển đổi.
