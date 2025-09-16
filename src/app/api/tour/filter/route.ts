// import Tour from "@/model/tourModel";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     const { category, minPrice, maxPrice } = await request.json();

//     if (!category) {
//       return NextResponse.json(
//         { message: "Please provide the category to filter" },
//         { status: 400 }
//       );
//     }

//     // Build filter object
//     const filter: any = { category };

//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = Number(minPrice);
//       if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }

//     const tours = await Tour.find(filter);

//     return NextResponse.json(
//       { message: "Filtered tours", tours },
//       { status: 200 }
//     );
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ message: error.message }, { status: 500 });
//     }
//     return NextResponse.json({ message: "Server Error" }, { status: 500 });
//   }
// }
import Tour from "@/model/tourModel";
import { NextRequest, NextResponse } from "next/server";

interface TourFilter {
  category: string;
  price?: {
    $gte?: number;
    $lte?: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { category, minPrice, maxPrice } = await request.json();

    if (!category) {
      return NextResponse.json(
        { message: "Please provide the category to filter" },
        { status: 400 }
      );
    }

    // Build filter object
    const filter: TourFilter = { category };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const tours = await Tour.find(filter);

    return NextResponse.json(
      { message: "Filtered tours", tours },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
