import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectMongoWithRetry from "../lib/db/connectMongo";
import { createSubscription } from "../auth/subscription/clientSubscriptionServices";

export async function POST(request: NextRequest) {
  const user = await auth();

  if (!user.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { amount, address, phoneNumber } = await request.json();

  if (!amount || amount < 0 || ![9, 19].includes(amount)) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  if (!address || !phoneNumber) {
    return NextResponse.json(
      { error: "Invalid address or phone number" },
      { status: 400 },
    );
  }

  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const subscriptionType = amount === 9 ? "Pro" : "Enterprise";

  await connectMongoWithRetry();

  const receipt_id = `receipt-${Date.now().toString().slice(0, 5)}-${user.userId.toString().slice(0, 5)}`;

  const options = {
    amount: amount * 100,
    currency: "USD",
    receipt: receipt_id,
    notes: {
      userId: user.userId,
      price: amount,
      subscriptionType: subscriptionType,
      address: address,
      phoneNumber: phoneNumber,
    },
  };
  try {
    const order = await razorpay.orders.create(options);
    await createSubscription(user.userId, order.id, subscriptionType, amount);
    return NextResponse.json({ order });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
