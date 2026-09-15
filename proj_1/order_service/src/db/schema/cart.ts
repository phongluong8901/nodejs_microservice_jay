import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, numeric, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

// pgTable("carts", { ... }): Tạo bảng có tên trong cơ sở dữ liệu là carts.
export const carts = pgTable("carts", {
    id: serial("id").primaryKey(), //Tạo cột khóa chính id, tự động tăng (1, 2, 3...).
    customerId: integer("customer_id").notNull().unique(), // Lưu ID khách hàng, bắt buộc có (notNull) và mỗi khách hàng chỉ có duy nhất 1 giỏ hàng (unique).
    createdAt: timestamp("created_at").notNull().defaultNow(), // Lưu thời điểm tạo, tự động lấy thời gian hiện tại.
    updatedAt: timestamp("update_at").notNull().defaultNow(), // Lưu thời điểm cập nhật cuối cùng.
});

//Định nghĩa kiểu TypeScript cho bảng carts
export type Cart = InferSelectModel<typeof carts>; //Kiểu dữ liệu TypeScript khi bạn lấy dữ liệu (SELECT) ra từ database (có đầy đủ id, createdAt,...).
export type NewCart = InferInsertModel<typeof carts>; //Kiểu dữ liệu TypeScript khi bạn thêm mới (INSERT) dữ liệu vào database (các trường tự sinh như id hay defaultNow có thể được bỏ qua).

// pgTable("cart_line_items", { ... }): Tạo một bảng khác là cart_line_items (các mục trong giỏ hàng)
export const cartLineItems = pgTable("cart_line_items", {
    id: serial("id").primaryKey(), // for db record
    productId: integer("product_id").notNull(),
    cartId: integer("cart_id")
        .references(() => carts.id, { onDelete: "cascade" }) //Khóa ngoại liên kết tới carts.id. Khi giỏ hàng cha bị xóa, toàn bộ sản phẩm trong giỏ này cũng tự động bị xóa theo nhờ { onDelete: "cascade" }.
        .notNull(),
    itemName: varchar("item_name").notNull(), // human readable
    variant: varchar("variant"), // Small // medium // big
    qty: integer("qty").notNull(), //Số lượng sản phẩm mua.
    price: numeric("amount").notNull(), // amount in cents
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type CartLineItem = InferSelectModel<typeof cartLineItems>;

//Khai báo mối quan hệ (Relations) giữa các bảng
//cartRelations: Khai báo quan hệ Một - Nhiều. Một giỏ hàng (carts) chứa nhiều sản phẩm (lineItems: many(cartLineItems)).
export const cartRelations = relations(carts, ({ many }) => ({
    lineItems: many(cartLineItems),
}));

//lineItemsRelations: Khai báo quan hệ Nhiều - Một. Nhiều sản phẩm thuộc về một giỏ hàng duy nhất, dựa vào việc nối trường cartLineItems.cartId với carts.id.
export const lineItemsRelations = relations(cartLineItems, ({ one }) => ({
    cart: one(carts, {
        fields: [cartLineItems.cartId],
        references: [carts.id],
    }),
}));