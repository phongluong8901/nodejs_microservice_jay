import {faker} from '@faker-js/faker' // Import thư viện faker để tạo dữ liệu giả lập (mock data) ngẫu nhiên
import { Factory } from "rosie";       // Import Factory từ thư viện rosie dùng để định nghĩa các bản ghi dữ liệu mẫu (factory pattern)
import type { Product } from "../../models/product.models.js"; // Import kiểu dữ liệu Product từ file models để gán kiểu cho factory

export const productFactory  = new Factory<Product>() // Khởi tạo và xuất productFactory áp dụng kiểu Product cho bản ghi tạo ra
  .attr("id", faker.number.int({ min: 1, max: 1000 })) // Tạo ngẫu nhiên trường 'id' là số nguyên trong khoảng từ 1 đến 1000
  .attr("name", faker.commerce.productName()) // Tạo ngẫu nhiên trường 'name' là tên sản phẩm thương mại
  .attr("description", faker.commerce.productDescription()) // Tạo ngẫu nhiên trường 'description' là mô tả sản phẩm
  .attr("stock", faker.number.int({ min: 10, max: 100 })) // Tạo ngẫu nhiên trường 'stock' (tồn kho) là số nguyên từ 10 đến 100
  .attr("price", +faker.commerce.price()); // Tạo ngẫu nhiên trường 'price' (giá) dạng chuỗi rồi ép kiểu thành số (number) bằng dấu cộng (+)