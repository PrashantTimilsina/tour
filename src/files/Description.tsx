"use client";

import { ITour } from "@/model/tourModel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Map from "./Map";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { useRouter } from "next/navigation";
type Props = {
  id: string;
};
function Description({ id }: Props) {
  const [tour, setTour] = useState<ITour | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`/api/tour/getTourById/${id}`);

      const data = res.data;
      console.log(data);
      setSelectedImage(data.images[0]);

      setTour(data);
    }
    fetchData();
  }, [id]);
  async function checkBooking(tour: ITour) {
    try {
      const res = await axios.get("/api/user/me");
      const bookings = res.data.user.bookings;
      if (bookings.some((b: string) => b === tour._id)) {
        toast.error("Tour already booked", { autoClose: 1500 });
        return;
      }
      router.push(`/payment/${tour._id}?amount=${tour.price}`);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message, { autoClose: 1500 });
    }
  }
  async function AddtoWishlist() {
    try {
      const res = await axios.post(`/api/user/cart/${id}`);
      const data = res.data;
      if (data) {
        toast.success(data.message, { autoClose: 1500 });
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message, { autoClose: 1500 });
    }
  }

  return (
    <>
      <div className="grid lg:grid-cols-2 p-4   w-full">
        <div className="flex flex-col justify-center items-center gap-3 ">
          <h3 className="text-2xl dark:text-slate-200">{tour?.name}</h3>
          {selectedImage && (
            <div className="relative sm:h-80 sm:w-96 mt-5 w-80 h-72">
              <Image
                src={selectedImage as string}
                fill
                alt="selected image"
                className="object-cover rounded"
              />
            </div>
          )}
          <div className="flex items-center justify-center border-slate-700 border-2 gap-1 p-1">
            {tour?.images?.map((el, i) => (
              <div
                className="relative sm:h-28 sm:w-28 cursor-pointer h-16 w-16"
                key={i}
                onClick={() => setSelectedImage(el)}
              >
                <Image
                  src={el}
                  fill
                  alt="images of tour"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className=" p-2 flex flex-col justify-center">
          <h3 className="text-xl dark:text-slate-200 mt-5 text-justify">
            {tour?.description}
          </h3>
          <div className="flex gap-7">
            <h3 className="text-xl dark:text-slate-200 mt-5">
              Rating: {tour?.rating}⭐/5
            </h3>
            <h3 className="text-xl dark:text-slate-200 mt-5">
              Difficulty: {tour?.difficulty}
            </h3>
          </div>
          <div className="flex  gap-4">
            <h3 className="text-xl dark:text-slate-200 mt-5">
              Duration: {tour?.duration}
            </h3>

            <h3 className="text-xl dark:text-slate-200 mt-5 flex sm:gap-3">
              Guide: {tour?.guideName}
              <Link href="https://www.facebook.com/profile.php?id=61578269964686">
                <button className="text-center cursor-pointer text-xl hover:text-blue-600 hover:bg-white hover:rounded-full">
                  <FaFacebook />
                </button>
              </Link>
            </h3>
          </div>
          <h3 className="text-xl dark:text-slate-200 mt-5">
            Travel Theme: {tour?.category}
          </h3>
          <h3 className="text-xl dark:text-slate-200 mt-5">
            Languages: {tour?.languages?.join(", ")}
          </h3>
          <h1 className="text-xl dark:text-slate-200 mt-7">
            Price:{" "}
            <span className="font-semibold bg-yellow-500 text-white px-4 rounded py-1">
              Rs {tour?.price}
            </span>
          </h1>
          <div className="sm:text-xl flex sm:gap-7 mt-7 gap-4">
            <button
              className="px-6 py-2 bg-sky-400 text-slate-100 rounded cursor-pointer hover:bg-sky-700  transform transition-all duration-150"
              onClick={AddtoWishlist}
            >
              Add to Wishlist
            </button>
            {/* <Link href={`/payment/${tour?._id}?amount=${tour?.price}`}> */}
            <button
              className="px-6 py-2 bg-indigo-500 text-slate-50 rounded cursor-pointer hover:bg-indigo-300 hover:text-slate-800"
              onClick={() => tour && checkBooking(tour)}
            >
              Book tour
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 sm:ml-7 text-xl">
        <h3 className="text-2xl">Highlights</h3>
        <div className="flex gap-4 sm:flex-row flex-col">
          {tour?.highlights?.map((el, i) => (
            <span
              key={i}
              className="mt-3 bg-blue-900 text-slate-200 px-2 py-1 rounded inline-block"
            >
              {el}
            </span>
          ))}
        </div>
        <div className="mt-5">
          {tour?.latitude !== undefined && tour?.longitude !== undefined && (
            <Map
              latitude={tour.latitude}
              longitude={tour.longitude}
              name={tour.name}
              location={tour.location}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Description;
