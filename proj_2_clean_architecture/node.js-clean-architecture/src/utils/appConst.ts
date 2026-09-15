export const INTERFACE_TYPE = {                  // Khai báo và xuất một đối tượng chứa danh sách các định danh (thường dùng cho Dependency Injection)
  ProductRepository: Symbol.for("ProductRepository"), // Tạo một token duy nhất dạng Symbol cho tầng Repository
  ProductInteractor: Symbol.for("ProductInteractor"), // Tạo token dạng Symbol cho tầng Interactor (Use Case)
  ProductController: Symbol.for("ProductController"), // Tạo token dạng Symbol cho tầng Controller
  Mailer: Symbol.for("Mailer"),                        // Tạo token dạng Symbol cho dịch vụ gửi mail
  MessageBroker: Symbol.for("MessageBroker"),          // Tạo token dạng Symbol cho dịch vụ xử lý message queue
};