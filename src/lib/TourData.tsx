// import connect from "@/db/db";
// import Tour from "@/model/tourModel";
// import { ITour } from "@/model/tourModel";

// export async function getAllTour(): Promise<ITour[]> {
//   await connect();
//   const tours = await Tour.find().lean();
//   return tours as unknown as ITour[];
// }
// export async function getTourById(id: string): Promise<ITour | null> {
//   await connect();
//   const tour = await Tour.findById(id).lean<ITour>();
//   return tour;
// }
import connect from "@/db/db";
import Tour, { ITour } from "@/model/tourModel";

// Paginated fetch
export async function getAllTour(
  page: number = 1,
  limit: number = 5
): Promise<{
  tours: ITour[];
  total: number;
  totalPages: number;
  page: number;
}> {
  await connect();

  const skip = (page - 1) * limit;

  const tours = await Tour.find().skip(skip).limit(limit).lean();
  const total = await Tour.countDocuments();

  return {
    tours: tours as unknown as ITour[],
    total,
    totalPages: Math.ceil(total / limit),
    page,
  };
}

// Fetch single tour by ID
export async function getTourById(id: string): Promise<ITour | null> {
  await connect();
  const tour = await Tour.findById(id).lean<ITour>();
  return tour;
}
