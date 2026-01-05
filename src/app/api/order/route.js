import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Order from "../../../../models/Order";

export async function POST(request) {
  try {
    await connectDB();

    const { title, itemsTotal, delivery, total, paymentMethod, paymentStatus } =
      await request.json();

    if (!title || itemsTotal == null || delivery == null || total == null) {
      return NextResponse.json(
        { success: false, message: "All Fields are required" },
        { status: 400 }
      );
    }

    await Order.create({
      title,
      itemsTotal,
      delivery,
      total,
      paymentMethod,
      paymentStatus: paymentStatus || "Pending",
    });

    return NextResponse.json(
      { success: true, message: "Order Placed Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Some Error Occurred " + error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const order = await Order.find({}).lean();

    if (order.length === 0) {
      return NextResponse.json(
        { success: false, message: "No order Found" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Some Error Occurred " + error },
      { status: 500 }
    );
  }
}
