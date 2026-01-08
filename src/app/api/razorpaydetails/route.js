import razorpay from "../../../../lib/razorpay";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const payments = await razorpay.payments.all({
      count: 20,
    });

    return NextResponse.json(payments.items);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
