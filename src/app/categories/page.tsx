"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cart from "@/files/Cart";
import axios, { AxiosError } from "axios";
import { useEffect, useState, useCallback } from "react";

function Categories() {
  const [category, setCategory] = useState("Trekking");
  const [tour, setTour] = useState([]);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");

  const fetchCategoryByCategory = useCallback(async () => {
    try {
      const res = await axios.post("/api/tour/filter", {
        category,
      });
      setTour(res.data?.tours);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.log(err.response?.data.message);
    }
  }, [category]);

  useEffect(() => {
    fetchCategoryByCategory();
  }, [fetchCategoryByCategory]);

  const handleFilter = async () => {
    try {
      const res = await axios.post("/api/tour/filter", {
        category,
        minPrice,
        maxPrice,
      });
      setTour(res.data?.tours);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.log(err.response?.data.message);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleFilter();
  };

  return (
    <div>
      <div className="text-center sm:text-2xl text-xl">
        <h1>Filter by Categories</h1>
      </div>

      <div className="sm:text-xl flex sm:gap-11 mt-7 justify-center gap-6">
        <select
          className="dark:bg-black dark:text-white p-0.5 sm:w-auto w-24 self-start"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="Trekking">Trekking</option>
          <option value="Hiking">Hiking</option>
          <option value="Wildlife Safari">Wildlife Safari</option>
        </select>

        <div className="flex gap-3 sm:text-xl lg:flex-row flex-col">
          <Label className="sm:text-xl font-normal">
            Min price
            <Input
              type="number"
              className="w-28"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </Label>

          <Label className="sm:text-xl font-normal">
            Max price
            <Input
              type="number"
              className="w-28"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </Label>

          <button
            className="bg-blue-600 text-white px-8 py-1 rounded cursor-pointer"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
      </div>

      <div className="mt-3">
        <Cart tourss={tour} message={category} page="bookings" />
      </div>
    </div>
  );
}

export default Categories;
