import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Wishlist from "../../../../../models/Wishlist";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const wishlist = await Wishlist.findById(id);

    if (!wishlist) {
      return NextResponse.json(
        { success: false, message: "Wishlist does'nt Exist" },
        { status: 404 }
      );
    }

    await Wishlist.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Wishlist item deleted Successfully" },{ status: 200 });
} 
catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error" },{ status: 500 });
  }
}
