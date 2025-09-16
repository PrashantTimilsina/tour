import Tour from "@/model/tourModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/db";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: Props) {
  try {
    await connect();
    const params = await context.params; // await params here
    const tour = await Tour.findById(params.id).lean();
    return NextResponse.json(tour);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
