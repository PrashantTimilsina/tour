import connect from "@/db/db";
import Tour from "@/model/tourModel";
import { ITour } from "@/model/tourModel";

export async function getAllTour(): Promise<ITour[]> {
  await connect();
  const tours = await Tour.find().lean();
  return tours as unknown as ITour[];
}
export async function getTourById(id: string): Promise<ITour | null> {
  await connect();
  const tour = await Tour.findById(id).lean<ITour>();
  return tour;
}
