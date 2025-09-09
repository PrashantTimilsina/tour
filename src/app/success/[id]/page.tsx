"use client";

import axios, { AxiosError } from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface PaymentInfo {
  status: string;
  total_amount: number;
  transaction_code: string;
  transaction_uuid: string;
}

export default function Success() {
  const searchParams = useSearchParams();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const info = searchParams.get("data");
  let newInfo: PaymentInfo | null = null;

  if (info) {
    try {
      const decodedInfo = atob(info);
      newInfo = JSON.parse(decodedInfo) as PaymentInfo;
    } catch (error) {
      console.error("Failed to decode payment info:", error);
    }
  }

  useEffect(() => {
    if (!newInfo) return;
    async function storePaymentDetails() {
      try {
        const resultStored = { ...newInfo, id };
        const res = await axios.post(
          `/api/user/bookingtour/${id}`,
          resultStored,
          {
            withCredentials: true,
          }
        );
        const data = res.data;
        console.log(data);
        toast.success(data.message, { autoClose: 1500 });
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err?.response?.data.message, { autoClose: 1500 });
      }
    }
    storePaymentDetails();
  }, [id, newInfo]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 text-center max-w-xl w-full">
        {/* Animated Checkmark */}
        <div className="flex justify-center mb-6">
          <svg
            className="w-20 h-20 text-green-500 animate-ping-slow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-100"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
          Payment Successful!
        </h1>

        {newInfo ? (
          <div className="text-left text-gray-700 dark:text-gray-200 space-y-2">
            <p>
              <strong>Status:</strong> {newInfo.status}
            </p>
            <p>
              <strong>Total Amount:</strong> Rs {newInfo.total_amount}
            </p>
            <p>
              <strong>Transaction Code:</strong> {newInfo.transaction_code}
            </p>
            <p>
              <strong>Transaction UUID:</strong> {newInfo.transaction_uuid}
            </p>
          </div>
        ) : (
          <p className="text-red-500 dark:text-red-400">
            Invalid or missing payment details.
          </p>
        )}
      </div>
    </div>
  );
}
