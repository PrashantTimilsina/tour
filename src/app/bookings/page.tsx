"use client";
import Cart from "@/files/Cart";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    async function getBookings() {
      try {
        const res = await axios.get("/api/user/getbookings", {
          withCredentials: true,
        });
        const data = res.data;
        setBookings(data.bookings);
        console.log(data);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message, { autoClose: 1500 });
      }
    }
    getBookings();
  }, []);
  if (bookings.length === 0)
    return <p className="text-2xl text-center mt-5">No bookings done!</p>;
  return <Cart tourss={bookings} message="Bookings" page="bookings" />;
}

export default Bookings;
