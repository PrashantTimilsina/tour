import connect from "@/db/db";
import { authOptions } from "@/lib/authOptions";
import User from "@/model/userModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connect();
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }
    const user = await User.findById(userId).populate("bookings");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const bookings = user.bookings;
    return NextResponse.json(
      { message: "Bookings of User", bookings },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
