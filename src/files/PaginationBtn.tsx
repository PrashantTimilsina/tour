"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationBtn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const goToPage = (num: number) => {
    router.push(`/?page=${num}`);
  };

  return (
    <div className="flex gap-4 mt-4 items-center justify-center pb-5">
      {Array.from({ length: 2 }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => goToPage(num)}
          className={`p-2 w-9 h-9 flex items-center justify-center font-bold rounded cursor-pointer ${
            page === num
              ? "dark:bg-white dark:text-black bg-black text-white"
              : "dark:bg-black dark:text-white bg-slate-200 text-black"
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
