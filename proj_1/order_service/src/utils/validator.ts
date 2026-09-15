import Ajv, { type Schema } from "ajv"; // Nhập thư viện Ajv (dùng để validate JSON Schema) và kiểu Schema từ gói ajv

const ajv = new Ajv(); // Khởi tạo một instance (đối tượng) mới của Ajv để sử dụng các tính năng biên dịch schema

export const ValidateRequest = <T>(requestBody: unknown, schema: Schema) => { // Định nghĩa hàm generic ValidateRequest nhận vào dữ liệu cần kiểm tra và schema quy chuẩn
    const validatedData = ajv.compile<T>(schema); // Biên dịch schema thành một hàm kiểm tra (validator function) ép kiểu về <T>

    if (validatedData(requestBody)) { // Gọi hàm validate với dữ liệu truyền vào. Nếu trả về true (nghĩa là dữ liệu HỢP LỆ)
        return false; // Hàm hiện tại đang trả về false khi dữ liệu hợp lệ (Bạn có thể muốn kiểm tra lại logic này, thường hợp lệ sẽ trả về true hoặc null)
    }

    const errors = validatedData.errors?.map((err) => err.message); // Nếu dữ liệu không hợp lệ, lấy ra mảng chứa các thông điệp lỗi (error messages)

    return errors && errors[0]; // Trả về thông báo lỗi đầu tiên tìm được (nếu có lỗi)
};