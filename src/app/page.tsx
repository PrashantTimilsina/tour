import TourCart from "@/files/TourCart";
import PaginationBtn from "@/files/PaginationBtn";

export default function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;

  return (
    <div>
      <TourCart page={page} />
      <PaginationBtn />
    </div>
  );
}
