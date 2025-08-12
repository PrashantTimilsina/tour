import { authOptions } from "@/lib/authOptions";
import User from "@/model/userModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
type Props = {
  params: { id: string };
};
export async function POST(request: NextRequest, { params }: Props) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    const userId = session.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (user.cartItems.includes(id)) {
      return NextResponse.json(
        { message: "Item is already in wishlist" },
        { status: 400 }
      );
    }
    user.cartItems.push(id);
    await user.save();
    return NextResponse.json(
      { message: "Item added to wishlist✅" },
      { status: 200 }
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
