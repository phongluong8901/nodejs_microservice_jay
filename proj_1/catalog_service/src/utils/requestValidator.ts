import { plainToClass, type ClassConstructor } from "class-transformer";
import { ValidationError, validate } from "class-validator";

/**
 * Hàm nội bộ: Thực thi validate đối tượng và trả về danh sách lỗi nếu có.
 */
const validationError = async (
  input: any
): Promise<ValidationError[] | false> => {
  const errors = await validate(input, {
    validationError: { target: true },
  });

  if (errors.length) {
    return errors;
  }

  return false;
};

/**
 * Hàm chung (Generic): Chuyển đổi JSON thô thành Class DTO và kiểm tra dữ liệu hợp lệ.
 */
export const RequestValidator = async <T>(
  type: ClassConstructor<T>,
  body: any
): Promise<{ errors: boolean | string; input: T }> => {
  // 1. Chuyển đổi dữ liệu JSON thô (plain object) thành instance của class DTO
  const input = plainToClass(type, body);

  // 2. Kiểm tra lỗi validate trên instance vừa chuyển đổi
  const errors = await validationError(input);
  
  if (errors) {
    // 3. Gom tất cả thông báo lỗi thành một chuỗi duy nhất, phân cách bằng dấu phẩy
    const errorMessage = errors
      .map((error: ValidationError) =>
        (Object as any).values(error.constraints)
      )
      .join(", ");
      
    return { errors: errorMessage, input };
  }

  // 4. Trả về kết quả thành công nếu không có lỗi
  return { errors: false, input };
};