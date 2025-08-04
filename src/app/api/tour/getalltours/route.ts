import connect from "@/db/db";
import Tour from "@/model/tourModel";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function GET(request: NextRequest) {
  try {
    const tour = await Tour.find();
    return NextResponse.json({ tour });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
