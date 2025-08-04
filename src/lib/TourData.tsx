import connect from "@/db/db";
import Tour from "@/model/tourModel";
import { ITour } from "@/model/tourModel";

export async function getAllTour(): Promise<ITour[]> {
  await connect();
  const tours = await Tour.find().lean(); // lean() returns plain JS objects without Mongoose doc methods
  return tours as unknown as ITour[];
}
