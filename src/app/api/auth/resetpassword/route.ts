import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import connect from "@/db/db";
export async function POST(request: NextRequest) {
  try {
    await connect();
    const { token, newPassword, confirmPassword } = await request.json();
    if (!token) {
      return NextResponse.json(
        { message: "You are not authorized" },
        { status: 401 }
      );
    }
    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: "Please provide the required field" },
        { status: 400 }
      );
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    await user.save();
    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
