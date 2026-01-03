import { connectDB } from "../../../../../lib/db";
import User from "../../../../../models/User";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const exists = await User.findOne({ email });
    if (exists) {
      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    await User.create({
      name,
      email,
      password,
    });

    return Response.json({ success: true }, { status: 201 });
  } catch {
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
