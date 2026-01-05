import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = await request.json();

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    return NextResponse.json({ status: "success" });
  }

  return NextResponse.json({ status: "failure" }, { status: 400 });
}
