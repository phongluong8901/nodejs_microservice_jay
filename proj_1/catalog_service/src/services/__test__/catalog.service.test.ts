import { describe, it, expect, jest } from "@jest/globals";
import test, { afterEach, beforeEach } from "node:test";
import type { ICatalogRepository } from "../../interface/catalogRepository.interface.js";
import { MockCatalogRepository } from "../../repositoriy/mockCatalog.repository.js";
import { CatalogService } from "../catalog.service.js";
import {faker, fakerEN_CA} from '@faker-js/faker'
import type { Product } from "../../models/product.models.js";
import {Factory} from 'rosie'

// test
describe("catalogService", () => {
    it("example test", () => {
        const a = 10;
        expect(a).toBe(10);
    });
});

const productFactory  = new Factory<Product>()
  .attr("id", faker.number.int({ min: 1, max: 1000 }))
  .attr("name", faker.commerce.productName())
  .attr("description", faker.commerce.productDescription())
  .attr("stock", faker.number.int({ min: 10, max: 100 }))
  .attr("price", +faker.commerce.price());

// Hàm tiện ích (helper) dùng để sinh ra dữ liệu sản phẩm giả ngẫu nhiên bằng Faker
const mockProduct = (rest: any) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({min: 10, max: 100}),
        price: faker.commerce.price(),
        ...rest,    // Cho phép ghi đè hoặc bổ sung các trường dữ liệu tùy chỉnh truyền vào
    };
}

// Khối mô tả chính cho các kịch bản kiểm thử các phương thức của CatalogService
describe("catalogService", () => {
    let repository: ICatalogRepository

    // Hook chạy trước mỗi bài test: khởi tạo mới một MockCatalogRepository sạch sẽ
    beforeEach(() => {
        repository = new MockCatalogRepository()
    });

    // Hook chạy sau mỗi bài test: dọn dẹp và reset lại biến repository
    afterEach(() => {
        repository = {} as MockCatalogRepository;
    });

    // Khối gom nhóm riêng cho chức năng tạo mới sản phẩm (createProduct)
    describe("createProduct", () => {
        // Kịch bản 1: Kiểm thử trường hợp tạo sản phẩm thành công
        test("should create product", async() => {
            const service = new CatalogService(repository); // Khởi tạo service mới với repository giả lập đã chuẩn bị
            const reqBody = mockProduct({   // Tạo dữ liệu request body giả, ép giá tiền từ chuỗi sang kiểu số
                price: +faker.commerce.price(),
            });
            const result = await service.createProduct(reqBody);    // Gọi phương thức tạo sản phẩm từ service
            // Kiểm tra kết quả trả về khớp với cấu trúc object và kiểu dữ liệu mong đợi
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),

            });
        });

        // Kịch bản 2: Kiểm thử trường hợp repository trả về dữ liệu thiếu ID (lỗi nghiệp vụ)
        test("should throw error with unable to create product", async() => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price(),
            });

            // Theo dõi hàm create của repository và ép nó trả về một product trống (không có id) 1 lần duy nhất
            jest
            .spyOn(repository, 'create')
            .mockImplementationOnce(() => 
                Promise.resolve({} as Product));

            // Xác nhận rằng khi gọi service, nó sẽ quăng ra ngoại lệ với thông báo lỗi tương ứng
            await expect(service.createProduct(reqBody))
            .rejects.toThrow("unable to create product");

        });

        // Kịch bản 3: Kiểm thử trường hợp cơ sở dữ liệu gặp lỗi khi tạo sản phẩm
        test("should throw error with product already exist", async() => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price(),
            });

            // Theo dõi hàm create của repository và ép nó trả về một Promise thất bại (lỗi database) 1 lần duy nhất
            jest
            .spyOn(repository, 'create')
            .mockImplementationOnce(() => 
                Promise.reject(new Error("product already exist")));

            // Xác nhận rằng service bắt được lỗi từ repository và đẩy ra ngoài thông điệp lỗi chính xác
            await expect(service.createProduct(reqBody))
            .rejects.toThrow("product already exist");

        });
    });

    describe("updateProduct", () => {
        test("should update product", async () => {
        const service = new CatalogService(repository);
        const reqBody = mockProduct({
            price: +faker.commerce.price(),
            id: faker.number.int({ min: 10, max: 1000 }),
        });
        const result = await service.updateProduct(reqBody);
        expect(result).toMatchObject(reqBody);
        });

        test("should throw error with product does not exist", async () => {
        const service = new CatalogService(repository);

        jest
            .spyOn(repository, "update")
            .mockImplementationOnce(() =>
            Promise.reject(new Error("product does not exist"))
            );

        await expect(service.updateProduct({})).rejects.toThrow(
            "product does not exist"
        );
        });
    });

    describe("getProducts", () => {
        test("should get products by offset and limit", async () => {
        const service = new CatalogService(repository);
        const randomLimit = faker.number.int({ min: 10, max: 50 });
        const products = productFactory.buildList(randomLimit);
        jest
            .spyOn(repository, "find")
            .mockImplementationOnce(() => Promise.resolve(products));

        const result = await service.getProducts(randomLimit, 0);
        expect(result.length).toEqual(randomLimit);
        expect(result).toMatchObject(products);
        });

        test("should throw error with products does not exist", async () => {
        const service = new CatalogService(repository);

        jest
            .spyOn(repository, "find")
            .mockImplementationOnce(() =>
            Promise.reject(new Error("products does not exist"))
            );

        await expect(service.getProducts(0, 0)).rejects.toThrow(
            "products does not exist"
        );
        });
    });

    describe("getProduct", () => {
        test("should get product by id", async () => {
        const service = new CatalogService(repository);
        const product = productFactory.build();
        jest
            .spyOn(repository, "findOne")
            .mockImplementationOnce(() => Promise.resolve(product));

        const result = await service.getProduct(product.id!);
        expect(result).toMatchObject(product);
        });
    });

    describe("deleteProduct", () => {
        test("should delete product by id", async () => {
        const service = new CatalogService(repository);
        const product = productFactory.build();
        jest
            .spyOn(repository, "delete")
            .mockImplementationOnce(() => Promise.resolve(product));

        const result = await service.deleteProduct(product.id!);
        expect(result).toMatchObject({
            id: product.id,
        });
        });
    });

})