import connect from "@/db/db";
import { authOptions } from "@/lib/authOptions";
import User from "@/model/userModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    await connect();
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { image } = await request.json();
    if (!image) {
      return NextResponse.json(
        { message: "Please provide the required field" },
        { status: 400 }
      );
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { cloudinaryId: image },
      { new: true, runValidators: true }
    );
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Image uploaded" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
