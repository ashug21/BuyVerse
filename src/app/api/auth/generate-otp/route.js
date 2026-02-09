import redis from "../../../../../lib/redis";
import { sendOtpEmail } from "../../../../../lib/sendEmail";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    const body = await req.json();
    const email = body.email?.trim().toLowerCase();

    console.log("GENERATE OTP FOR:", email);

    if (!email) {
      return Response.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const otp = generateOTP();

    await redis.set(`otp:${email}`, otp, { ex: 600 });

    console.log("OTP STORED:", otp);

    await sendOtpEmail(email, otp);

    return Response.json({
      success: true,
      message: "OTP sent to email"
    });

  } catch (err) {
    console.error("GENERATE OTP ERROR:", err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
