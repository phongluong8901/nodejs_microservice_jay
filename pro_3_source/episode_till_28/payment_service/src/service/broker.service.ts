import { Producer } from "kafkajs";
import { MessageBroker } from "../utils";
import { PaymentEvent } from "../types";

// initilize the broker
export const InitializeBroker = async () => {
  const producer = await MessageBroker.connectProducer<Producer>();
  producer.on("producer.connect", async () => {
    console.log("Order Service Producer connected successfully");
  });
};

// publish dedicated events based on usecases
export const SendPaymentUpdateMessage = async (data: unknown) => {
  await MessageBroker.publish({
    event: PaymentEvent.UPDATE_PAYMENT,
    topic: "OrderEvents",
    headers: {},
    message: {
      data,
    },
  });
};
