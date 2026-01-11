import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Order from "../../../../models/Order";


import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

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
      userEmail: session.user.email,
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

    const session = await getServerSession(authOptions);


    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }


    const order = await Order.find({userEmail: session.user.email}).lean();
    

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
