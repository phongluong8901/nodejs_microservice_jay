# --- lib
express: Framework web tối giản và linh hoạt cho Node.js, dùng để xây dựng các RESTful API, quản lý routing, middleware và xử lý HTTP request/response cho microservice.

nodemon (devDependencies): Công cụ tự động khởi động lại ứng dụng Node.js khi phát hiện có tệp mã nguồn thay đổi, giúp tiết kiệm thời gian trong quá trình phát triển (development).

typescript (devDependencies): Ngôn ngữ lập trình mở rộng của JavaScript mang lại tính năng kiểm tra kiểu tĩnh (static typing) và các tính năng hướng đối tượng hiện đại trước khi biên dịch ra JavaScript.

ts-node (devDependencies): Trình thực thi trực tiếp mã TypeScript trên Node.js mà không cần bước biên dịch thủ công ra JavaScript (thường dùng kết hợp với nodemon khi dev).

jest (devDependencies): Framework kiểm thử JavaScript/TypeScript phổ biến, mạnh mẽ và hỗ trợ sẵn tính năng tạo mock, snapshot testing, và đo lường độ bao phủ mã nguồn (code coverage).

supertest (devDependencies): Thư viện chuyên dụng để kiểm thử các HTTP server (như Express app), cho phép gửi các request giả lập (GET, POST, PUT, DELETE) và kiểm tra kết quả trả về.

@faker-js/faker (devDependencies): Thư viện tạo dữ liệu giả ngẫu nhiên (như tên, email, địa chỉ, số điện thoại) cực kỳ hữu ích để phục vụ cho việc viết test dữ liệu mẫu hoặc seed database.

osie (devDependencies): Thư viện hỗ trợ mô hình Factory Pattern cho JavaScript và TypeScript, chuyên dùng trong việc tạo dữ liệu mẫu (mock data) cho các bài kiểm thử (testing). Thay vì phải viết thủ công từng đối tượng dữ liệu hoặc lặp lại cấu trúc phức tạp ở mỗi test case, rosie cho phép định nghĩa sẵn các khuôn mẫu (blueprints) cho từng thực thể (như Product, User, Order), sau đó dễ dàng sinh ra dữ liệu ngẫu nhiên hoặc ghi đè các thuộc tính cụ thể một cách cực kỳ nhanh chóng và gọn gàng.

# --- stack
1. Jest
Đúng vậy, Jest là một thư viện kiểm thử (testing framework) mã nguồn mở rất phổ biến và mạnh mẽ dành cho hệ sinh thái JavaScript và Node.js, được phát triển và duy trì bởi Meta (Facebook).

Unit Test: Kiểm thử từng hàm, từng class riêng lẻ (như kiểm tra logic tính toán trong CatalogService hoặc Product).

Integration Test: Kiểm thử sự phối hợp giữa nhiều thành phần với nhau (như test kết nối Repository với Database hoặc test các HTTP Route của Express).

Zero-config: Hầu như không cần cấu hình phức tạp, có thể chạy ngay với các dự án JavaScript tiêu chuẩn.

Tích hợp sẵn (All-in-one): Bao gồm sẵn công cụ chạy test (test runner), hàm kiểm tra điều kiện (assertions như expect().toBe()), và tính năng đo độ bao phủ mã nguồn (code coverage) mà không cần cài thêm thư viện phụ trợ.

Mocking mạnh mẽ: Hỗ trợ giả lập (mock) các hàm, module, hoặc API dễ dàng, rất thích hợp khi cần test các service phụ thuộc vào database bên ngoài.

2. Clean Architecture
Clean Architecture trong Node.js TypeScript microservice là mô hình phân tầng mã nguồn nhằm tách biệt hoàn toàn logic nghiệp vụ cốt lõi khỏi các công nghệ bên ngoài như Web Framework (Express, Fastify), Database (MongoDB, PostgreSQL) hay các thư viện bên thứ ba.

Entities (Domain): Chứa các đối tượng nghiệp vụ cốt lõi và quy tắc dữ liệu thuần túy bằng TypeScript, hoàn toàn độc lập với database hay các thư viện ngoài.

Use Cases (Services): Nơi chứa các business logic cụ thể của ứng dụng (ví dụ: CreateProduct, GetProduct), điều phối dữ liệu và gọi các interface trung gian.

Interface Adapters (Controllers / Routers / Repositories): Chuyển đổi dữ liệu giữa bên ngoài và Use Cases. Ví dụ: nhận req.body từ Express, validate qua DTO, sau đó gọi service.

Frameworks & Drivers: Tầng ngoài cùng bao gồm Express server, ORM (Prisma, Mongoose, TypeORM), cấu hình kết nối mạng và các thư viện hạ tầng.



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

-
Express App - Post/products - Service - Repository

Service - Mock

Super test - Express App

-
Independent of Frameworks
testable
independent of UI
Indepedent of Database
Independent of any external package or entity

- Clean aRchiteuture
Entities
useCase
Controllers, Gateways, presentsers
Web, UI, external interfacem DB, Devices
