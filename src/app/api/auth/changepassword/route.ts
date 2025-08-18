import { authOptions } from "@/lib/authOptions";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { currentPassword, newPassword, confirmPassword } =
      await request.json();
    if (!currentPassword || !newPassword || !confirmPassword) {
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

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }
    if (session.user.provider !== "credentials") {
      return NextResponse.json(
        { message: "Password change is allowed only for credentials login" },
        { status: 403 }
      );
    }
    const userId = session?.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Current password doesnot match" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();
    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
