import connect from "@/db/db";
import { authOptions } from "@/lib/authOptions";
import User from "@/model/userModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
type Props = {
  params: { id: string };
};
export async function POST(request: NextRequest, { params }: Props) {
  try {
    await connect();
    const { id } = params;
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (user.bookings.map((b: string) => b.toString()).includes(id)) {
      return NextResponse.json(
        { message: "Booking already done!!" },
        { status: 409 }
      );
    }

    user.bookings.push(id);
    await user.save();
    return NextResponse.json(
      { message: "Booking successfull" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
