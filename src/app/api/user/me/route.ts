import connect from "@/db/db";
import { authOptions } from "@/lib/authOptions";
import User from "@/model/userModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User Information", user },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
