import { ITour } from "@/model/tourModel";
import Image from "next/image";
import Link from "next/link";

import { getAllTour } from "@/lib/TourData";
import Cart from "./Cart";

async function TourCart() {
  const tourss: ITour[] = await getAllTour();
  return <Cart tourss={tourss} message="Explore Nepal's Hidden Wonders" />;
}

export default TourCart;
