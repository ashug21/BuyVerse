import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();
  return NextResponse.json({ success: true });
}
