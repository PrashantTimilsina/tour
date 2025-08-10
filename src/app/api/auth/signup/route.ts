import connect from "@/db/db";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { name, email, password, confirmPassword } = await request.json();
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "Please provide the required field" },
        { status: 400 }
      );
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords donot match" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json(
      { message: "User created", user },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
