import { type Static, Type } from "@sinclair/typebox"; // Nhập công cụ Type và Static từ thư viện TypeBox

export const CartRequestSchema = Type.Object({             // Định nghĩa schema dữ liệu khi tạo giỏ hàng mới
    productId: Type.Integer(),                             // Trường productId bắt buộc phải là số nguyên
    qty: Type.Integer(),                                   // Trường qty (số lượng) bắt buộc phải là số nguyên
});

export type CartRequestInput = Static<typeof CartRequestSchema>; // Tự động tạo TypeScript type từ schema tạo giỏ hàng

export const CartEditRequestSchema = Type.Object({         // Định nghĩa schema dữ liệu khi sửa giỏ hàng
    id: Type.Integer(),                                    // Trường id của bản ghi cần sửa phải là số nguyên
    qty: Type.Integer(),                                   // Trường qty (số lượng mới) phải là số nguyên
});

export type CartEditRequestInput = Static<typeof CartEditRequestSchema>; // Tự động tạo TypeScript type từ schema sửa giỏ hàng


type CartLineItem = {
    id: number;
    productId: number;
    itemName: string;
    price: string;
    qty: number;
    variant: string | null;
    createdAt: Date;
    updatedAt: Date;
    availability?: number;
};

export interface CartWithLineItems {
    id: number;
    customerId: number;
    lineItems: CartLineItem[];
    createdAt: Date;
    updatedAt: Date;
}