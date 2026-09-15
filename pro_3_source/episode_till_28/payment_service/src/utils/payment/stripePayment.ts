import Stripe from "stripe";
import { PaymentGateway } from "./payment.type";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

const createPayment = async (
  amount: number,
  metadata: { orderId: number; userId: number }
): Promise<{ secret: string; pubKey: string; amount: number }> => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    metadata,
  });

  return {
    secret: paymentIntent.client_secret as string,
    pubKey: process.env.STRIPE_PUB_KEY as string,
    amount: paymentIntent.amount,
  };
};

const getPayment = async (
  paymentId: string
): Promise<Record<string, unknown>> => {
  const paymentResponse = await stripe.paymentIntents.retrieve(paymentId, {});
  console.log(paymentResponse);
  const { status } = paymentResponse;
  return { status, paymentLog: paymentResponse };
};

export const StripePayment: PaymentGateway = {
  createPayment,
  getPayment,
};
