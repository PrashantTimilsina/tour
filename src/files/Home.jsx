import tours from "@/files/tours.json";
import Image from "next/image";
import Link from "next/link";

function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl text-center sm:pb-5  relative top-0 text-slate-700 pb-2 dark:text-slate-200">
        Explore Nepal's Hidden Wonders
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tours.map((el, i) => (
          <div
            key={i}
            className="card w-full bg-base-100 shadow-md border border-gray-100 dark:bg-slate-600 dark:border-gray-500"
          >
            <figure className="relative w-full h-64">
              <Image
                src={el.images[0]}
                alt={el.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{el.name}</h2>
              <p>
                {el.description?.slice(0, 100) + " " + "see more..." ||
                  "No description."}
              </p>
              <div className="card-actions justify-end">
                <Link href={`/description/${el.id}`}>
                  <button className="btn btn-primary">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
