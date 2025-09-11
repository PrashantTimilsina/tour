import connect from "@/db/db";
import Cart from "@/files/Cart";
import Tour from "@/model/tourModel";

async function PopularDestination() {
  await connect();
  const tours = await Tour.find({ rating: { $gt: 4.7 } });

  return (
    <Cart
      tourss={tours}
      message="Popular Destinations"
      page="populardestination"
    />
  );
}
export default PopularDestination;
