import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Address from "../../../../../models/Address";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; 

    const address = await Address.findById(id);

    if (!address) {
      return NextResponse.json(
        { success: false, message: "Address not found" },
        { status: 404 }
      );
    }

    await Address.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Address deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
