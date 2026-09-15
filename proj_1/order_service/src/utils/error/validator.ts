import { validate } from "class-validator"; // Nhập hàm validate từ thư viện class-validator để kiểm tra dữ liệu đối tượng dựa trên decorators

export const ValidateError = async (
    input: any
): Promise<Record<string, any> | false> => { // Khai báo hàm bất đồng bộ nhận vào một đối tượng đầu vào (input) và trả về mảng/đối tượng lỗi hoặc false nếu hợp lệ
    const error = await validate(input, {
        ValidationError: { target: true, property: true },
    }); // Thực hiện validate đối tượng class; trả về một mảng chứa các lỗi nếu dữ liệu không hợp lệ

    if (error.length) { // Kiểm tra xem mảng lỗi có phần tử nào không (nếu có lỗi xảy ra)
        return error.map((err: any) => ({
            field: err.property, // Lấy tên thuộc tính (property) bị lỗi
            message:
                (err.constraints && Object.values(err.constraints)[0]) ||
                "please provide input for this field", // Lấy thông điệp lỗi đầu tiên từ các constraints, nếu không có thì dùng thông điệp mặc định
        })); // Trả về mảng danh sách các lỗi đã được định dạng lại gồm tên trường và thông điệp tương ứng
    }
    return false; // Trả về false nếu đối tượng hợp lệ (không có lỗi nào)
};