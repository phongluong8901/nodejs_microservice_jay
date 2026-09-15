import express, { type NextFunction, type Request, type Response } from "express";
import orderRoutes from './routes/order.routes.js'
import cartRoutes from './routes/cart.routes.js'
import cors from 'cors'
import { httpLogger, HandleErrorWithLogger } from "./utils/index.js"
import { MessageBroker } from "./utils/broker/message-broker.js"
import type { Consumer, Producer } from "kafkajs";

const PORT = process.env.APP_PORT || 9000;

// Khởi tạo một ứng dụng Express chính
const app = express();
app.use(cors());
// Đăng ký middleware toàn cục giúp Express tự động phân tích (parse) cú pháp JSON từ các HTTP request body gửi lên
app.use(express.json());
app.use(httpLogger);

//1st step: connect to the producer and consumer
const producer = await MessageBroker.connectProducer<Producer>();
producer.on("producer.connect", () => {
    console.log("producer connected");
});

const consumer = await MessageBroker.connectConsumer<Consumer>();
producer.on("producer.disconnect", () => {
    console.log("producer disconnected");
});

//2nd step: subscribe to the topic or publish messages to the topic
await MessageBroker.subscribe((message) => {
    console.log("Consumer recevied the message");
    console.log("Message received", message)
}, "OrderEvents");


app.use(orderRoutes);
app.use(cartRoutes);

// Đăng ký router catalog vào ứng dụng, tất cả các request đi vào gốc sẽ được điều hướng qua catalogRouter
app.use("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "healthy" });
});

app.use(HandleErrorWithLogger);



export default app;