import { DB } from "../db/dbconnection"; // Nhập đối tượng kết nối cơ sở dữ liệu đã cấu hình với Drizzle ORM
import { type Cart, type CartLineItem, cartLineItems, carts } from "../db/schema"; // Nhập các kiểu dữ liệu TypeScript (Cart, CartLineItem) và bảng (carts, cartLineItems) từ schema
import { NotFoundError } from "../utils"; // Nhập lớp lỗi tùy chỉnh NotFoundError (dùng để trả về mã lỗi 404)
import { eq } from "drizzle-orm"; // Nhập toán tử so sánh bằng (equal) để viết điều kiện WHERE trong Drizzle

// Định nghĩa kiểu dữ liệu (interface/type) cho Repository của giỏ hàng
export type CartRepositoryType = {
    createCart: (customerId: number, lineItem: CartLineItem) => Promise<number>; // Hàm tạo/cập nhật giỏ hàng, trả về ID giỏ hàng
    findCart: (id: number) => Promise<Cart>; // Hàm tìm giỏ hàng theo ID khách hàng, trả về thông tin giỏ kèm sản phẩm
    updateCart: (id: number, qty: number) => Promise<CartLineItem>; // Hàm cập nhật số lượng sản phẩm trong giỏ
    deleteCart: (id: number) => Promise<boolean>; // Hàm xóa một dòng sản phẩm khỏi giỏ
    clearCartData: (id: number) => Promise<boolean>; // Hàm xóa toàn bộ giỏ hàng
};

// Hàm tạo giỏ hàng mới hoặc cập nhật nếu khách hàng đã có sẵn giỏ hàng
const createCart = async (
    customerId: number,
    { itemName, price, productId, qty, variant }: CartLineItem
): Promise<number> => {
    // Thêm bản ghi giỏ hàng mới vào bảng carts
    const result = await DB.insert(carts)
        .values({
            customerId: customerId,
        })
        .returning()
        .onConflictDoUpdate({
            target: carts.customerId, // Nếu customerId đã tồn tại trong bảng (xung đột khóa unique)
            set: { updatedAt: new Date() }, // Thì không tạo mới mà chỉ cập nhật lại thời gian updatedAt
        });

    // Lấy ID an toàn từ phần tử đầu tiên của mảng trả về (tránh lỗi undefined)
    const id = result[0]?.id;

    // Nếu tồn tại ID hợp lệ, tiến hành thêm sản phẩm vào bảng chi tiết giỏ hàng (cart_line_items)
    if (id && id > 0) {
        await DB.insert(cartLineItems).values({
            cartId: id,
            productId: productId,
            itemName: itemName,
            price: price,
            qty: qty,
            variant: variant,
        });
    }
    return id || 0; // Trả về ID giỏ hàng (hoặc 0 nếu không có)
};

// Hàm tìm kiếm giỏ hàng theo mã khách hàng
const findCart = async (id: number): Promise<Cart> => {
    // Sử dụng Drizzle Query API để tìm giỏ hàng đầu tiên khớp với customerId
    const cart = await DB.query.carts.findFirst({
        where: (carts, { eq }) => eq(carts.customerId, id),
        with: {
            lineItems: true, // Tự động JOIN và lấy toàn bộ danh sách sản phẩm thuộc giỏ hàng này
        },
    });

    // Nếu không tìm thấy giỏ hàng, ném ra lỗi 404 NotFoundError
    if (!cart) {
        throw new NotFoundError("cart not found");
    }

    return cart; // Trả về dữ liệu giỏ hàng kèm danh sách sản phẩm
};

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
const updateCart = async (id: number, qty: number): Promise<CartLineItem> => {
    // Thực hiện cập nhật trường qty tại bảng cartLineItems dựa theo khóa chính id của dòng sản phẩm
    const [cartLineItem] = await DB.update(cartLineItems)
        .set({
            qty: qty,
        })
        .where(eq(cartLineItems.id, id))
        .returning();

    // Kiểm tra nếu không tìm thấy bản ghi sản phẩm để cập nhật thì ném lỗi 404
    if (!cartLineItem) {
        throw new NotFoundError("Cart line item not found");
    }
    return cartLineItem; // Trả về thông tin dòng sản phẩm sau khi cập nhật
};

// Hàm xóa một sản phẩm cụ thể ra khỏi giỏ hàng
const deleteCart = async (id: number): Promise<boolean> => {
    console.log("Proposed ID", id); // In log kiểm tra ID sản phẩm định xóa
    await DB.delete(cartLineItems).where(eq(cartLineItems.id, id)).returning(); // Thực hiện lệnh xóa dòng sản phẩm
    return true; // Trả về true khi hoàn tất
};

// Hàm xóa sạch toàn bộ giỏ hàng
const clearCartData = async (id: number): Promise<boolean> => {
    await DB.delete(carts).where(eq(carts.id, id)).returning(); // Xóa giỏ hàng theo ID (các sản phẩm con tự động xóa do thiết lập cascade delete)
    return true; // Trả về true khi hoàn tất
};

// Gom nhóm các hàm repository thành một đối tượng duy nhất và xuất ra ngoài để sử dụng ở tầng service
export const CartRepository: CartRepositoryType = {
    createCart,
    findCart,
    updateCart,
    deleteCart,
    clearCartData,
};