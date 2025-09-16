import TourCart from "@/files/TourCart";
import PaginationBtn from "@/files/PaginationBtn";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  return (
    <div>
      <TourCart page={page} />
      <PaginationBtn />
    </div>
  );
}
