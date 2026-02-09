import redis from "../../../../../lib/redis";

export async function POST(req) {
  try {
    const body = await req.json();

    const email = body.email?.trim().toLowerCase();
    const otp = body.otp?.toString().trim();

    if (!email || !otp) {
      return Response.json(
        { error: "Email and OTP required" },
        { status: 400 }
      );
    }

    const savedOtp = await redis.get(`otp:${email}`);

    if (!savedOtp) {
      return Response.json(
        { error: "OTP expired" },
        { status: 400 }
      );
    }

    // ✅ FIX: force string comparison
    if (String(savedOtp) !== otp) {
      return Response.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    await redis.del(`otp:${email}`);
    await redis.set(`verified:${email}`, "true", { ex: 900 });

    return Response.json({ success: true });

  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
