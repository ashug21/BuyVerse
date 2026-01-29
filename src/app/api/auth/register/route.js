import { connectDB } from "../../../../../lib/db";
import redis from "../../../../../lib/redis";
import User from "../../../../../models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!name || !email || !password) {
      return Response.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const verified = await redis.get(`verified:${email}`);

    if (!verified) {
      return Response.json(
        { error: "Email not verified" },
        { status: 403 }
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
      password
    });

    await redis.del(`verified:${email}`);

    return Response.json(
      { success: true },
      { status: 201 }
    );

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
