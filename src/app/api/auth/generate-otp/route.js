import redis from "../../../../../lib/redis";
import { sendOtpEmail } from "../../../../../lib/sendEmail";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const otp = generateOTP();

    await redis.set(
      `otp:${email}`,
      otp,
      { EX: 600 }
    );

    try {
      await sendOtpEmail(email, otp);
    } catch (err) {
      console.error("EMAIL ERROR:", err);
      return Response.json(
        { error: "Failed to send OTP email" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "OTP sent to email"
    });

  } catch (err) {
    console.error("API ERROR:", err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
