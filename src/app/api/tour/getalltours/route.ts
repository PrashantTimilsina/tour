// import connect from "@/db/db";
// import Tour from "@/model/tourModel";
// import { NextRequest, NextResponse } from "next/server";
// connect();
// export async function GET(request: NextRequest) {
//   try {
//     const tour = await Tour.find();
//     return NextResponse.json({ tour });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ message: error.message });
//     }
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
import connect from "@/db/db";
import Tour from "@/model/tourModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get ?page=2&limit=5 from query (default page=1, limit=5)
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;

    const skip = (page - 1) * limit;

    // Fetch paginated tours
    const tours = await Tour.find().skip(skip).limit(limit);

    // Get total count
    const total = await Tour.countDocuments();

    return NextResponse.json({
      tours,
      page,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
