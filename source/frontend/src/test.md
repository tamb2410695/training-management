# Context dự án Frontend Architecture

## 1. Kiến trúc tổng quan

Dự án đang xây dựng theo hướng feature-based architecture.

Cấu trúc định hướng:

```
src
├── app
├── components
├── contexts
├── hooks
├── utils
├── services
└── features
    ├── student
    │   ├── components
    │   ├── hooks
    │   ├── services
    │   ├── constants
    │   └── validation
    └── ...
```

Nguyên tắc:

* Component dùng để render UI.
* Hook xử lý logic.
* Context chứa state dùng chung toàn app.
* Feature hook xử lý nghiệp vụ riêng của từng domain.
* Không đưa logic feature vào global context.

---

# 2. Query management

Đang sử dụng `useQueryState`.

Mục tiêu:

* Quản lý query state của từng feature.
* Reset query về trạng thái mặc định.
* Refresh dữ liệu mà không reset query.

Ví dụ:

```js
const query = useFeatureQuery(STUDENT_FEATURE.query);
```

Flow:

```
updateQuery()
      |
      v
query state thay đổi
      |
      v
useEffect bắt query thay đổi
      |
      v
API gọi lại
```

Reset:

```js
query.resetQuery();
```

Ý nghĩa:

* Đưa query về defaultQuery.
* useEffect nhận query mới và gọi API.

Refresh:

```js
query.refresh();
```

Ý nghĩa:

* Không thay đổi filter/page/sort hiện tại.
* Chỉ tạo refreshKey mới để trigger reload API.

---

# 3. useDebounce

Đang dùng cho query search.

Ví dụ:

```js
const debouncedQuery = useDebounce(query.query, 500);

useEffect(() => {
  crud.getList(debouncedQuery);
}, [
  crud.getList,
  debouncedQuery,
]);
```

Mục đích:

* Tránh gọi API liên tục khi user nhập search.
* Chỉ gọi sau khi người dùng dừng thao tác.

---

# 4. CRUD Action architecture

Không để page xử lý trực tiếp.

Tách thành:

```
useFeatureCrudActions
        |
        +-- create
        +-- update
        +-- remove
        +-- refresh
```

Ví dụ:

```js
export function useFeatureCrudActions({
  crud,
  feedback,
}) {

}
```

Feature action chịu trách nhiệm:

* Gọi API.
* Xử lý flow nghiệp vụ.
* Gọi feedback.

Không render UI.

---

# 5. Validation architecture

Có:

```
runValidator()
validateForm()
```

Flow:

```
form.submit
      |
      v
validateForm()
      |
      v
runValidator()
      |
      v
validatorMap
```

Validator trả về:

* object error:

```js
{
 type: "required",
 message: "Tên bắt buộc"
}
```

hoặc:

```js
null
```

Không throw error.

Các lỗi validation client:

* set vào form errors.
* không gửi API.

Các lỗi server:

* đi qua error handler.

---

# 6. Error handling

Có:

```
AppError
ValidationError
errorHandler()
```

errorHandler chuẩn hóa:

```js
{
 errorCode,
 statusCode,
 fieldErrors,
 serverError
}
```

Quy ước:

## ValidationError

Ví dụ:

```js
{
 fieldErrors:{
   email:"Email đã tồn tại"
 }
}
```

Xử lý:

```
form.setErrors(fieldErrors)
```

## AppError

Ví dụ:

```
Không có quyền
Server lỗi
```

Xử lý:

```
feedback.setError()
```

---

# 7. Feedback architecture

Đã thống nhất tách 2 tầng.

## Global

`FeedbackContext`

Nhiệm vụ:

Quản lý trạng thái hiển thị toàn app.

Không biết:

* student
* form
* field
* API

Chứa:

```js
{
 feedback,
 setSuccess,
 setError,
 confirm,
 clearFeedback
}
```

---

## useFeedback

Wrapper của context:

```js
const feedback = useFeedback();
```

Dùng ở mọi nơi.

Ví dụ:

```js
feedback.setSuccess({
 title:"Thành công",
 message:"Lưu dữ liệu thành công"
});
```

---

# 8. FeedbackProvider

Chịu trách nhiệm:

* lưu feedback state.
* chuẩn hóa payload.
* cung cấp action.

State:

```js
{
 type,
 display,
 title,
 message,
 duration
}
```

Ví dụ:

Success:

```js
{
 type:"success",
 display:"toast",
 message:"Tạo thành công"
}
```

Error:

```js
{
 type:"error",
 display:"toast",
 message:"Server lỗi"
}
```

Confirm:

```js
{
 type:"confirm",
 display:"modal",
 title:"Xác nhận xóa",
 message:"Bạn có chắc?"
}
```

---

# 9. FeedbackRenderer

Nằm ở root app.

Ví dụ:

```
App
 |
 FeedbackProvider
 |
 FeedbackRenderer
 |
 Routes
```

Nhiệm vụ:

Mapping state -> UI.

Ví dụ:

```
success
   |
   v
Toast / SuccessAlert


error
   |
   v
Toast / ErrorAlert


confirm
   |
   v
ConfirmModal
```

Feature không render feedback.

---

# 10. UI Feedback Components

Có:

```
Toast
SuccessAlert
ErrorAlert
ConfirmModal
```

Nguyên tắc:

Component chỉ render.

Không:

* gọi API.
* biết feature.
* xử lý business.

---

# 11. ConfirmModal

Flow:

```
User click delete

useFeatureAction

feedback.confirm()

FeedbackRenderer

ConfirmModal

Confirm callback

API delete
```

ConfirmModal nhận:

```js
{
 title,
 message,
 confirmText,
 cancelText,
 onConfirm,
 onCancel
}
```

Không gọi API trực tiếp.

---

# 12. useFeatureFeedback

Đây là lớp nằm giữa feature và global feedback.

Ví dụ:

```
useStudentFeedback
        |
        +-- useFeedback
        |
        +-- form
        |
        +-- errorHandler
```

Nhiệm vụ:

* Map lỗi server.
* Set field errors.
* Chuẩn hóa message theo feature.

Ví dụ:

```js
handleError(error){

 if(error.fieldErrors){
    form.setErrors(error.fieldErrors);
    return;
 }

 feedback.setError({
   message:error.serverError
 });
}
```

---

# 13. Không nên tạo useError/useSuccess global riêng

Không nên:

```
hooks
├── useFeedback
├── useError
└── useSuccess
```

vì dễ trùng trách nhiệm.

Nên:

```
global
└── useFeedback


feature
└── useStudentFeedback
```

---

# 14. Context nên chứa gì?

Context phù hợp cho:

* Auth
* Theme
* Language
* Global feedback
* Global modal

Không phù hợp cho:

* Form state.
* Table query.
* Search input.
* Feature pagination.

---

# 15. Luồng hoàn chỉnh

Ví dụ tạo học viên:

```
Submit form

    |
    v

useStudentActions

    |
    v

form.validate()

    |
    +---- invalid
    |
    v

form.setErrors()


valid

    |
    v

crud.createItem()


success

    |
    v

useStudentFeedback.success()


    |
    v

useFeedback.setSuccess()


    |
    v

FeedbackRenderer


    |
    v

Toast
```

Lỗi:

```
API throw error

    |
    v

catch(error)

    |
    v

useStudentFeedback.handleError()


    |
    +---- fieldErrors
    |          |
    |          v
    |      form.setErrors()
    |
    +---- serverError
               |
               v
          feedback.setError()
```

---

Mục tiêu cuối cùng:

* Feature độc lập.
* Global state tối giản.
* Feedback thống nhất.
* Error handling rõ ràng.
* Component chỉ render.
* Hook xử lý logic.
* Context chỉ chứa dữ liệu dùng chung.
