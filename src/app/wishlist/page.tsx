"use client";

import Cart from "@/files/Cart";
import axios from "axios";
import { useEffect, useState } from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    async function fetchWishlist() {
      const res = await axios.get("/api/user/getCart");
      const data = res.data;
      setWishlist(data.user.cartItems);
      console.log(data.user.cartItems);
    }
    fetchWishlist();
  }, []);
  return <Cart tourss={wishlist} message="Wishlist" />;
}

export default Wishlist;
