import { getAllTour } from "@/lib/TourData";
import Cart from "./Cart";

export default async function TourCart({ page }: { page: number }) {
  const { tours } = await getAllTour(page, 5);

  return (
    <Cart
      tourss={tours}
      page="Home page"
      message="Explore Nepal's Hidden Wonders"
    />
  );
}
