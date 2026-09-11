# --- lib

# --- stack
1. Jest
Đúng vậy, Jest là một thư viện kiểm thử (testing framework) mã nguồn mở rất phổ biến và mạnh mẽ dành cho hệ sinh thái JavaScript và Node.js, được phát triển và duy trì bởi Meta (Facebook).

Unit Test: Kiểm thử từng hàm, từng class riêng lẻ (như kiểm tra logic tính toán trong CatalogService hoặc Product).

Integration Test: Kiểm thử sự phối hợp giữa nhiều thành phần với nhau (như test kết nối Repository với Database hoặc test các HTTP Route của Express).

Zero-config: Hầu như không cần cấu hình phức tạp, có thể chạy ngay với các dự án JavaScript tiêu chuẩn.

Tích hợp sẵn (All-in-one): Bao gồm sẵn công cụ chạy test (test runner), hàm kiểm tra điều kiện (assertions như expect().toBe()), và tính năng đo độ bao phủ mã nguồn (code coverage) mà không cần cài thêm thư viện phụ trợ.

Mocking mạnh mẽ: Hỗ trợ giả lập (mock) các hàm, module, hoặc API dễ dàng, rất thích hợp khi cần test các service phụ thuộc vào database bên ngoài.

# --- more, logic
1. 
Nodejs microservices using
- Kafka
- Elastic search
- GraphQL

Client - Order service (Producer) - Catalog Service (Consumer) - Topic/Kafka/Topic - DB
- Elastic search - cluster, cluster - doc, doc, doc(index product)

- Aglie Process
Plan - Design - Develop - Test - Deploy - Review

Intro - Agile Process - Catalog Service - Clean Architecture - Prisma Integration - Order Service - Kajka integration - Elastic Search Integration - Test Converages - GraphQl - Q&A

2. Identify System Boundaries: DDD
Domain
E-Comerce Application
Finance(Banking)
Shipping

Iphone:
Domain Expert (electronic_product)
Developer (product)
Project manager (electronic_item)

Customer:
Profile
Cart
Order

Payment:
Transaction
Orders

Inventory:
Stock
Sellers

-
User Context: Customer, Profile

Catalog Context: Stock, Product, Category

Order Context: Orders, Order items, Product

Payment Context: Payments, transaction, shipping

Events:
customer - Orders
Orders - Payment Context




