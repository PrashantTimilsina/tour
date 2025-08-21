import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/lib/sendEmail";
import connect from "@/db/db";
export async function POST(request: NextRequest) {
  try {
    await connect();
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "Please provide your email" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (!user?.provider?.includes("credentials")) {
      return NextResponse.json(
        {
          message:
            "Credentials user are only eligible to reset password from tour webapp",
        },
        { status: 400 }
      );
    }
    const token = crypto.randomBytes(31).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    user.passwordResetToken = hashedToken;
    user.passwordResetExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    await sendEmail(user.email, user.name, token);
    return NextResponse.json(
      { message: "Check your email and reset your password" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
