import { authOptions } from "@/lib/authOptions";
import User from "@/model/userModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Not authorized! Please login" },
        { status: 401 }
      );
    }
    const userId = session?.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    user.cartItems = user.cartItems.filter(
      (el: string) => el.toString() !== id
    );
    await user.save();
    return NextResponse.json(
      { message: "Tour removed from wishlist" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
