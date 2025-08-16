"use client";

import Cart from "@/files/Cart";
import { ITour } from "@/model/tourModel";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Wishlist() {
  const [wishlist, setWishlist] = useState<ITour[]>([]);
  useEffect(() => {
    async function fetchWishlist() {
      const res = await axios.get("/api/user/getCart");
      const data = res.data;
      setWishlist(data.user.cartItems);
      console.log(data.user.cartItems);
    }
    fetchWishlist();
  }, []);
  async function removeWishlist(id: string) {
    try {
      const res = await axios.post(`/api/user/removecart`, { id });
      setWishlist((prev) => prev.filter((el) => el._id !== id));
      const detail = res.data;
      toast.success(detail.message, { autoClose: 1500 });
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      console.log(err.message);
    }
  }
  if (wishlist.length === 0)
    return <p className="text-2xl text-center mt-5">No wishlist</p>;
  return (
    <Cart
      tourss={wishlist}
      message="Wishlist"
      page="cart"
      removeWishlist={removeWishlist}
    />
  );
}

export default Wishlist;
