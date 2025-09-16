import { ITour } from "@/model/tourModel";
import Image from "next/image";
import Link from "next/link";

interface CartProps {
  tourss: ITour[];
  message: string;
  page: string;
  removeWishlist?: (id: string) => Promise<void>;
}
function Cart({ tourss, message, page, removeWishlist }: CartProps) {
  return (
    <div className="p-4">
      <h1 className="relative top-0 pb-2 text-center text-2xl text-slate-700 dark:text-slate-200 sm:pb-5">
        {message}
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {tourss.map((el, i) => (
          <div
            key={i}
            className="card bg-base-100 w-full border border-gray-100 shadow-md dark:border-gray-500 dark:bg-slate-600"
          >
            <figure className="relative h-64 w-full">
              <Image
                src={el.images?.[0] || ""}
                alt={el?.name || "Tour image"}
                fill
                className="rounded-t-lg object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{el.name}</h2>
              <p>
                {el.description?.slice(0, 100) + " " + "see more..." ||
                  "No description."}
              </p>
              <div
                className={`card-actions justify-end ${
                  page === "cart" ? "gap-9 mt-2" : ""
                }`}
              >
                <Link href={`/description/${el._id}`}>
                  <button className="btn btn-primary">View Details</button>
                </Link>
                {page === "cart" && (
                  <button
                    className="btn btn-primary"
                    onClick={() => removeWishlist?.(el._id as string)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
