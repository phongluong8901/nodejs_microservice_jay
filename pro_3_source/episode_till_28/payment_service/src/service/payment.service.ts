import { GetOrderDetails } from "../utils/broker/api";
import { PaymentGateway } from "../utils";

export const CreatePayment = async (
  userId: number,
  orderId: number,
  paymentGateway: PaymentGateway
) => {
  // get order details from order service
  const order = await GetOrderDetails(orderId);
  if (order.customerId !== userId) {
    throw new Error("user not authorised to create payment");
  }

  // create a new payment record

  // call payment gateway to create payment

  // return payment secrets
  return {
    secret: "my super secret",
    pubKey: "my super public key",
    amount: 100,
  };
};

export const VerifyPayment = async (
  paymentId: string,
  paymentGateway: PaymentGateway
) => {
  // call payment Gateway to verify payment
  // update order status through message broker
  // return payment status <= not nacecessary just for response to frontend
};
